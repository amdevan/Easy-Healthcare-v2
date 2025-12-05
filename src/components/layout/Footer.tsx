import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Editable from '@/components/ui/Editable';
import Button from '@/components/ui/Button';
import { Phone, Mail, MapPin, ArrowUpRight, Globe, ShieldCheck, Star } from 'lucide-react';

const FooterLinkColumn: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h4 className="font-bold text-brand-gray-900 mb-4">{title}</h4>
    <ul className="space-y-2">{children}</ul>
  </div>
);

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState<string | null>(null);
  const [lang, setLang] = useState('en');
  useEffect(() => {
    const saved = localStorage.getItem('siteLang');
    if (saved) setLang(saved);
  }, []);
  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setSubscribed('Please enter a valid email'); return; }
    setSubscribed('Subscribed successfully');
    setEmail('');
  };
  const onLangChange = (val: string) => {
    setLang(val);
    localStorage.setItem('siteLang', val);
  };

  return (
    <footer className="bg-brand-gray-200 text-brand-gray-800">
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-4 gap-8 items-start">
            <div>
              <Editable tag="h3" id="footer-title" className="text-2xl font-extrabold text-brand-gray-900">Easy Healthcare 101</Editable>
              <Editable tag="p" id="footer-desc" className="mt-2 text-brand-gray-600">Your trusted partner for accessible and comprehensive healthcare solutions.</Editable>
              <div className="mt-4 flex items-center gap-3 text-brand-gray-700">
                <Phone className="w-4 h-4" />
                <span>+977 1-4510101</span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-brand-gray-700">
                <Mail className="w-4 h-4" />
                <span>support@easyhealthcare101.com</span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-brand-gray-700">
                <MapPin className="w-4 h-4" />
                <span>Kathmandu Nepal</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-blue" />
                <span className="text-sm text-brand-gray-600">HIPAA-aware and privacy-focused</span>
              </div>
            </div>

            <FooterLinkColumn title="For Patients">
              <li><Link to="/find-doctors" className="hover:text-brand-blue">Find Doctors</Link></li>
              <li><Link to="/video-consult" className="hover:text-brand-blue">Video Consult</Link></li>
              {/* Lab Tests link removed */}
              <li><Link to="/pharmacy" className="hover:text-brand-blue">Pharmacy</Link></li>
              <li><Link to="/primary-health" className="hover:text-brand-blue">Primary Health</Link></li>
            </FooterLinkColumn>

            <FooterLinkColumn title="Company">
              <li><Link to="/about" className="hover:text-brand-blue">About</Link></li>
              <li><Link to="/about/board-of-director" className="hover:text-brand-blue">Board of Director</Link></li>
              <li><Link to="/about/management-team" className="hover:text-brand-blue">Management Team</Link></li>
              <li><Link to="/clinics-locations" className="hover:text-brand-blue">Clinics & Locations</Link></li>
              <li><Link to="/contact" className="hover:text-brand-blue">Contact</Link></li>
            </FooterLinkColumn>

            <div>
              <h4 className="font-bold text-brand-gray-900 mb-4">Stay Updated</h4>
              <form onSubmit={onSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
                <Button variant="primary" size="md">Subscribe</Button>
              </form>
              {subscribed && (
                <div className="mt-2 text-sm text-brand-gray-700">{subscribed}</div>
              )}
              <div className="mt-6 flex items-center gap-3">
                <Button variant="outline" size="sm" href="#">
                  <ArrowUpRight className="w-4 h-4 mr-2" /> App Store
                </Button>
                <Button variant="outline" size="sm" href="#">
                  <ArrowUpRight className="w-4 h-4 mr-2" /> Play Store
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-2 text-brand-gray-700">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="text-sm">4.8/5 average user rating</span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <select
                aria-label="Select language"
                value={lang}
                onChange={(e) => onLangChange(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <div className="text-sm text-brand-gray-600">
              <Link to="/privacy" className="hover:text-brand-blue mr-4">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-brand-blue">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-6 text-center md:text-left md:flex justify-between items-center text-sm text-brand-gray-700">
          <p>&copy; {new Date().getFullYear()} Easy Healthcare 101. All rights reserved.</p>
          <div className="mt-2 md:mt-0 flex items-center gap-4">
            <span className="text-brand-gray-700">
              Design &amp; Develop By{' '}
              <a
                href="https://itrelevant.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:underline"
              >
                IT Relevant
              </a>
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-brand-blue text-brand-blue rounded-md hover:bg-blue-50"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
