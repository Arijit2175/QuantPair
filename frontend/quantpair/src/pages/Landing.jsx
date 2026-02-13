import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-cyan-700 to-slate-900 text-white">
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <div className="max-w-2xl w-full px-8 py-12 bg-white/10 rounded-3xl shadow-2xl flex flex-col items-center mx-auto">
          <h1 className="text-5xl font-extrabold mb-6 text-cyan-300 drop-shadow-lg text-center">QuantPair</h1>
          <p className="text-lg text-slate-200 mb-8 text-center">
            Advanced Pairs Trading Platform. Analyze, backtest, and visualize your quantitative trading strategies with ease.
          </p>
          <Link to="/dashboard">
            <button className="px-8 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-bold text-lg shadow-lg transition-all duration-200">
              Launch Dashboard
            </button>
          </Link>
        </div>
      </div>
      <footer className="w-full flex justify-center items-center mt-12 text-slate-400 text-sm">&copy; {new Date().getFullYear()} QuantPair. All rights reserved.</footer>
    </div>
  );
}
