import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

type GitHubContentProps = {
  owner: string;
  repo: string;
  path?: string; // default README.md
  branch?: string; // default main
  className?: string;
  title?: string;
  fallbackContent?: string; // shown if remote fetch fails
};

const GitHubContent: React.FC<GitHubContentProps> = ({
  owner,
  repo,
  path = 'README.md',
  branch = 'main',
  className,
  title,
  fallbackContent,
}) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvedBranch, setResolvedBranch] = useState<string>(branch || 'main');

  const pathDir = (path || 'README.md').includes('/')
    ? (path || 'README.md').split('/').slice(0, -1).join('/')
    : '';

  const rawRoot = `https://raw.githubusercontent.com/${owner}/${repo}/${resolvedBranch}/`;
  const rawBase = pathDir ? `${rawRoot}${pathDir}/` : rawRoot;
  const blobRoot = `https://github.com/${owner}/${repo}/blob/${resolvedBranch}/`;
  const blobBase = pathDir ? `${blobRoot}${pathDir}/` : blobRoot;

  const isAbsolute = (url?: string) => !!url && /^(https?:)?\/\//i.test(url);
  const isDataUri = (url?: string) => !!url && url.startsWith('data:');
  const isAnchor = (url?: string) => !!url && url.startsWith('#');
  const isRootRelative = (url?: string) => !!url && url.startsWith('/');

  const resolveRemoteImage = (url?: string) => {
    if (!url || isAbsolute(url) || isDataUri(url) || isAnchor(url)) return url || '';
    const normalized = isRootRelative(url) ? url.slice(1) : url;
    return (isRootRelative(url) ? rawRoot : rawBase) + normalized;
  };

  const resolveRemoteLink = (url?: string) => {
    if (!url || isAbsolute(url) || isAnchor(url)) return url || '';
    const normalized = isRootRelative(url) ? url.slice(1) : url;
    return (isRootRelative(url) ? blobRoot : blobBase) + normalized;
  };

  const resolveFallbackImage = (url?: string) => {
    if (!url || isAbsolute(url) || isDataUri(url) || isAnchor(url)) return url || '';
    const normalized = isRootRelative(url) ? url.slice(1) : url;
    // Assets mirrored to public/about-assets/{normalized}
    return `/about-assets/${normalized}`;
  };

  const resolveFallbackLink = (url?: string) => {
    // For links in fallback, send users to GitHub repo blob view
    return resolveRemoteLink(url);
  };

  useEffect(() => {
    const fetchWithFallback = async () => {
      setLoading(true);
      setError(null);
      setContent('');

      const branches = Array.from(
        new Set([branch || 'main', 'master'])
      );

      for (const b of branches) {
        try {
          const url = `https://raw.githubusercontent.com/${owner}/${repo}/${b}/${path}`;
          const res = await fetch(url);
          if (res.ok) {
            const text = await res.text();
            setContent(text);
            setResolvedBranch(b);
            return;
          }
        } catch (e) {
          // ignore and try next
        }
      }
      setError('Unable to fetch content. Checked branches: ' + branches.join(', '));
    };

    fetchWithFallback().finally(() => setLoading(false));
  }, [owner, repo, path, branch]);

  return (
    <div className={className}>
      {title ? (
        <h2 className="text-2xl font-bold text-brand-gray-900">{title}</h2>
      ) : null}
      {loading && (
        <p className="mt-4 text-brand-gray-600">Loading content from GitHub…</p>
      )}
      {error && !fallbackContent && (
        <p className="mt-4 text-red-600">Error: {error}</p>
      )}
      {!loading && !error && (
        <article className="prose max-w-none mt-4 text-brand-gray-800">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              img: ({ src, alt }) => (
                <img src={resolveRemoteImage(src)} alt={alt as string} />
              ),
              a: ({ href, children }) => (
                <a href={resolveRemoteLink(href)} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      )}
      {!loading && error && fallbackContent && (
        <article className="prose max-w-none mt-4 text-brand-gray-800">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              img: ({ src, alt }) => (
                <img src={resolveFallbackImage(src)} alt={alt as string} />
              ),
              a: ({ href, children }) => (
                <a href={resolveFallbackLink(href)} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {fallbackContent}
          </ReactMarkdown>
        </article>
      )}
    </div>
  );
};

export default GitHubContent;