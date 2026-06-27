/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageView } from '../types';
import { Sparkles, ArrowRight, Mail, Lock, Loader2 } from 'lucide-react';

interface SignInViewProps {
  onNavigate: (view: PageView) => void;
  onSetUserEmail: (email: string) => void;
  density?: 'compact' | 'comfortable';
  onSetDensity?: (density: 'compact' | 'comfortable') => void;
}

export default function SignInView({ onNavigate, onSetUserEmail, density = 'comfortable', onSetDensity }: SignInViewProps) {
  const isCompact = density === 'compact';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    // Simulate 1.2s delay then direct to workspace
    setTimeout(() => {
      onSetUserEmail(email);
      setIsLoading(false);
      onNavigate('dashboard');
    }, 1200);
  };

  return (
    <div id="signin-view" className={`min-h-screen bg-white flex flex-col justify-center transition-all duration-150 ${isCompact ? 'py-6 sm:px-6 lg:px-8' : 'py-12 sm:px-6 lg:px-8'}`}>
      
      {/* Brand Header */}
      <div className={`sm:mx-auto sm:w-full sm:max-w-md text-center ${isCompact ? 'space-y-2' : 'space-y-4'}`}>
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 mx-auto cursor-pointer focus:outline-none"
        >
          <div className="bg-[#4F46E5] text-white p-1 rounded-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-sans text-lg font-bold tracking-tight text-black">
            Script<span className="text-[#4F46E5]">IQ</span>
          </span>
        </button>
        
        <div>
          <h1 className={`font-sans font-bold text-black tracking-tight ${isCompact ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl font-extrabold'}`}>
            Sign in to your account
          </h1>
          <p className="font-sans text-xs text-gray-500 mt-1">
            Free workspace access. No credit card required.
          </p>
        </div>
      </div>

      {/* Main card */}
      <div className={`sm:mx-auto sm:w-full sm:max-w-md ${isCompact ? 'mt-4' : 'mt-8'}`}>
        <div className={`bg-white border border-gray-200 transition-all ${
          isCompact ? 'py-5 px-4 rounded-md shadow-2xs sm:px-6' : 'py-8 px-4 border-gray-200/80 rounded-2xl shadow-lg sm:px-10'
        }`}>
          
          <form className={isCompact ? 'space-y-4' : 'space-y-6'} onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="p-2.5 bg-red-50 text-red-600 rounded-md text-[11px] font-medium">
                {errorMsg}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="signin-email" className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Email address
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 flex items-center pointer-events-none ${isCompact ? 'pl-3' : 'pl-3.5'}`}>
                  <Mail className={`${isCompact ? 'h-3.5 w-3.5' : 'h-4.5 w-4.5'} text-gray-400`} />
                </div>
                <input
                  id="signin-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full font-sans bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:bg-white focus:border-transparent transition-all ${
                    isCompact ? 'text-xs pl-8.5 pr-3 py-1.5 rounded-md' : 'text-sm pl-11 pr-4 py-3 rounded-xl focus:ring-2'
                  }`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="signin-password" className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 flex items-center pointer-events-none ${isCompact ? 'pl-3' : 'pl-3.5'}`}>
                  <Lock className={`${isCompact ? 'h-3.5 w-3.5' : 'h-4.5 w-4.5'} text-gray-400`} />
                </div>
                <input
                  id="signin-password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full font-sans bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:bg-white focus:border-transparent transition-all ${
                    isCompact ? 'text-xs pl-8.5 pr-3 py-1.5 rounded-md' : 'text-sm pl-11 pr-4 py-3 rounded-xl focus:ring-2'
                  }`}
                />
              </div>
              <div className="flex items-center justify-end mt-1.5">
                <span className="text-[10px] text-[#4F46E5] hover:underline cursor-pointer">
                  Forgot your password?
                </span>
              </div>
            </div>

            {/* Sign In CTA button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full font-sans font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors shadow-2xs text-white bg-[#4F46E5] hover:bg-[#4338CA] ${
                  isCompact ? 'px-4 py-2 text-xs rounded-md' : 'px-6 py-3 text-sm rounded-xl'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className={`${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} animate-spin text-white`} />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className={`${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-white`} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social provider mock dividers */}
          <div className={isCompact ? 'mt-4' : 'mt-6'}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-2.5 text-gray-400 font-medium">Or continue with</span>
              </div>
            </div>

            <div className={isCompact ? 'mt-4' : 'mt-6'}>
              <button
                type="button"
                onClick={() => {
                  setEmail('google.creator@gmail.com');
                  setIsLoading(true);
                  setTimeout(() => {
                    onSetUserEmail('google.creator@gmail.com');
                    setIsLoading(false);
                    onNavigate('dashboard');
                  }, 1000);
                }}
                className={`w-full font-sans border border-gray-200 text-gray-700 hover:text-black hover:bg-gray-50 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isCompact ? 'px-3 py-1.5 text-xs rounded-md' : 'px-4 py-2.5 rounded-xl font-semibold'
                }`}
              >
                <svg className={`${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} mr-1`} viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.9h6.6c-.28 1.5-1.11 2.76-2.39 3.62v3h3.86c2.26-2.09 3.58-5.16 3.58-8.45z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.86-3c-1.08.72-2.45 1.16-4.1 1.16-3.15 0-5.81-2.13-6.76-5.01H1.36v3.1C3.33 21.29 7.39 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.24 14.25c-.25-.72-.39-1.5-.39-2.3s.14-1.58.39-2.3V6.55H1.36C.49 8.24 0 10.07 0 12s.49 3.76 1.36 5.45l3.88-3.2z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.33 2.71 1.36 6.55l3.88 3.2c.95-2.88 3.61-5 6.76-5z"
                  />
                </svg>
                Google Creator Login
              </button>
            </div>
          </div>

          <div className={`text-center text-[11px] text-gray-400 ${isCompact ? 'mt-4' : 'mt-6'}`}>
            By signing in, you agree to our{' '}
            <button onClick={() => onNavigate('terms')} className="text-[#4F46E5] hover:underline cursor-pointer">
              Terms of Service
            </button>{' '}
            and{' '}
            <button onClick={() => onNavigate('privacy')} className="text-[#4F46E5] hover:underline cursor-pointer">
              Privacy Policy
            </button>
            .
          </div>

          {onSetDensity && (
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-3">
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Layout Density:</span>
              <div className="inline-flex rounded-md bg-gray-100 p-0.5">
                <button
                  type="button"
                  onClick={() => onSetDensity('comfortable')}
                  className={`text-[10px] font-medium px-2 py-1 rounded-sm transition-all cursor-pointer ${
                    !isCompact ? 'bg-white text-black shadow-xs' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  Comfortable
                </button>
                <button
                  type="button"
                  onClick={() => onSetDensity('compact')}
                  className={`text-[10px] font-medium px-2 py-1 rounded-sm transition-all cursor-pointer ${
                    isCompact ? 'bg-white text-black shadow-xs' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  High Density
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
