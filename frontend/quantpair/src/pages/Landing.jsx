import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-950 via-blue-950/5 to-slate-900 text-white overflow-hidden">
      {/* Grid background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-cyan-400" />
        </svg>
      </div>

      {/* Floating accent elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-blue-500/10 blur-3xl rounded-full opacity-15 animate-pulse"></div>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center w-full">
        <div className="max-w-2xl w-full px-8 py-16 rounded-2xl flex flex-col items-center mx-auto animate-fade-in-up border border-cyan-500/20 bg-gradient-to-b from-slate-900/40 to-slate-950/60 backdrop-blur-sm shadow-2xl">
          {/* Logo/Brand */}
          <div className="mb-8 flex items-center gap-2 text-cyan-400">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-cyan-600"></div>
            <span className="text-sm font-mono font-semibold tracking-widest">QUANT TRADING</span>
          </div>

          <h1 className="text-6xl font-bold mb-6 text-white text-center tracking-tight">
            QuantPair
          </h1>
          <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-cyan-600 mb-8 rounded-full"></div>
          <p className="text-lg text-gray-300 mb-10 text-center leading-relaxed font-light">
            Advanced Pairs Trading Platform. Analyze, backtest, and visualize your quantitative trading strategies with precision.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-12 w-full text-center">
            <div className="border border-cyan-500/20 rounded-lg p-4 bg-slate-950/40 hover:bg-slate-950/60 transition-all">
              <div className="text-cyan-400 font-mono text-xl font-bold">99.8%</div>
              <div className="text-gray-400 text-xs mt-1 font-light">Uptime</div>
            </div>
            <div className="border border-cyan-500/20 rounded-lg p-4 bg-slate-950/40 hover:bg-slate-950/60 transition-all">
              <div className="text-cyan-400 font-mono text-xl font-bold">50ms</div>
              <div className="text-gray-400 text-xs mt-1 font-light">Latency</div>
            </div>
            <div className="border border-cyan-500/20 rounded-lg p-4 bg-slate-950/40 hover:bg-slate-950/60 transition-all">
              <div className="text-cyan-400 font-mono text-xl font-bold">7K+</div>
              <div className="text-gray-400 text-xs mt-1 font-light">Assets</div>
            </div>
          </div>

          <Link to="/dashboard" className="w-full">
            <button className="w-full px-8 py-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-lg shadow-xl transition-all duration-200 hover:shadow-2xl hover:shadow-cyan-500/30 active:scale-95">
              Launch Dashboard →
            </button>
          </Link>

          <p className="text-xs text-gray-500 mt-6 font-light">API-first • Low-latency • Enterprise-grade</p>
        </div>
      </div>

      <footer className="relative z-10 w-full flex justify-center items-center mt-12 text-gray-500 text-xs font-light pb-8">&copy; {new Date().getFullYear()} QuantPair. All rights reserved.</footer>
    </div>
  );
}
