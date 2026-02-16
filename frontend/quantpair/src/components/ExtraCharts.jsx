import React, { memo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, BarChart, Bar, Scatter, Cell } from "recharts";

const PriceSeriesChart = ({ data, ticker1, ticker2 }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all animate-fade-in-up">
      <h2 className="text-sm font-mono text-[#1e3a8a] uppercase tracking-widest mb-6 font-semibold">Price Series</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.1)" />
          <XAxis dataKey="date" tick={{ fill: '#1e40af', fontSize: 13, fontWeight: 700 }} />
          <YAxis tick={{ fill: '#1e40af', fontSize: 13, fontWeight: 700 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #1e40af', borderRadius: '8px', fontWeight: 700 }}
            formatter={(value, name) => {
              if (name === ticker1) return [value, name, { color: '#1e3a8a', fontWeight: 700 }];
              if (name === ticker2) return [value, name, { color: '#f59e42', fontWeight: 700 }];
              return [value, name];
            }}
          />
          <Legend />
          <Line type="monotone" dataKey={ticker1} stroke="#1e3a8a" strokeWidth={2.5} dot={false} name={ticker1} />
          <Line type="monotone" dataKey={ticker2} stroke="#f59e42" strokeWidth={2.5} dot={false} name={ticker2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export const MemoizedPriceSeriesChart = memo(PriceSeriesChart);

const SpreadWithMeanChart = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all animate-fade-in-up">
      <h2 className="text-sm font-mono text-[#1e3a8a] uppercase tracking-widest mb-6 font-semibold">Spread with Mean</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.1)" />
          <XAxis dataKey="date" tick={{ fill: '#1e40af', fontSize: 13, fontWeight: 700 }} />
          <YAxis tick={{ fill: '#1e40af', fontSize: 13, fontWeight: 700 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #1e40af', borderRadius: '8px', fontWeight: 700 }}
            formatter={(value, name) => {
              if (name === 'Spread') return [value, name, { color: '#1e3a8a', fontWeight: 700 }];
              if (name === 'Mean') return [value, name, { color: '#ef4444', fontWeight: 700 }];
              return [value, name];
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="spread" stroke="#1e3a8a" strokeWidth={2.5} dot={false} name="Spread" />
          <Line type="monotone" dataKey="mean" stroke="#ef4444" strokeWidth={2.5} dot={false} name="Mean" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export const MemoizedSpreadWithMeanChart = memo(SpreadWithMeanChart);

const ZScoreSignalsChart = ({ data }) => {
  // Prepare bar color for each signal
  const barData = data.map(d => ({
    ...d,
    barColor:
      d.signal === 1 ? '#22c55e' : // Buy - green
      d.signal === -1 ? '#ef4444' : // Sell - red
      '#64748b' // Neutral - gray
  }));
  return (
    <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all animate-fade-in-up">
      <h2 className="text-sm font-mono text-[#1e3a8a] uppercase tracking-widest mb-6 font-semibold">Z-score & Trade Signals</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,255,0.1)" />
          <XAxis dataKey="date" tick={{ fill: '#1e40af', fontSize: 13, fontWeight: 700 }} />
          <YAxis tick={{ fill: '#1e40af', fontSize: 13, fontWeight: 700 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #1e40af', borderRadius: '8px', fontWeight: 700 }}
            formatter={(value, name) => {
              if (name === 'Z-score') return [value, name, { color: '#1e3a8a', fontWeight: 700 }];
              return [value, name];
            }}
          />
          <Legend />
          <ReferenceLine y={2} stroke="#ef4444" strokeDasharray="3 3" label={"+2"} />
          <ReferenceLine y={-2} stroke="#22c55e" strokeDasharray="3 3" label={"-2"} />
          <Bar dataKey="zscore" name="Z-score" isAnimationActive={false}>
            {barData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.barColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export const MemoizedZScoreSignalsChart = memo(ZScoreSignalsChart);
