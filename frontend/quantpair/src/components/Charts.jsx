import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export function EquityCurveChart({ data }) {
  return (
    <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all animate-fade-in-up">
      <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-6 font-semibold">Equity Curve</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.1)" />
          <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(0,212,255,0.3)', borderRadius: '8px' }} />
          <Line type="monotone" dataKey="value" stroke="#00d4ff" strokeWidth={2.5} dot={false} isAnimationActive={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PnLChart({ data }) {
  return (
    <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all animate-fade-in-up">
      <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-6 font-semibold">Profit & Loss</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.1)" />
          <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(0,212,255,0.3)', borderRadius: '8px' }} />
          <Bar dataKey="value" fill="#00d4ff" radius={[4, 4, 0, 0]} isAnimationActive={true} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
