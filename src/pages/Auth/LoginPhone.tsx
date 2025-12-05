import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';

const LoginPhone: React.FC = () => {
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState<string>('+977');
  const [localPhone, setLocalPhone] = useState<string>('');
  const [countryQuery, setCountryQuery] = useState<string>('');
  const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const npDial = countries.find((c) => c.iso === 'NP')?.dial || '+977';
    setCountryCode(npDial);
  }, [countries]);

  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=cca2,idd,flag,name', { signal: controller.signal });
        if (!res.ok) return;
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
        if ((err as any)?.name === 'AbortError') return;
      }
    };
    run();
    return () => controller.abort();
  }, []);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const sanitizedLocal = localPhone.replace(/\D/g, '');
    const fullPhone = `${countryCode}${sanitizedLocal}`;
    if (!sanitizedLocal) {
      setError('Phone number is required.');
      return;
    }
    if (!/^\+\d{7,15}$/.test(fullPhone)) {
      setError('Enter a valid phone number.');
      return;
    }
    setIsLoading(true);
    try {
      // TODO: call backend to send OTP for login
      // await api.sendLoginOtp({ phone: fullPhone })
      navigate('/auth/verify-otp', { state: { phone: fullPhone } });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-brand-gray-100">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-extrabold text-brand-gray-900">Sign in with phone</h1>
              <p className="mt-2 text-brand-gray-600">Well send you a verification code.</p>
            </div>

            <form onSubmit={handleSendCode} className="space-y-5">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>
              )}

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-brand-gray-700">Phone number</label>
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

              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending…' : 'Send code'}
              </Button>
            </form>

            <div className="mt-6 text-sm">
              <Link to="/auth/login" className="text-brand-blue hover:underline">Back to sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPhone;

