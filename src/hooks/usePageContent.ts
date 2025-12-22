import { useState, useEffect } from 'react';

export interface PageContentBlock {
  type: string;
  data: any;
}

export interface PageData {
  id: number;
  title: string;
  slug: string;
  content: PageContentBlock[];
  hero_image?: string;
  seo_title?: string;
  seo_description?: string;
}

export const usePageContent = (slug: string) => {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const fetchPage = async () => {
      try {
        setLoading(true);
        // Using /api prefix which is proxied to backend
        const response = await fetch(`/api/pages/${slug}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch page: ${response.statusText}`);
        }
        const jsonData = await response.json();
        if (!ignore) {
          setData(jsonData);
        }
      } catch (err: any) {
        if (!ignore) {
          console.error(`Error fetching page ${slug}:`, err);
          setError(err.message || 'Failed to fetch page content');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchPage();

    return () => {
      ignore = true;
    };
  }, [slug]);

  return { data, loading, error };
};
