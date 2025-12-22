import React, { useEffect, useRef, useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { getSetting, patchSetting, createSetting } from '@/controllers/adminController';

interface EditableProps {
  // Fix: Changed type to React.ElementType to resolve JSX namespace and component type errors.
  tag: React.ElementType;
  id: string;
  children: React.ReactNode;
  className?: string;
}

const Editable: React.FC<EditableProps> = ({ tag: Tag, id, children, className }) => {
  const { isAdminMode } = useAdmin();
  const [remoteHtml, setRemoteHtml] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<any>(null);
  const [history, setHistory] = useState<{ ts: number; html: string }[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  useEffect(() => {
    let ignore = false;
    getSetting(id)
      .then((value) => {
        if (ignore) return;
        const html = typeof value === 'string' ? value : (value?.html ?? value?.content ?? null);
        if (html) {
          setRemoteHtml(html);
          localStorage.setItem(id, html);
        }
      })
      .catch(() => {})
      .finally(() => setInitialized(true));
    return () => { ignore = true; };
  }, [id]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`editable:${id}:history`) || '[]';
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) setHistory(arr.filter((x) => typeof x?.html === 'string' && typeof x?.ts === 'number'));
    } catch {}
  }, [id]);

  const ensureQuillAssetsLoaded = (): Promise<void> => {
    return new Promise((resolve) => {
      const win = window as any;
      if (win.Quill) { resolve(); return; }
      if (!document.getElementById('quill-css')) {
        const link = document.createElement('link');
        link.id = 'quill-css';
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css';
        document.head.appendChild(link);
      }
      if (!document.getElementById('quill-js')) {
        const script = document.createElement('script');
        script.id = 'quill-js';
        script.src = 'https://cdn.jsdelivr.net/npm/quill@2/dist/quill.js';
        script.onload = () => resolve();
        document.body.appendChild(script);
      } else {
        resolve();
      }
    });
  };

  useEffect(() => {
    if (!isAdminMode) return;
    ensureQuillAssetsLoaded().then(() => {
      const win = window as any;
      if (!win.Quill || !editorRef.current || quillRef.current) return;
      const q = new win.Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [["bold", "italic", "underline"], [{ header: [1, 2, false] }], [{ list: 'ordered' }, { list: 'bullet' }], ["link", "blockquote"]],
          history: { delay: 500, maxStack: 100, userOnly: true },
          keyboard: {
            bindings: {
              undo: { key: 'z', shortKey: true, handler: () => { q.history.undo(); } },
              redo: { key: 'y', shortKey: true, handler: () => { q.history.redo(); } },
            }
          }
        }
      });
      const initial = (remoteHtml ?? localStorage.getItem(id) ?? '') as string;
      q.root.innerHTML = initial;
      quillRef.current = q;
    });
  }, [isAdminMode, remoteHtml, id]);

  const handleSaveBlur = async () => {
    const html = (quillRef.current?.root?.innerHTML || '').trim();
    if (html === '') return;
    localStorage.setItem(id, html);
    setRemoteHtml(html);
    try {
      const next = [...history, { ts: Date.now(), html }];
      setHistory(next);
      localStorage.setItem(`editable:${id}:history`, JSON.stringify(next));
    } catch {}
    try {
      const exists = await getSetting(id);
      if (exists === null) {
        await createSetting(id, { html });
      } else {
        await patchSetting(id, { html });
      }
    } catch (err) {}
  };

  const savedContent = remoteHtml ?? localStorage.getItem(id);

  if (isAdminMode) {
    return (
      <div
        className={`${className || ''} editable-region`.trim()}
        onBlur={handleSaveBlur}
        style={{ outline: '2px dashed #0ea5e9', outlineOffset: '4px', cursor: 'text' }}
        tabIndex={0}
      >
        <div className="flex items-center gap-2 mb-2">
          <button
            type="button"
            onClick={() => quillRef.current?.history?.undo?.()}
            className="px-2 py-1 border rounded bg-white hover:bg-gray-50"
          >Undo</button>
          <button
            type="button"
            onClick={() => quillRef.current?.history?.redo?.()}
            className="px-2 py-1 border rounded bg-white hover:bg-gray-50"
          >Redo</button>
          <button
            type="button"
            onClick={() => {
              const html = (quillRef.current?.root?.innerHTML || '').trim();
              if (!html) return;
              const next = [...history, { ts: Date.now(), html }];
              setHistory(next);
              try { localStorage.setItem(`editable:${id}:history`, JSON.stringify(next)); } catch {}
            }}
            className="px-2 py-1 border rounded bg-white hover:bg-gray-50"
          >Save Snapshot</button>
          <select
            value={selectedIdx}
            onChange={(e) => {
              const idx = parseInt(e.target.value, 10);
              setSelectedIdx(Number.isFinite(idx) ? idx : -1);
              const snap = history[idx];
              if (snap && quillRef.current) quillRef.current.root.innerHTML = snap.html;
            }}
            className="px-2 py-1 border rounded bg-white"
          >
            <option value={-1}>History</option>
            {history.map((h, i) => (
              <option key={h.ts} value={i}>{new Date(h.ts).toLocaleString()}</option>
            ))}
          </select>
        </div>
        <div ref={editorRef} className="min-h-[1.5em] border border-gray-200 rounded-md" />
      </div>
    );
  }

  const props: { [key: string]: any } = {
    className: `${className || ''}`.trim(),
  };

  if (initialized && savedContent) {
    props.dangerouslySetInnerHTML = { __html: savedContent };
    return <Tag {...props} />;
  }

  return <Tag {...props}>{children}</Tag>;
};

export default Editable;
