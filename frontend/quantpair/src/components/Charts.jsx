import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export function EquityCurveChart({ data }) {
  return (
    <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all animate-fade-in-up">
      <h2 className="text-sm font-mono text-[#1e3a8a] uppercase tracking-widest mb-6 font-semibold">Equity Curve</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.1)" />
          <XAxis dataKey="date" tick={{ fill: '#1e40af', fontSize: 13, fontWeight: 700 }} />
          <YAxis tick={{ fill: '#1e40af', fontSize: 13, fontWeight: 700 }} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #1e40af', borderRadius: '8px', fontWeight: 700, color: '#1e40af' }} itemStyle={{ fontWeight: 700, color: '#1e40af' }} />
          <Line type="monotone" dataKey="value" stroke="#1e3a8a" strokeWidth={2.5} dot={false} isAnimationActive={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PnLChart({ data }) {
  return (
    <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all animate-fade-in-up">
      <h2 className="text-sm font-mono text-[#1e3a8a] uppercase tracking-widest mb-6 font-semibold">Profit & Loss</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.1)" />
          <XAxis dataKey="date" tick={{ fill: '#1e40af', fontSize: 13, fontWeight: 700 }} />
          <YAxis tick={{ fill: '#1e40af', fontSize: 13, fontWeight: 700 }} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #1e40af', borderRadius: '8px', fontWeight: 700, color: '#1e40af' }} itemStyle={{ fontWeight: 700, color: '#1e40af' }} />
          <Bar dataKey="value" fill="#1e3a8a" radius={[4, 4, 0, 0]} isAnimationActive={true} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
