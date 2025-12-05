import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

const VerifyOTP: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const state = (location.state || {}) as { email?: string; phone?: string };
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Basic validation: single 6-digit code for both email and phone
    const isValid = /^\d{6}$/.test(otp);
    if (!isValid) {
      setError('Enter the 6-digit code sent to your email and phone.');
      return;
    }
    setIsLoading(true);
    try {
      // TODO: Replace with backend verification API
      // await api.verifyOtp({ email: state.email, phone: state.phone, otp })
      login();
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-brand-gray-100">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Visual / Intro panel */}
          <div className="hidden lg:block">
            <div className="relative h-full min-h-[420px] rounded-2xl overflow-hidden bg-brand-blue">
              <div className="absolute inset-0 bg-brand-blue/80" />
              <img
                src="https://picsum.photos/1000/800?security"
                alt="Verification"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 p-10 text-white space-y-6">
                <h2 className="text-4xl font-extrabold leading-tight">
                  Verify your account
                </h2>
                <p className="text-blue-50 max-w-md">
                  Enter the 6‑digit codes we sent to your email and phone to secure your account.
                </p>
              </div>
            </div>
          </div>

          {/* OTP form */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-gray-900">Enter verification code</h1>
                <p className="mt-2 text-brand-gray-600">We sent the same code to your email and phone.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-brand-gray-700">Verification code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    placeholder="6‑digit code"
                    autoComplete="one-time-code"
                    title="Enter 6 digits"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="block w-full rounded-lg border border-brand-gray-300 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 px-4 py-2.5 text-brand-gray-900 placeholder-brand-gray-400 outline-none tracking-widest"
                  />
                  <p className="text-xs text-brand-gray-500">Sent to {state.email || 'your email'} and {state.phone || 'your phone'}</p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Link to="/auth/register" className="text-sm text-brand-blue hover:underline">Change email/phone</Link>
                  <button type="button" className="text-sm text-brand-gray-600 hover:underline">Resend code</button>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Verifying…' : 'Verify and continue'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOTP;
