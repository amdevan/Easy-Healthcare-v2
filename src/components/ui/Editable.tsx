import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    let ignore = false;
    // Try loading from backend settings; fall back to localStorage
    getSetting(id)
      .then((value) => {
        if (ignore) return;
        const html = typeof value === 'string' ? value : (value?.html ?? value?.content ?? null);
        if (html) {
          setRemoteHtml(html);
          localStorage.setItem(id, html);
        }
      })
      .catch(() => {
        // No remote value yet; keep local state
      })
      .finally(() => setInitialized(true));
    return () => { ignore = true; };
  }, [id]);

  const handleBlur = async (e: React.FocusEvent<HTMLElement>) => {
    const html = e.currentTarget.innerHTML.trim();
    if (html === '') return;
    // Save locally for instant persistence
    localStorage.setItem(id, html);
    setRemoteHtml(html);
    // Persist remotely via PATCH; create if missing
    try {
      const exists = await getSetting(id);
      if (exists === null) {
        await createSetting(id, { html });
      } else {
        await patchSetting(id, { html });
      }
    } catch (err) {
      // Swallow errors for UX; content remains locally
      console.warn('Failed to save setting', id, err);
    }
  };

  const savedContent = remoteHtml ?? localStorage.getItem(id);

  const props: { [key: string]: any } = {
    className: `${className || ''} ${isAdminMode ? 'editable-region' : ''}`.trim(),
    onBlur: isAdminMode ? handleBlur : undefined,
    contentEditable: isAdminMode,
    suppressContentEditableWarning: true,
    style: isAdminMode
      ? { outline: '2px dashed #0ea5e9', outlineOffset: '4px', cursor: 'text' }
      : undefined,
  };

  if (initialized && savedContent) {
    props.dangerouslySetInnerHTML = { __html: savedContent };
    return <Tag {...props} />;
  }

  return <Tag {...props}>{children}</Tag>;
};

export default Editable;
