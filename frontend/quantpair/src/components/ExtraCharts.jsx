import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, BarChart, Bar, Scatter, Cell } from "recharts";

export function PriceSeriesChart({ data, ticker1, ticker2 }) {
  return (
    <div className="bg-white shadow rounded-xl p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Price Series</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: '#64748b' }} />
          <YAxis tick={{ fill: '#64748b' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={ticker1} stroke="#2563eb" strokeWidth={2} dot={false} name={ticker1} />
          <Line type="monotone" dataKey={ticker2} stroke="#f59e42" strokeWidth={2} dot={false} name={ticker2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SpreadWithMeanChart({ data }) {
  return (
    <div className="bg-white shadow rounded-xl p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Spread with Mean</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: '#64748b' }} />
          <YAxis tick={{ fill: '#64748b' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="spread" stroke="#2563eb" strokeWidth={2} dot={false} name="Spread" />
          <Line type="monotone" dataKey="mean" stroke="#ef4444" strokeWidth={2} dot={false} name="Mean" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ZScoreSignalsChart({ data }) {
  // Prepare bar color for each signal
  const barData = data.map(d => ({
    ...d,
    barColor:
      d.signal === 1 ? '#22c55e' : // Buy - green
      d.signal === -1 ? '#ef4444' : // Sell - red
      '#64748b' // Neutral - gray
  }));
  return (
    <div className="bg-white shadow rounded-xl p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Z-score & Trade Signals</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: '#64748b' }} />
          <YAxis tick={{ fill: '#64748b' }} />
          <Tooltip />
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
