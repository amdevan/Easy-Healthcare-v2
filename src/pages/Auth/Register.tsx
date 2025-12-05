import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import GoogleLogo from '@/assets/icons/google.svg';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState<string>('+977');
  const [localPhone, setLocalPhone] = useState<string>('');
  const [countryQuery, setCountryQuery] = useState<string>('');
  const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Country options with flags (initial seed; will be replaced by fetched full list)
  const [countries, setCountries] = useState<{ iso: string; dial: string; name: string; flag: string }[]>([
    { iso: 'US', dial: '+1', name: 'United States', flag: '🇺🇸' },
    { iso: 'CA', dial: '+1', name: 'Canada', flag: '🇨🇦' },
    { iso: 'GB', dial: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { iso: 'IN', dial: '+91', name: 'India', flag: '🇮🇳' },
    { iso: 'NP', dial: '+977', name: 'Nepal', flag: '🇳🇵' },
    { iso: 'AU', dial: '+61', name: 'Australia', flag: '🇦🇺' },
    { iso: 'DE', dial: '+49', name: 'Germany', flag: '🇩🇪' },
    { iso: 'FR', dial: '+33', name: 'France', flag: '🇫🇷' },
    { iso: 'SG', dial: '+65', name: 'Singapore', flag: '🇸🇬' },
    { iso: 'AE', dial: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  ]);

  const countryDialMap = countries.reduce<Record<string, string>>((acc, c) => {
    acc[c.iso] = c.dial;
    return acc;
  }, {});

  // Minimal country code map; extend as needed
  useEffect(() => {
    // Default to Nepal regardless of browser locale
    const npDial = countries.find((c) => c.iso === 'NP')?.dial || '+977';
    setCountryCode(npDial);
  }, [countries]);

  // Fetch full country list (flags + dial codes) from Rest Countries
  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=cca2,idd,flag,name', { signal: controller.signal });
        if (!res.ok) return; // keep seed list on failure
        const data: Array<{ cca2: string; idd: { root?: string; suffixes?: string[] }; flag: string; name: { common: string } }> = await res.json();
        const enriched = data
          .filter((c) => c.idd && c.idd.root)
          .map((c) => {
            const root = c.idd.root || '';
            const suffix = (c.idd.suffixes && c.idd.suffixes[0]) || '';
            return {
              iso: (c.cca2 || '').toUpperCase(),
              dial: `${root}${suffix}`,
              name: c.name?.common || c.cca2,
              flag: c.flag || '',
            };
          })
          .filter((c) => c.dial.startsWith('+'))
          .sort((a, b) => a.name.localeCompare(b.name));
        if (enriched.length) setCountries(enriched);
      } catch (err) {
        // Ignore abort errors and network failures; keep seed list
        if ((err as any)?.name === 'AbortError') return;
      }
    };
    run();
    return () => controller.abort();
  }, []);

  const validate = () => {
    const errs: string[] = [];
    if (!name.trim()) errs.push('Full name is required.');
    if (!email.trim()) errs.push('Email is required.');
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) errs.push('Enter a valid email address.');
    const sanitizedLocal = localPhone.replace(/\D/g, '');
    const fullPhone = `${countryCode}${sanitizedLocal}`;
    if (!sanitizedLocal) errs.push('Phone number is required.');
    else if (!/^\+\d{7,15}$/.test(fullPhone)) errs.push('Enter a valid phone number.');
    if (!password) errs.push('Password is required.');
    else if (password.length < 8) errs.push('Password must be at least 8 characters.');
    if (confirm !== password) errs.push('Passwords do not match.');
    if (!acceptTerms) errs.push('You must accept the Terms & Privacy.');
    if (errs.length) {
      setError(errs.join(' '));
      return false;
    }
    setPhone(fullPhone);
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      // Placeholder: integrate with backend API here to create account and send OTPs
      const sanitizedLocal = localPhone.replace(/\D/g, '');
      const fullPhone = `${countryCode}${sanitizedLocal}`;
      navigate('/auth/verify-otp', { state: { email, phone: fullPhone } });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    // Placeholder for real OAuth flow. For now, simulate auth and navigate.
    login();
    navigate('/dashboard');
  };

  return (
    <section className="bg-brand-gray-100">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Visual / Intro panel */}
          <div className="hidden lg:block">
            <div className="relative h-full min-h-[480px] rounded-2xl overflow-hidden bg-brand-blue">
              <div className="absolute inset-0 bg-brand-blue/80" />
              <img
                src="https://picsum.photos/1000/800?healthcare"
                alt="Healthy lifestyle"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 p-10 text-white space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold tracking-tight">Join Easy Healthcare</span>
                </div>
                <h2 className="text-4xl font-extrabold leading-tight">
                  Create your account,
                  <br />
                  <span className="text-blue-100">start your care journey.</span>
                </h2>
                <p className="text-blue-50 max-w-md">
                  Access appointments, test results, and personalized health tools in one secure place.
                </p>
              </div>
            </div>
          </div>

          {/* Register form */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-gray-900">Create an account</h1>
                <p className="mt-2 text-brand-gray-600">Fill in your details below to get started.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-sm font-medium text-brand-gray-700">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-lg border border-brand-gray-300 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 px-4 py-2.5 text-brand-gray-900 placeholder-brand-gray-400 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-sm font-medium text-brand-gray-700">Phone number</label>
                  <div className="flex gap-2">
                    <div className="relative w-44">
                      <button
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={showCountryDropdown}
                        onClick={() => setShowCountryDropdown((v) => !v)}
                        className="flex w-full items-center justify-between rounded-lg border border-brand-gray-300 bg-white px-3 py-2.5 text-sm text-brand-gray-900 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 outline-none"
                      >
                        <span className="flex items-center gap-2 truncate">
                          {(countries.find((c) => c.dial === countryCode)?.flag) ?? ''}
                          <span className="text-brand-gray-800">{countryCode}</span>
                        </span>
                        <span className="ml-2 text-brand-gray-400">▾</span>
                      </button>
                      {showCountryDropdown && (
                        <div className="absolute z-20 mt-1 w-full rounded-lg border border-brand-gray-200 bg-white shadow-lg">
                          <input
                            type="text"
                            value={countryQuery}
                            onChange={(e) => setCountryQuery(e.target.value)}
                            placeholder="Search country or code"
                            className="w-full border-b border-brand-gray-200 px-3 py-2 text-sm text-brand-gray-900 placeholder-brand-gray-400 focus:outline-none"
                          />
                          <ul role="listbox" className="max-h-60 overflow-auto py-1">
                            {countries
                              .filter((c) => {
                                const q = countryQuery.trim().toLowerCase();
                                if (!q) return true;
                                return (
                                  c.name.toLowerCase().includes(q) ||
                                  c.iso.toLowerCase().includes(q) ||
                                  c.dial.toLowerCase().includes(q)
                                );
                              })
                              .map((c) => (
                                <li key={c.iso}>
                                  <button
                                    type="button"
                                    role="option"
                                    aria-selected={c.dial === countryCode}
                                    onClick={() => {
                                      setCountryCode(c.dial);
                                      setShowCountryDropdown(false);
                                      setCountryQuery('');
                                    }}
                                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-brand-gray-50 ${
                                      c.dial === countryCode ? 'bg-brand-gray-100' : ''
                                    }`}
                                  >
                                    <span className="flex items-center gap-2 truncate">
                                      <span>{c.flag}</span>
                                      <span className="text-brand-gray-900">{c.name}</span>
                                    </span>
                                    <span className="ml-2 text-brand-gray-500">{c.dial}</span>
                                  </button>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="e.g. 9812345678"
                      value={localPhone}
                      onChange={(e) => setLocalPhone(e.target.value)}
                      className="flex-1 rounded-lg border border-brand-gray-300 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 px-4 py-2.5 text-brand-gray-900 placeholder-brand-gray-400 outline-none"
                    />
                  </div>
                  <p className="text-xs text-brand-gray-500 pt-1">
                    {(() => {
                      const selected = countries.find((c) => c.dial === countryCode);
                      return `Example: ${selected ? selected.flag + ' ' + selected.dial : countryCode}9812345678`;
                    })()}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-sm font-medium text-brand-gray-700">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-brand-gray-300 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 px-4 py-2.5 text-brand-gray-900 placeholder-brand-gray-400 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-brand-gray-700">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border border-brand-gray-300 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 px-4 py-2.5 text-brand-gray-900 placeholder-brand-gray-400 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="confirm" className="block text-sm font-medium text-brand-gray-700">Confirm password</label>
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Re-enter password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="block w-full rounded-lg border border-brand-gray-300 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 px-4 py-2.5 text-brand-gray-900 placeholder-brand-gray-400 outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center text-sm text-brand-gray-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-brand-gray-300 rounded mr-2"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    I accept the <Link to="#" className="text-brand-blue hover:underline ml-1">Terms</Link> and <Link to="#" className="text-brand-blue hover:underline">Privacy</Link>
                  </label>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating account…' : 'Create account'}
                </Button>
              </form>

              {/* Social login options */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-brand-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-brand-gray-500">Or continue with</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#4285F4] hover:bg-[#357AE8] text-white px-4 py-2.5"
                  >
                    <img
                      src={GoogleLogo}
                      alt="Google logo"
                      className="h-5 w-5 inline-block"
                      width={20}
                      height={20}
                    />
                    <span className="font-medium">Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('apple')}
                    className="flex items-center justify-center gap-2 w-full rounded-lg bg-black hover:bg-[#111111] text-white px-4 py-2.5"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                      alt="Apple logo"
                      className="h-5 w-5 inline-block"
                      width={20}
                      height={20}
                      referrerPolicy="no-referrer"
                      style={{ filter: 'invert(1)' }}
                    />
                    <span className="font-medium">Apple</span>
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-brand-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-brand-gray-500">Already have an account?</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link to="/auth/login" className="text-brand-blue hover:underline font-medium text-sm">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
