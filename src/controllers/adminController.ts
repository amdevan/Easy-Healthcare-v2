// Admin API client: settings CRUD and media management for editable content

const API_BASE = '/api';

// Settings
export type UiSettingValue = Record<string, any>;

export async function getAllSettings(): Promise<Record<string, UiSettingValue>> {
  const res = await fetch(`${API_BASE}/settings`);
  if (!res.ok) throw new Error(`Failed to fetch settings: ${res.status}`);
  return res.json();
}

export async function getSetting(key: string): Promise<UiSettingValue | null> {
  const res = await fetch(`${API_BASE}/settings/${encodeURIComponent(key)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch setting ${key}: ${res.status}`);
  return res.json();
}

export async function createSetting(key: string, value: UiSettingValue = {}): Promise<any> {
  const res = await fetch(`${API_BASE}/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value }),
  });
  if (!res.ok) throw new Error(`Failed to create setting ${key}: ${res.status}`);
  return res.json();
}

export async function setSetting(key: string, value: UiSettingValue): Promise<any> {
  const res = await fetch(`${API_BASE}/settings/${encodeURIComponent(key)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value }),
  });
  if (!res.ok) throw new Error(`Failed to set setting ${key}: ${res.status}`);
  return res.json();
}

export async function patchSetting(key: string, partial: UiSettingValue): Promise<any> {
  const res = await fetch(`${API_BASE}/settings/${encodeURIComponent(key)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: partial }),
  });
  if (!res.ok) throw new Error(`Failed to patch setting ${key}: ${res.status}`);
  return res.json();
}

export async function deleteSetting(key: string): Promise<void> {
  const res = await fetch(`${API_BASE}/settings/${encodeURIComponent(key)}`, { method: 'DELETE' });
  if (res.status === 404) return;
  if (!res.ok) throw new Error(`Failed to delete setting ${key}: ${res.status}`);
}

// Simple HTML helpers for static UI blocks
export async function getSettingHtml(key: string): Promise<string> {
  const res = await fetch(`${API_BASE}/settings/${encodeURIComponent(key)}/html`);
  if (!res.ok) throw new Error(`Failed to fetch setting HTML ${key}: ${res.status}`);
  // API returns a JSON string, ensure we return a string
  const data = await res.json();
  return typeof data === 'string' ? data : '';
}

export async function setSettingHtml(key: string, html: string): Promise<void> {
  const res = await fetch(`${API_BASE}/settings/${encodeURIComponent(key)}/html`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html }),
  });
  if (!res.ok) throw new Error(`Failed to set setting HTML ${key}: ${res.status}`);
}

// Media CRUD
export interface MediaDto {
  id: number;
  file_path: string;
  disk: string | null;
  alt_text: string | null;
  caption: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

type Paginated<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export async function listMedia(params?: { active?: boolean; q?: string; page?: number }): Promise<Paginated<MediaDto>> {
  const sp = new URLSearchParams();
  if (params?.active) sp.set('active', '1');
  if (params?.q) sp.set('q', params.q);
  if (params?.page) sp.set('page', String(params.page));
  const url = `${API_BASE}/media${sp.toString() ? `?${sp.toString()}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch media: ${res.status}`);
  return res.json();
}

export async function getMedia(id: number): Promise<MediaDto> {
  const res = await fetch(`${API_BASE}/media/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch media ${id}: ${res.status}`);
  return res.json();
}

export async function uploadMedia(file: File, meta?: { alt_text?: string; caption?: string; is_active?: boolean; disk?: string }): Promise<MediaDto> {
  const fd = new FormData();
  fd.append('file', file);
  if (meta?.alt_text) fd.append('alt_text', meta.alt_text);
  if (meta?.caption) fd.append('caption', meta.caption);
  if (typeof meta?.is_active === 'boolean') fd.append('is_active', meta.is_active ? '1' : '0');
  if (meta?.disk) fd.append('disk', meta.disk);
  const res = await fetch(`${API_BASE}/media`, { method: 'POST', body: fd });
  if (!res.ok) throw new Error(`Failed to upload media: ${res.status}`);
  return res.json();
}

export async function updateMedia(id: number, data?: { alt_text?: string; caption?: string; is_active?: boolean; disk?: string }, file?: File): Promise<MediaDto> {
  const fd = new FormData();
  if (file) fd.append('file', file);
  if (data?.alt_text !== undefined) fd.append('alt_text', data.alt_text ?? '');
  if (data?.caption !== undefined) fd.append('caption', data.caption ?? '');
  if (data?.is_active !== undefined) fd.append('is_active', data.is_active ? '1' : '0');
  if (data?.disk !== undefined) fd.append('disk', data.disk ?? '');
  const res = await fetch(`${API_BASE}/media/${id}`, { method: 'POST', body: fd, headers: { 'X-HTTP-Method-Override': 'PUT' } });
  if (!res.ok) throw new Error(`Failed to update media ${id}: ${res.status}`);
  return res.json();
}

export async function deleteMedia(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/media/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to delete media ${id}: ${res.status}`);
}
