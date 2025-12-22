import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchBanners, BannerDto } from '@/controllers/api';
import { X } from 'lucide-react';
import { resolveSrc } from '@/utils/url';

const PopupBanner: React.FC = () => {
  const [banner, setBanner] = useState<BannerDto | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const banners = await fetchBanners();
        if (banners && banners.length > 0) {
          // Find the first banner that matches current page and hasn't been dismissed
          const activeBanner = banners.find(b => {
            const dismissed = sessionStorage.getItem(`popup_banner_dismissed_${b.id}`);
            if (dismissed) return false;

            if (b.show_on_all_pages) return true;
            
            // Check specific pages
            if (b.pages && Array.isArray(b.pages)) {
               return b.pages.includes(location.pathname);
            }
            
            return false;
          });

          if (activeBanner) {
            setBanner(activeBanner);
            // Small delay to allow page to load a bit before popping up
            setTimeout(() => setIsVisible(true), 1000);
          }
        }
      } catch (error) {
        console.error('Failed to load popup banner:', error);
      }
    };

    // Reset visibility when route changes, then check again
    setIsVisible(false);
    setBanner(null);
    loadBanners();
  }, [location.pathname]);

  const handleClose = () => {
    if (banner) {
      setIsVisible(false);
      sessionStorage.setItem(`popup_banner_dismissed_${banner.id}`, 'true');
      setTimeout(() => setBanner(null), 300);
    }
  };

  // Accessibility & UX: lock scroll, Esc to close, focus close button
  useEffect(() => {
    if (!isVisible) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    // focus close button for keyboard users
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [isVisible]);

  if (!banner || !isVisible) return null;

  // Prefer uploaded image, fallback to legacy image_url
  // Use display_image_url if available (from backend accessor)
  const imageUrl = banner.display_image_url || (banner.image ? resolveSrc(banner.image) : (banner.image_url ? resolveSrc(banner.image_url) : null));

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-2xl lg:max-w-3xl w-full overflow-hidden transform transition-all duration-300 scale-100 animate-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-banner-title"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          ref={closeBtnRef}
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-full text-slate-600 hover:text-slate-900 transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label="Close banner"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="flex flex-col">
          {imageUrl && (
            <div className="w-full h-72 sm:h-96 md:h-[28rem] bg-slate-100 relative">
               <img 
                 src={imageUrl} 
                 alt={banner.title || 'Promotional banner'} 
                 className="w-full h-full object-cover"
                 loading="lazy"
               />
            </div>
          )}
          
          <div className="p-5 text-center">
            <h3 id="popup-banner-title" className="text-2xl font-bold text-slate-900 mb-2">
              {banner.title}
            </h3>
            
            <div className="mt-1 flex items-center gap-3 justify-center md:justify-between">
              {banner.subtitle && (
                <p className="text-slate-600 text-sm md:text-base leading-relaxed m-0">
                  {banner.subtitle}
                </p>
              )}
              {banner.link_url && (
                <a 
                  href={banner.link_url}
                  target={banner.link_url.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="inline-flex px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleClose}
                >
                  {banner.button_text || 'Learn More'}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupBanner;
