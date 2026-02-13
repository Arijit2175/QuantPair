import React, { useState, useEffect } from "react";
import Card from "../components/Card";        
import Button from "../components/Button"; 
import { EquityCurveChart, PnLChart } from "../components/Charts";
import { fetchStrategyResults } from "../api/strategy";

export default function Dashboard() {
  const [equityCurve, setEquityCurve] = useState([]);
  const [pnl, setPnl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRunStrategy = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStrategyResults();
      setEquityCurve(data.equity_curve || []);
      setPnl(data.pnl || []);
    } catch (err) {
      setError("Failed to fetch strategy results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optionally fetch on mount
    // handleRunStrategy();
  }, []);

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

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="bg-slate-900/60 backdrop-blur border-b border-slate-700 p-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pairs Trading Dashboard</h1>
          <Button text={loading ? "Running..." : "Run Strategy"} onClick={handleRunStrategy} />
        </header>

        {/* Content */}
        <main className="p-8 space-y-8">

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card title="Total Return" value="+12.4%" />
            <Card title="Sharpe Ratio" value="1.32" />
            <Card title="Max Drawdown" value="8.5%" />
            <Card title="Win Rate" value="53%" />
          </div>


          {/* Charts */}
          <div className="bg-slate-900/60 backdrop-blur-lg rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Strategy Visualization</h2>
            {error && <div className="text-red-400 mb-4">{error}</div>}
            <EquityCurveChart data={equityCurve} />
            <PnLChart data={pnl} />
          </div>

        </main>
      </div>
    </div>
  );
}
