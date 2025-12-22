import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchHeaderSetting, HeaderSettingDto, resolveStorageUrl } from '@/controllers/api';

const Logo: React.FC<{ url?: string | null; brandName?: string | null; showBrandName?: boolean | string | number; height?: string | number | null }> = ({ url, brandName, showBrandName, height }) => {
  const logoHeight = height ? `${height}px` : '40px';
  // Handle various falsy values from backend (false, 0, "0", "false")
  const isHidden = showBrandName === false || showBrandName === 'false' || showBrandName === 0 || showBrandName === '0';
  const shouldShowBrand = !isHidden && !!brandName;
  
  return (
    <Link to="/" className="flex items-center space-x-2">
      {url ? (
        <img 
          src={resolveStorageUrl(url)} 
          alt={brandName || "Logo"} 
          className="w-auto object-contain" 
          style={{ height: logoHeight }}
        />
      ) : (
        <div className="bg-yellow-400 rounded-full flex items-center justify-center" style={{ width: logoHeight, height: logoHeight }}>
          <svg className="w-3/5 h-3/5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
      )}
      {shouldShowBrand && (
        <span className="font-bold text-lg text-brand-blue">
          {brandName}
        </span>
      )}
    </Link>
  );
};

const Header: React.FC = () => {
  const [headerSetting, setHeaderSetting] = useState<HeaderSettingDto | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  
  const servicesMenuRef = useRef<HTMLDivElement | null>(null);
  const aboutMenuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // Services dropdown items
  const servicesMenu = useMemo(() => {
    if (headerSetting?.services_menu && headerSetting.services_menu.length > 0) {
      return headerSetting.services_menu;
    }
    return [
      { label: 'Primary Health Care', href: '/primary-health' },
      { label: 'Digital Health & Telemedicine', href: '/telemedicine' },
      { label: 'Diagnostics & Laboratory', href: '/lab-tests' },
      { label: 'Health Package', href: '/health-package' },
      { label: 'Non-Emergency Medical Transport (NEMT)', href: '/nemt' },
      { label: 'Community Health Programs', href: '/community-health' },
    ];
  }, [headerSetting]);

  // About dropdown items
  const aboutMenu = useMemo(() => {
    const defaultAbout = [
      {
        label: 'About Us',
        href: '/about',
        desc: 'Mission, vision, values and our ecosystem.',
        icon: (
          <svg className="w-5 h-5 text-brand-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6v6m0 6h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          </svg>
        ),
      },
      {
        label: 'Board of Director',
        href: '/about/board-of-director',
        desc: 'Governance, strategy and oversight.',
        icon: (
          <svg className="w-5 h-5 text-brand-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 21a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        label: 'Management Team',
        href: '/about/management-team',
        desc: 'Leadership across operations and innovation.',
        icon: (
          <svg className="w-5 h-5 text-brand-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 9a4 4 0 108 0 4 4 0 00-8 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 21a10 10 0 0120 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
    ];

    if (headerSetting?.about_menu && headerSetting.about_menu.length > 0) {
      return headerSetting.about_menu.map((item, index) => {
        const defaultItem = defaultAbout.find(d => d.label === item.label) || defaultAbout[index];
        return {
          ...item,
          icon: defaultItem?.icon || (
            <svg className="w-5 h-5 text-brand-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )
        };
      });
    }
    return defaultAbout;
  }, [headerSetting]);

  const effectiveLinks = useMemo(() => {
    // If backend links are provided, use them
    if (headerSetting?.links && headerSetting.links.length > 0) {
      return headerSetting.links;
    }

    // Fallback links
    return [
      { label: 'Video Consult', href: '/telemedicine' },
      { label: 'Find Doctors & Clinics', href: '/find-doctors' },
      { label: 'Health Package', href: '/health-package' },
      { label: 'Membership', href: '/membership' },
      { label: 'Lab Tests', href: '/lab-tests' },
      { label: 'Easy Pharmacy', href: '/pharmacy' },
      { label: 'Clinics & Locations', href: '/clinics-locations' },
      { label: 'Our Services', href: '#' },
      { label: 'About', href: '#' },
      { label: 'Contact', href: '/contact' },
    ];
  }, [headerSetting]);

  useEffect(() => {
    let mounted = true;
    fetchHeaderSetting()
      .then((data) => {
        if (mounted) setHeaderSetting(data);
      })
      .catch(() => {
        // keep fallback on error
      });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
    if (servicesOpen) setServicesOpen(false);
    if (aboutOpen) setAboutOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Click outside handlers
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!servicesOpen) return;
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, [servicesOpen]);

  useEffect(() => {
    function handleAboutDocClick(e: MouseEvent) {
      if (!aboutOpen) return;
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    }
    document.addEventListener('mousedown', handleAboutDocClick);
    return () => document.removeEventListener('mousedown', handleAboutDocClick);
  }, [aboutOpen]);

  useEffect(() => {
    function onScroll() {
      if (aboutOpen) setAboutOpen(false);
      if (servicesOpen) setServicesOpen(false);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [aboutOpen, servicesOpen]);

  const toggleMobile = () => setMobileOpen((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const renderDesktopLink = (link: { label: string; href: string; type?: string }, index: number) => {
    const isServices = link.type === 'services_dropdown' || (!link.type && link.label.toLowerCase() === 'our services');
    const isAbout = link.type === 'about_dropdown' || (!link.type && link.label.toLowerCase() === 'about');

    if (isServices) {
      return (
        <div key={index} className="relative group" ref={servicesMenuRef}>
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className={`flex items-center space-x-1 px-2 py-2 rounded-md text-base transition-colors duration-200 focus:outline-none ${servicesOpen ? 'text-brand-blue bg-blue-50' : 'text-brand-gray-700 hover:text-brand-blue hover:bg-gray-50'}`}
            aria-haspopup="true"
            aria-expanded={servicesOpen}
          >
            <span>{link.label}</span>
            <svg className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          {servicesOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-fade-in-down">
              {servicesMenu.map((item, i) => (
                <Link
                  key={i}
                  to={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-brand-blue transition-colors"
                  role="menuitem"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (isAbout) {
      return (
        <div key={index} className="relative group" ref={aboutMenuRef}>
          <button
            onClick={() => setAboutOpen(!aboutOpen)}
            className={`flex items-center space-x-1 px-2 py-2 rounded-md text-base transition-colors duration-200 focus:outline-none ${aboutOpen ? 'text-brand-blue bg-blue-50' : 'text-brand-gray-700 hover:text-brand-blue hover:bg-gray-50'}`}
            aria-haspopup="true"
            aria-expanded={aboutOpen}
          >
            <span>{link.label}</span>
            <svg className={`w-4 h-4 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          {aboutOpen && (
            <div className="absolute top-full right-0 mt-1 w-80 bg-white rounded-lg shadow-xl border border-gray-100 p-4 z-50 animate-fade-in-down grid grid-cols-1 gap-2">
              {aboutMenu.map((item, i) => (
                <Link
                  key={i}
                  to={item.href}
                  className="flex items-start space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors group/item"
                  role="menuitem"
                >
                  <div className="mt-1 text-gray-400 group-hover/item:text-brand-blue transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-gray-900 group-hover/item:text-brand-blue transition-colors">{item.label}</span>
                    <span className="block text-xs text-gray-500 mt-0.5">{item.desc}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    const isInternal = link.href.startsWith('/');
    if (isInternal) {
      return (
        <Link
          key={index}
          to={link.href}
          className={`px-2 py-2 rounded-md text-base transition-colors duration-200 ${isActive(link.href) ? 'text-brand-blue font-semibold bg-blue-50' : 'text-brand-gray-700 hover:text-brand-blue hover:bg-gray-50'}`}
        >
          {link.label}
        </Link>
      );
    }
    return (
      <a
        key={index}
        href={link.href}
        className="px-2 py-2 rounded-md text-base text-brand-gray-700 hover:text-brand-blue hover:bg-gray-50 transition-colors duration-200"
      >
        {link.label}
      </a>
    );
  };

  return (
    <>
      <header className="fixed w-full top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-300">
      {/* Top Bar */}
      {headerSetting?.top_bar?.enabled && (
        <div className="bg-[#EFF6FF] border-b border-blue-100 hidden md:block">
          <div className="w-full px-4 sm:px-6 lg:px-8 h-10 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              {/* Address */}
              {headerSetting.top_bar.address && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>Address: {headerSetting.top_bar.address}</span>
                </div>
              )}
              {/* Phone */}
              {headerSetting.top_bar.phone && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <span>{headerSetting.top_bar.phone}</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {/* Action Buttons */}
              {headerSetting.top_bar.action_buttons?.map((btn, i) => (
                <Link 
                  key={i}
                  to={btn.href} 
                  className={`${btn.variant === 'secondary' ? 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50' : 'bg-blue-600 text-white hover:bg-blue-700'} px-4 py-1.5 rounded-md text-xs font-semibold transition-colors`}
                >
                  {btn.label}
                </Link>
              ))}
              {/* Login */}
              {headerSetting.top_bar.login_label && (
                <Link to={headerSetting.top_bar.login_href || '#'} className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  <span>{headerSetting.top_bar.login_label}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Logo 
              url={headerSetting?.logo_url} 
              brandName={headerSetting?.brand_name} 
              showBrandName={headerSetting?.show_brand_name as any}
              height={headerSetting?.logo_height} 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4 items-center">
            {effectiveLinks.map((link, i) => renderDesktopLink(link, i))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobile}
              className="p-2 rounded-md text-brand-gray-700 hover:text-brand-blue hover:bg-blue-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {effectiveLinks.map((link, i) => {
              const isServices = link.type === 'services_dropdown' || (!link.type && link.label.toLowerCase() === 'our services');
              const isAbout = link.type === 'about_dropdown' || (!link.type && link.label.toLowerCase() === 'about');
              
              if (isServices) {
                return (
                  <div key={i} className="space-y-1">
                     <div className="px-2 py-2 font-medium text-brand-gray-900 bg-gray-50 rounded-md">Our Services</div>
                     <div className="pl-4 space-y-1 border-l-2 border-gray-100 ml-2">
                       {servicesMenu.map((item, j) => (
                         <Link
                           key={j}
                           to={item.href}
                           onClick={closeMobile}
                           className="block px-2 py-2 text-sm text-brand-gray-700 hover:text-brand-blue rounded-md"
                         >
                           {item.label}
                         </Link>
                       ))}
                     </div>
                  </div>
                );
              }
              if (isAbout) {
                return (
                  <div key={i} className="space-y-1">
                     <div className="px-2 py-2 font-medium text-brand-gray-900 bg-gray-50 rounded-md">About</div>
                     <div className="pl-4 space-y-1 border-l-2 border-gray-100 ml-2">
                       {aboutMenu.map((item, j) => (
                         <Link
                           key={j}
                           to={item.href}
                           onClick={closeMobile}
                           className="block px-2 py-2 text-sm text-brand-gray-700 hover:text-brand-blue rounded-md"
                         >
                           {item.label}
                         </Link>
                       ))}
                     </div>
                  </div>
                );
              }

              const isInternal = link.href.startsWith('/');
              if (isInternal) {
                return (
                  <Link
                    key={i}
                    to={link.href}
                    onClick={closeMobile}
                    className={`block px-2 py-2 rounded-md transition-colors ${isActive(link.href) ? 'text-brand-blue bg-blue-50 font-medium' : 'text-brand-gray-700 hover:bg-gray-50'}`}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <a
                  key={i}
                  href={link.href}
                  onClick={closeMobile}
                  className="block px-2 py-2 rounded-md text-brand-gray-700 hover:bg-gray-50"
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
      </header>
      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className={`h-20 ${headerSetting?.top_bar?.enabled ? 'md:h-[120px]' : 'md:h-20'}`} />
    </>
  );
};

export default Header;
