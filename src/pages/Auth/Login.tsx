import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Basic demo validation; replace with real auth when available
    if (!email || !password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }

    try {
      // Wire into existing AuthContext
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
            <div className="relative h-full min-h-[480px] rounded-2xl overflow-hidden bg-brand-blue">
              <div className="absolute inset-0 bg-brand-blue/80" />
              <img
                src="https://picsum.photos/1000/800"
                alt="Healthcare hero"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 p-10 text-white space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold tracking-tight">Easy Healthcare</span>
                </div>
                <h2 className="text-4xl font-extrabold leading-tight">
                  Your health journey,
                  <br />
                  <span className="text-blue-100">simplified.</span>
                </h2>
                <p className="text-blue-50 max-w-md">
                  Access records, schedule appointments, and communicate with your care team in one secure place.
                </p>
              </div>
            </div>
          </div>

          {/* Login form */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-gray-900">Welcome back</h1>
                <p className="mt-2 text-brand-gray-600">Please enter your details to sign in.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

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
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border border-brand-gray-300 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/20 px-4 py-2.5 text-brand-gray-900 placeholder-brand-gray-400 outline-none"
                  />
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center text-sm text-brand-gray-600">
                      <input type="checkbox" className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-brand-gray-300 rounded mr-2" />
                      Remember me
                    </label>
                    <Link to="#" className="text-sm font-medium text-brand-blue hover:underline">Forgot password?</Link>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in…' : 'Sign in'}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-brand-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-brand-gray-500">New to Easy Healthcare?</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link to="/auth/register" className="text-brand-blue hover:underline font-medium text-sm">
                    Create an account
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

export default Login;
