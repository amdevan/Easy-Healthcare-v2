
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchHeaderSetting, HeaderSettingDto } from '@/controllers/api';
import Button from '@/components/ui/Button';

const Logo: React.FC = () => (
  <Link to="/" className="flex items-center space-x-2">
    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
      <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </div>
    <span className="font-bold text-lg text-brand-gray-900">
      Easy <span className="font-extrabold text-brand-blue">Healthcare101</span>
    </span>
  </Link>
);


const Header: React.FC = () => {
  const [headerSetting, setHeaderSetting] = useState<HeaderSettingDto | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutMenuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const fallbackLinks = [
    { label: 'Video Consult', href: '/video-consult' },
    { label: 'Lab Tests', href: '/lab-tests' },
  ];

  // Services dropdown items (map to existing routes where sensible)
  const servicesMenu = [
    { label: 'Primary Health Care', href: '#' },
    { label: 'Digital Health & Telemedicine', href: '/video-consult' },
    { label: 'Diagnostics & Laboratory', href: '/lab-tests' },
    { label: 'Pharmacy Services', href: '/pharmacy' },
    { label: 'Non-Emergency Medical Transport (NEMT)', href: '/nemt' },
    { label: 'Community Health Programs', href: '#' },
  ];

  // About dropdown items with icons and short descriptions
  const aboutMenu = [
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


  // Split links so that "About" appears on the right next to Contact (desktop)
  const linksSource = (headerSetting?.links ?? fallbackLinks).filter((l) => {
    const lbl = l.label?.trim().toLowerCase() ?? '';
    return l.href !== '/find-doctors' && !lbl.includes('find doctors');
  });
  const normalizeLabel = (label?: string) => {
    const l = label?.trim().toLowerCase();
    return l === 'find doctors' ? 'Find Doctors & Clinics' : (label ?? '');
  };
  const links = linksSource.map(l => ({ ...l, label: normalizeLabel(l.label) }));
  const hasPharmacyLink = links.some(
    (l) => l.href === '/pharmacy' || (l.label && l.label.toLowerCase().includes('pharmacy'))
  );
  const linksAugmented = hasPharmacyLink ? links : [...links, { label: 'Easy Pharmacy', href: '/pharmacy' }];

  // Insert "Products" link immediately to the right of "Easy Pharmacy"
  const hasProductsLink = linksAugmented.some(
    (l) => l.href === '/products' || (l.label && l.label.toLowerCase().includes('products'))
  );
  let linksWithProducts = linksAugmented;
  if (!hasProductsLink) {
    const pharmacyIndex = linksAugmented.findIndex(
      (l) => l.href === '/pharmacy' || (l.label && l.label.toLowerCase().includes('pharmacy'))
    );
    if (pharmacyIndex >= 0) {
      linksWithProducts = [
        ...linksAugmented.slice(0, pharmacyIndex + 1),
        { label: 'Products', href: '/products' },
        ...linksAugmented.slice(pharmacyIndex + 1),
      ];
    } else {
      linksWithProducts = [...linksAugmented, { label: 'Products', href: '/products' }];
    }
  }
  // Insert "Membership" link right after "Products"
  const hasMembershipLink = linksWithProducts.some(
    (l) => l.href === '/membership' || (l.label && l.label.toLowerCase().includes('membership'))
  );
  let linksWithMembership = linksWithProducts;
  if (!hasMembershipLink) {
    const productsIndex = linksWithProducts.findIndex(
      (l) => l.href === '/products' || (l.label && l.label.toLowerCase().includes('products'))
    );
    const membershipItem = { label: 'Membership', href: '/membership' };
    if (productsIndex >= 0) {
      linksWithMembership = [
        ...linksWithProducts.slice(0, productsIndex + 1),
        membershipItem,
        ...linksWithProducts.slice(productsIndex + 1),
      ];
    } else {
      linksWithMembership = [...linksWithProducts, membershipItem];
    }
  }

  const aboutIndex = linksWithMembership.findIndex(
    (l) => l.label?.toLowerCase() === 'about' || l.href === '/about'
  );
  const aboutLink = aboutIndex >= 0 ? linksWithMembership[aboutIndex] : null;
  const leftLinks = aboutIndex >= 0
    ? [...linksWithMembership.slice(0, aboutIndex), ...linksWithMembership.slice(aboutIndex + 1)]
    : linksWithMembership;

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
  // Close mobile menu on route changes
  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
    // Also close any open dropdowns when navigating
    if (servicesOpen) setServicesOpen(false);
    if (aboutOpen) setAboutOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const toggleMobile = () => setMobileOpen((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  // Close services dropdown on outside click
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!servicesOpen) return;
      const target = e.target as Node;
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, [servicesOpen]);

  // Close about dropdown on outside click
  useEffect(() => {
    function handleAboutDocClick(e: MouseEvent) {
      if (!aboutOpen) return;
      const target = e.target as Node;
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(target)) {
        setAboutOpen(false);
      }
    }
    document.addEventListener('mousedown', handleAboutDocClick);
    return () => document.removeEventListener('mousedown', handleAboutDocClick);
  }, [aboutOpen]);

  // Close About dropdown on scroll (subtle guard to avoid lingering open state)
  useEffect(() => {
    function onScroll() {
      if (aboutOpen) setAboutOpen(false);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [aboutOpen]);

  // Keyboard navigation within services dropdown
  const handleServicesKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!servicesOpen) return;
    const items = servicesMenuRef.current?.querySelectorAll('[role="menuitem"]');
    if (!items || items.length === 0) return;
    const itemsArr = Array.from(items) as HTMLElement[];
    const currentIndex = itemsArr.findIndex((el) => el === document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % itemsArr.length : 0;
      itemsArr[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = currentIndex >= 0 ? (currentIndex - 1 + itemsArr.length) % itemsArr.length : itemsArr.length - 1;
      itemsArr[prevIndex].focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      itemsArr[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      itemsArr[itemsArr.length - 1].focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setServicesOpen(false);
    }
  };

  // Keyboard navigation within About dropdown
  const handleAboutKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!aboutOpen) return;
    const items = aboutMenuRef.current?.querySelectorAll('[role="menuitem"]');
    if (!items || items.length === 0) return;
    const itemsArr = Array.from(items) as HTMLElement[];
    const currentIndex = itemsArr.findIndex((el) => el === document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % itemsArr.length : 0;
      itemsArr[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = currentIndex >= 0 ? (currentIndex - 1 + itemsArr.length) % itemsArr.length : itemsArr.length - 1;
      itemsArr[prevIndex].focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      itemsArr[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      itemsArr[itemsArr.length - 1].focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setAboutOpen(false);
    }
  };
  
  const isActive = (href?: string) => {
    if (!href) return false;
    if (!href.startsWith('/')) return false;
    // Treat top-level paths as active when current path starts with them
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200/70">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Logo />
          <nav className="hidden lg:flex items-center space-x-6">
            {leftLinks.map(({ label, href }) => {
              const isInternal = href?.startsWith('/');
              if (isInternal) {
                return (
                  <Link
                    key={`${label}-${href}`}
                    to={href}
                    className={`px-2 py-2 rounded-md transition-colors duration-200 ${isActive(href) ? 'text-brand-blue font-semibold bg-blue-50' : 'text-brand-gray-700 hover:text-brand-blue hover:bg-gray-50'}`}
                  >
                    {label}
                  </Link>
                );
              }
              return (
                <a key={`${label}-${href}`} href={href} className="px-2 py-2 rounded-md text-brand-gray-700 hover:text-brand-blue hover:bg-gray-50 transition-colors duration-200">{label}</a>
              );
            })}
            {/* Our Services dropdown (desktop, accessible) */}
            <div className="relative" onMouseLeave={() => setServicesOpen(false)}>
              <button
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setServicesOpen((v) => !v);
                  if (e.key === 'Escape') setServicesOpen(false);
                }}
                className={`flex items-center gap-1 px-2 py-2 rounded-md transition-colors duration-200 ${servicesOpen ? 'text-brand-blue bg-blue-50' : 'text-brand-gray-700 hover:text-brand-blue hover:bg-gray-50'}`}
              >
                Our Services
                <svg className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {servicesOpen && (
              <div
                ref={servicesMenuRef}
                className="absolute left-0 mt-2 w-96 bg-white border rounded-md shadow-lg focus:outline-none"
                onKeyDown={handleServicesKeyDown}
              >
                <ul className="py-2" role="menu" aria-label="Our Services">
                  {servicesMenu.map(({ label, href }) => {
                    const isInternal = href?.startsWith('/');
                    if (isInternal) {
                      return (
                        <li key={`${label}-${href}`} role="none">
                          <Link to={href} role="menuitem" className="flex items-center gap-2 px-4 py-2 text-sm text-brand-gray-700 hover:bg-gray-50 focus:bg-blue-50 focus:text-brand-blue">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true"></span>
                            {label}
                          </Link>
                        </li>
                      );
                    }
                    return (
                      <li key={`${label}-${href}`} role="none">
                        <a href={href} role="menuitem" className="flex items-center gap-2 px-4 py-2 text-sm text-brand-gray-700 hover:bg-gray-50 focus:bg-blue-50 focus:text-brand-blue">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden="true"></span>
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t px-4 py-2">
                  <Link to="/services" role="menuitem" className="block text-sm font-semibold text-brand-blue hover:underline">Explore all services</Link>
                </div>
              </div>
              )}
            </div>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            {/* About dropdown (desktop, accessible) */}
            <div className="relative" onMouseLeave={() => setAboutOpen(false)}>
              <button
                aria-haspopup="true"
                aria-expanded={aboutOpen}
                onClick={() => setAboutOpen((v) => !v)}
                onMouseEnter={() => setAboutOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setAboutOpen((v) => !v);
                  if (e.key === 'Escape') setAboutOpen(false);
                }}
                className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${aboutOpen ? 'text-brand-blue bg-blue-50' : 'text-brand-gray-700 hover:bg-gray-100'}`}
              >
                About
                <svg className={`w-4 h-4 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {aboutOpen && (
              <div
                ref={aboutMenuRef}
                className="absolute right-0 mt-2 w-[42rem] bg-white/90 backdrop-blur border rounded-xl shadow-xl ring-1 ring-black/5 focus:outline-none transition-all duration-200"
                onKeyDown={handleAboutKeyDown}
              >
                {/* Pointer arrow */}
                <div className="absolute -top-1 right-8 w-3 h-3 bg-white/90 rotate-45 border-t border-l rounded-sm" aria-hidden="true" />
                <div className="p-4 grid grid-cols-3 gap-4">
                  {/* Column 1: Feature card */}
                  <Link to="/about" role="menuitem" className="group col-span-1 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 px-4 py-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-7 h-7 text-brand-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m9.46 9.46l2.12 2.12M5.64 18.36l2.12-2.12m9.46-9.46l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <div className="text-base font-semibold text-brand-gray-900">About Us</div>
                        <div className="text-xs text-brand-gray-600">Mission, vision, values and our ecosystem.</div>
                      </div>
                    </div>
                    <div className="mt-3 inline-flex items-center gap-1 text-brand-blue text-sm font-semibold">
                      Explore About
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 7l5 5-5 5M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </Link>

                  {/* Column 2: Key sections */}
                  <ul className="col-span-1 space-y-2" role="menu" aria-label="About sections">
                    {aboutMenu.filter(i => i.href !== '/about').map(({ label, href, icon, desc }) => (
                      <li key={`${label}-${href}`} role="none">
                        <Link
                          to={href}
                          role="menuitem"
                          className={`flex items-start gap-3 rounded-md px-3 py-2 text-sm transition-colors ${isActive(href) ? 'bg-blue-50 text-brand-blue' : 'text-brand-gray-700 hover:bg-gray-50 focus:bg-blue-50 focus:text-brand-blue'}`}
                        >
                          <span aria-hidden="true">{icon}</span>
                          <span className="flex-1">
                            <span className="block font-semibold">{label}</span>
                            <span className="block text-xs text-brand-gray-600">{desc}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Column 3: Helpful links */}
                  <div className="col-span-1">
                    <div className="rounded-lg border px-3 py-3">
                      <div className="text-xs font-semibold text-brand-gray-900 mb-2">Quick Links</div>
                      <div className="flex flex-col gap-2">
                        <Link to="/contact" role="menuitem" className="inline-flex items-center gap-2 text-sm text-brand-gray-700 hover:text-brand-blue">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 01-2 2h-4l-3 3-3-3H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          Contact
                        </Link>
                        <Link to="/products" role="menuitem" className="inline-flex items-center gap-2 text-sm text-brand-gray-700 hover:text-brand-blue">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 12l4-4M4 12l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          Products
                        </Link>
                        <Link to="/membership" role="menuitem" className="inline-flex items-center gap-2 text-sm text-brand-gray-700 hover:text-brand-blue">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8l-6 6h12l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          Membership
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
            <Link
              to="/contact"
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${isActive('/contact') ? 'text-brand-blue bg-blue-50' : 'text-brand-gray-700 hover:bg-gray-100'}`}
            >
              Contact
            </Link>
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={toggleMobile}
            className="lg:hidden p-2 rounded-md text-brand-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {headerSetting?.cta?.href ? (
            <Button to={headerSetting.cta.href || '/auth/login'} size="md" variant="primary">
              {headerSetting.cta.label || 'Login / Signup'}
            </Button>
          ) : (
            <Button to="/auth/login" size="md" variant="primary">Login / Signup</Button>
          )}
          <Button to="/auth/login" size="md" variant="primary">
            Patient Login
          </Button>
        </div>
      </div>
          {mobileOpen && (
            <>
              {/* Overlay to close on outside click */}
              <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={closeMobile} />
              {/* Dropdown panel */}
              <div className="lg:hidden absolute left-0 right-0 top-full bg-white border-b shadow-sm z-50">
                <nav className="px-4 py-3 space-y-1">
                  {linksWithMembership.map(({ label, href }) => {
                    const isInternal = href?.startsWith('/');
                    if (isInternal) {
                      return (
                        <Link
                          key={`${label}-${href}`}
                          to={href}
                          onClick={closeMobile}
                          className={`block px-2 py-2 rounded-md transition-colors ${isActive(href) ? 'text-brand-blue bg-blue-50' : 'text-brand-gray-700 hover:bg-gray-50'}`}
                        >
                          {label}
                        </Link>
                      );
                    }
                    return (
                      <a
                        key={`${label}-${href}`}
                        href={href}
                        onClick={closeMobile}
                        className="block px-2 py-2 rounded-md text-brand-gray-700 hover:bg-gray-50"
                      >
                        {label}
                      </a>
                    );
                  })}
                  {/* Our Services (mobile section) */}
                  <div className="mt-2">
                    <div className="px-2 py-2 text-sm font-semibold text-brand-gray-900">Our Services</div>
                    {servicesMenu.map(({ label, href }) => {
                      const isInternal = href?.startsWith('/');
                      if (isInternal) {
                        return (
                          <Link
                            key={`${label}-${href}`}
                            to={href}
                            onClick={closeMobile}
                            className="block px-2 py-2 rounded-md text-brand-gray-700 hover:bg-gray-50"
                          >
                            {label}
                          </Link>
                        );
                      }
                      return (
                        <a
                          key={`${label}-${href}`}
                          href={href}
                          onClick={closeMobile}
                          className="block px-2 py-2 rounded-md text-brand-gray-700 hover:bg-gray-50"
                        >
                          {label}
                        </a>
                      );
                    })}
                  </div>
                  {/* About (mobile section) */}
                  <div className="mt-2">
                    <div className="px-2 py-2 text-sm font-semibold text-brand-gray-900">About</div>
                    {aboutMenu.map(({ label, href }) => (
                      <Link
                        key={`${label}-${href}`}
                        to={href}
                        onClick={closeMobile}
                        className="block px-2 py-2 rounded-md text-brand-gray-700 hover:bg-gray-50"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                  <Link to="/contact" onClick={closeMobile} className={`block px-2 py-2 rounded-md transition-colors ${isActive('/contact') ? 'text-brand-blue bg-blue-50' : 'text-brand-gray-700 hover:bg-gray-50'}`}>Contact</Link>
                  <Link to="/auth/login" onClick={closeMobile} className="block px-2 py-2 rounded-md text-brand-blue hover:bg-blue-50">Login / Signup</Link>
                </nav>
              </div>
            </>
          )}
    </header>
  );
};

export default Header;
