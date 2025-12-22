import React, { useEffect, useState } from 'react';
import Editable from '@/components/ui/Editable';
import { fetchArticles, ArticleDto } from '@/controllers/api';
import { resolveSrc } from '@/utils/url';

interface ArticleCardProps {
  image: string;
  category: string;
  title: string;
  author: string;
  categoryColor: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ image, category, title, author, categoryColor }) => (
  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <span className={`text-sm font-semibold ${categoryColor}`}>{category}</span>
      <Editable tag="h3" id={`article-title-${title.substring(0, 10).replace(/\s+/g, '-')}`} className="mt-2 text-lg font-bold text-brand-gray-900 hover:text-brand-blue transition-colors">
        <a href="#">{title}</a>
      </Editable>
      <Editable tag="p" id={`article-author-${author.replace(/\s+/g, '-')}`} className="mt-3 text-sm text-brand-gray-500">{author}</Editable>
    </div>
  </div>
);

interface ArticlesProps {
    title?: string;
    subtitle?: string;
    defaultImage?: string;
}

const Articles: React.FC<ArticlesProps> = ({ title, subtitle, defaultImage }) => {
  const [articles, setArticles] = useState<ArticleDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    fetchArticles()
      .then((res) => { if (!ignore) setArticles(res.data); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    return () => { ignore = true; };
  }, []);

  const fallbackImage = defaultImage ? resolveSrc(defaultImage) : 'https://picsum.photos/400/300?grayscale';

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <Editable tag="h2" id="articles-title" className="text-3xl font-extrabold text-brand-gray-900">
                {title || "Read top articles from health experts"}
            </Editable>
            <Editable tag="p" id="articles-subtitle" className="mt-2 text-brand-gray-500">
                {subtitle || "Health articles that keep you informed about good health practices and achieve your goals."}
            </Editable>
          </div>
          <a href="#" className="hidden sm:inline-block px-5 py-2.5 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue-dark transition-colors">
            See all articles
          </a>
        </div>

        {loading && (
          <div className="mt-6 text-brand-gray-600">Loading articles...</div>
        )}
        {error && (
          <div className="mt-6 text-red-600">{error}</div>
        )}
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <img src={fallbackImage} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className={`text-sm font-semibold text-brand-blue`}>Article</span>
                <Editable tag="h3" id={`article-title-${article.slug}`} className="mt-2 text-lg font-bold text-brand-gray-900 hover:text-brand-blue transition-colors">
                  <a href="#">{article.title}</a>
                </Editable>
                <Editable tag="p" id={`article-published-${article.id}`} className="mt-3 text-sm text-brand-gray-500">
                  {article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Unpublished'}
                </Editable>
              </div>
            </div>
          ))}
        </div>
         <div className="text-center mt-8 sm:hidden">
           <a href="#" className="px-5 py-2.5 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue-dark transition-colors">
            See all articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default Articles;
