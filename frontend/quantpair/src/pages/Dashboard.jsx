import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/80 backdrop-blur-lg border-r border-slate-700 p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 text-cyan-400">QuantPair</h2>
        <nav>
          <ul className="space-y-4">
            <li className="hover:text-cyan-400 cursor-pointer">📊 Overview</li>
            <li className="hover:text-cyan-400 cursor-pointer">⚙ Run Strategy</li>
            <li className="hover:text-cyan-400 cursor-pointer">📈 Results</li>
            <li className="hover:text-cyan-400 cursor-pointer">🛠 Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="bg-slate-900/60 backdrop-blur border-b border-slate-700 p-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pairs Trading Dashboard</h1>
          <span className="text-sm text-slate-300">Live Quant Analysis</span>
        </header>

        {/* Content */}
        <main className="p-8 space-y-8">

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Total Return" value="+12.4%" />
            <StatCard title="Sharpe Ratio" value="1.32" />
            <StatCard title="Max Drawdown" value="8.5%" />
            <StatCard title="Win Rate" value="53%" />
          </div>

          {/* Main Panel */}
          <div className="bg-slate-900/60 backdrop-blur-lg rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Strategy Visualization</h2>
            <p className="text-slate-400 mb-4">
              Run a pairs trading strategy and visualize spread, z-score, and performance.
            </p>

            <div className="border border-dashed border-slate-600 rounded-xl h-72 flex items-center justify-center text-slate-400">
              Chart goes here (Equity curve / Z-score / Trades)
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

/* KPI Card Component */
function StatCard({ title, value }) {
  return (
    <div className="bg-slate-900/70 backdrop-blur rounded-xl p-5 shadow hover:shadow-cyan-500/20 transition">
      <h3 className="text-slate-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-cyan-400 mt-2">{value}</p>
    </div>
  );
}