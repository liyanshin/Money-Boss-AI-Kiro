import React, { useState } from 'react';
import { Shield, ArrowRight, Mail, Key } from 'lucide-react';

interface SplashAuthProps {
  onLoginSuccess: () => void;
}

export const SplashAuth: React.FC<SplashAuthProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-full flex flex-col justify-center px-6 py-10 bg-[radial-gradient(ellipse_at_50%_10%,rgba(123,46,255,0.22)_0%,#000000_65%)]">
      <div className="max-w-md w-full mx-auto space-y-8">

        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#7B2EFF] to-[#4A0E99] shadow-[0_0_30px_rgba(123,46,255,0.5)] border border-purple-400/30 animate-pulse">
            <span className="text-4xl">👑</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl font-extrabold tracking-tight text-white">
            Money Boss <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="text-sm italic text-purple-200/70 font-medium">
            "Spend wisely. The Boss is watching."
          </p>
          {/* Kiro + AWS badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">Built with</span>
            <span className="text-xs font-extrabold text-orange-400">Kiro</span>
            <span className="text-neutral-600 text-xs">•</span>
            <span className="text-xs font-extrabold text-orange-300">Amazon Bedrock</span>
          </div>
        </div>

        {/* Login Form Box */}
        <div className="bg-white/5 border border-purple-500/25 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Welcome Back</h2>
              <p className="text-xs text-neutral-400">Sign in to sync your budget & mentor progress</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
              Demo Active
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Mail size={12} className="text-purple-400" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Key size={12} className="text-purple-400" /> Password
                </label>
                <a href="#forgot" className="text-xs text-purple-400 hover:text-purple-300 transition">
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#7B2EFF] to-[#5A1FCC] hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-sm shadow-[0_4px_20px_rgba(123,46,255,0.4)] transition active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Sign In to Wallet <ArrowRight size={16} />
            </button>
          </form>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-white/10" />
            <span className="flex-shrink mx-3 text-xs text-neutral-500 uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-white/10" />
          </div>

          {/* Amazon / AWS Sign-In button (replaces Google) */}
          <button
            onClick={onLoginSuccess}
            className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-white text-sm font-semibold flex items-center justify-center gap-2.5 transition"
          >
            {/* Amazon smile logo */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                fill="#FF9900"
                opacity="0.15"
              />
              <path
                d="M6.5 14.5c2.5 2 5.5 2.5 8.5 1"
                stroke="#FF9900"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M14.5 14c.5.3 1 .8 1.3 1.5"
                stroke="#FF9900"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <text x="5" y="13" fontSize="8" fontWeight="bold" fill="#FF9900" fontFamily="Arial">aws</text>
            </svg>
            Continue with Amazon AWS
          </button>
        </div>

        <p className="text-center text-xs text-neutral-400">
          Don't have an account?{' '}
          <button onClick={onLoginSuccess} className="text-purple-400 font-semibold hover:underline">
            Quick Start Onboarding
          </button>
        </p>

        {/* Kiro footer badge */}
        <p className="text-center text-[10px] text-neutral-600">
          AI powered by <span className="text-orange-400 font-bold">Amazon Bedrock</span> · Built in <span className="text-purple-400 font-bold">Kiro IDE</span>
        </p>
      </div>
    </div>
  );
};
