// Sync README from GitHub repo amdevan/about into vendor mirror
// Tries main then master; writes to vendor/amdevan-package/about/README.md
const https = require('https');
const fs = require('fs');
const path = require('path');

const OWNER = 'amdevan';
const REPO = 'about';
const FILE_PATH = 'README.md';
const BRANCHES = ['main', 'master'];
const DEST = path.join(__dirname, '..', 'vendor', 'amdevan-package', 'about', 'README.md');
const PUBLIC_ASSETS_BASE = path.join(__dirname, '..', 'public', 'about-assets');
const VENDOR_BASE = path.join(__dirname, '..', 'vendor', 'amdevan-package', 'about');

function fetchRaw(owner, repo, branch, filePath) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          // Drain response to free socket
          res.resume();
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .on('error', (err) => reject(err));
  });
}

function apiGetJSON(url) {
  return new Promise((resolve, reject) => {
    const opts = {
      headers: {
        'User-Agent': 'easy-healthcare-101-sync-script',
        'Accept': 'application/vnd.github.v3+json',
      },
    };
    https
      .get(url, opts, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', (err) => reject(err));
  });
}

function downloadTo(url, destPath) {
  return new Promise((resolve) => {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const fileStream = fs.createWriteStream(destPath);
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          console.warn(`Skip ${url}: HTTP ${res.statusCode}`);
          fileStream.close();
          return resolve(false);
        }
        res.pipe(fileStream);
        fileStream.on('finish', () => fileStream.close(() => resolve(true)));
        fileStream.on('error', () => resolve(false));
      })
      .on('error', () => resolve(false));
  });
}

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']);
function isImageFile(p) {
  const ext = path.extname(p).toLowerCase();
  return IMAGE_EXTS.has(ext);
}

async function mirrorRepoTree(owner, repo, branch) {
  console.log(`Mirroring entire ${owner}/${repo}@${branch} to vendor...`);
  const base = `https://api.github.com/repos/${owner}/${repo}/contents`;
  async function walk(dir = '') {
    const url = dir ? `${base}/${dir}?ref=${branch}` : `${base}?ref=${branch}`;
    const items = await apiGetJSON(url);
    if (!Array.isArray(items)) return;
    for (const it of items) {
      if (it.type === 'dir') {
        await walk(it.path);
      } else if (it.type === 'file' && it.download_url) {
        const vendorPath = path.join(VENDOR_BASE, it.path);
        const ok = await downloadTo(it.download_url, vendorPath);
        if (ok) {
          console.log(`Vendor mirrored: ${it.path}`);
          // Also mirror images to public for direct serving
          if (isImageFile(it.path)) {
            const publicPath = path.join(PUBLIC_ASSETS_BASE, it.path);
            await downloadTo(it.download_url, publicPath);
            console.log(`Public mirrored: ${it.path}`);
          }
        }
      }
    }
  }
  await walk('');
}

async function run() {
  let content = null;
  let tried = [];
  let resolvedBranch = null;
  for (const b of BRANCHES) {
    tried.push(b);
    try {
      content = await fetchRaw(OWNER, REPO, b, FILE_PATH);
      console.log(`Fetched ${FILE_PATH} from branch '${b}'.`);
      resolvedBranch = b;
      break;
    } catch (e) {
      console.warn(`Failed on '${b}': ${e.message}`);
    }
  }
  if (!content) {
    console.error(`Unable to fetch README. Tried branches: ${tried.join(', ')}`);
    process.exitCode = 1;
    return;
  }
  fs.mkdirSync(path.dirname(DEST), { recursive: true });
  fs.writeFileSync(DEST, content, 'utf8');
  console.log(`Wrote README to ${DEST}`);

  // Parse and mirror referenced asset files (images) into public/about-assets
  try {
    const mdImageRegex = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g; // captures path in markdown image
    const htmlImageRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi; // captures src in HTML img
    const assets = new Set();

    let m;
    while ((m = mdImageRegex.exec(content)) !== null) {
      assets.add(m[1]);
    }
    while ((m = htmlImageRegex.exec(content)) !== null) {
      assets.add(m[1]);
    }

    if (assets.size > 0) {
      console.log(`Found ${assets.size} image reference(s) in README. Mirroring to public/about-assets...`);
    }

    const baseDir = path.posix.dirname(FILE_PATH);
    const rawRoot = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${resolvedBranch || BRANCHES[0]}/`;
    const fileBase = baseDir && baseDir !== '.' ? rawRoot + baseDir + '/' : rawRoot;

    fs.mkdirSync(PUBLIC_ASSETS_BASE, { recursive: true });

    const downloads = [];
    for (const asset of assets) {
      // Skip absolute URLs and data URIs
      if (/^(https?:)?\/\//i.test(asset) || asset.startsWith('data:')) {
        continue;
      }
      const isRootRelative = asset.startsWith('/');
      const normalized = isRootRelative ? asset.slice(1) : asset;
      const remoteUrl = (isRootRelative ? rawRoot : fileBase) + normalized;
      const destPath = path.join(PUBLIC_ASSETS_BASE, normalized);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });

      downloads.push(
        new Promise((resolve) => {
          https
            .get(remoteUrl, (res) => {
              if (res.statusCode !== 200) {
                res.resume();
                console.warn(`Skip ${asset}: HTTP ${res.statusCode}`);
                return resolve(false);
              }
              const fileStream = fs.createWriteStream(destPath);
              res.pipe(fileStream);
              fileStream.on('finish', () => fileStream.close(() => resolve(true)));
              fileStream.on('error', () => resolve(false));
            })
            .on('error', () => resolve(false));
        }).then((ok) => {
          if (ok) console.log(`Mirrored ${asset} -> ${destPath}`);
        })
      );
    }

    await Promise.all(downloads);
  } catch (e) {
    console.warn('Asset mirroring encountered an issue:', e.message);
  }

  // Full repo mirroring into vendor (and images into public)
  try {
    await mirrorRepoTree(OWNER, REPO, resolvedBranch || BRANCHES[0]);
  } catch (e) {
    console.warn('Repo mirroring encountered an issue:', e.message);
  }
}

run();