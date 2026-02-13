import React, { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { EquityCurveChart, PnLChart } from "../components/Charts";
import { PriceSeriesChart, SpreadWithMeanChart, ZScoreSignalsChart } from "../components/ExtraCharts";
import { fetchStrategyResults } from "../api/strategy";

export default function Dashboard() {
  const [equityCurve, setEquityCurve] = useState([]);
  const [pnl, setPnl] = useState([]);
  const [performance, setPerformance] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tickers, setTickers] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [initialCapital, setInitialCapital] = useState(10000);
  const [summary, setSummary] = useState({});
  const [recommendation, setRecommendation] = useState(null);
  const [priceSeries, setPriceSeries] = useState([]);
  const [spreadWithMean, setSpreadWithMean] = useState([]);
  const [zscoreSignals, setZscoreSignals] = useState([]);

  const handleRunStrategy = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStrategyResults({
        tickers: tickers.split(",").map(t => t.trim()).filter(Boolean),
        start_date: startDate,
        end_date: endDate,
        initial_capital: initialCapital
      });
      if (!data || typeof data !== "object") {
        setError("No data returned from backend");
        setEquityCurve([]);
        setPnl([]);
        setPerformance({});
        setSummary({});
        return;
      }
      setEquityCurve(data.equity_curve || []);
      setPnl(data.pnl || []);
      setPerformance(data.performance || {});
      setSummary({
        pair: data.selected_pair ? data.selected_pair.join("/") : "-",
        hedge_ratio: data.hedge_ratio !== undefined ? data.hedge_ratio : "-",
        risk_level: data.risk_level || "-",
        stop_loss: data.stop_loss !== undefined ? data.stop_loss : "-",
        take_profit: data.take_profit !== undefined ? data.take_profit : "-"
      });
      setRecommendation(data.strategy_recommendation || null);
      setPriceSeries(data.price_series || []);
      setSpreadWithMean(data.spread_with_mean || []);
      setZscoreSignals(data.zscore_signals || []);
      if (data.error) setError(data.error);
    } catch (err) {
      setError(err.message || "Failed to fetch strategy results");
      console.error("Strategy fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/5 to-slate-900 text-white flex items-center justify-center overflow-hidden">
      {/* Grid background pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-cyan-400" />
        </svg>
      </div>

      {/* Floating accents */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full opacity-20 pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-blue-500/5 blur-3xl rounded-full opacity-15 pointer-events-none animate-pulse"></div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 bg-gradient-to-b from-slate-950 to-slate-900/80 backdrop-blur-xl border-r border-cyan-500/10 p-8 hidden md:flex flex-col min-h-screen z-50 shadow-2xl">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-cyan-600"></div>
            <span className="text-xs font-mono font-bold tracking-widest">QUANT</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Pair</h2>
        </div>
        <nav className="w-full space-y-1 flex-1">
          {['Overview', 'Run Strategy', 'Results', 'Settings'].map((item, i) => (
            <div key={i} className="px-4 py-3 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-all group border border-transparent hover:border-cyan-500/20">
              <span className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">{item}</span>
            </div>
          ))}
        </nav>
        <div className="border-t border-cyan-500/10 pt-4 text-xs text-gray-500 text-center">
          <p>© {new Date().getFullYear()} QuantPair</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-gradient-to-r from-slate-900/40 to-slate-950/60 backdrop-blur-xl border-b border-cyan-500/10 p-6 md:p-8 sticky top-0 z-40 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 animate-slide-in-left">Strategy Runner</h1>
            <form className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end" onSubmit={handleRunStrategy}>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <label className="block text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Tickers</label>
                <input type="text" className="w-full bg-slate-800/60 border border-cyan-500/20 rounded-lg px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 transition-all" value={tickers} onChange={e => setTickers(e.target.value)} placeholder="MSFT,AAPL" required />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <label className="block text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Start Date</label>
                <input type="date" className="w-full bg-slate-800/60 border border-cyan-500/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500/40 transition-all" value={startDate} onChange={e => setStartDate(e.target.value)} required />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <label className="block text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">End Date</label>
                <input type="date" className="w-full bg-slate-800/60 border border-cyan-500/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500/40 transition-all" value={endDate} onChange={e => setEndDate(e.target.value)} required />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <label className="block text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Capital</label>
                <input type="number" className="w-full bg-slate-800/60 border border-cyan-500/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500/40 transition-all" value={initialCapital} onChange={e => setInitialCapital(e.target.value)} min={1} required />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <Button text={loading ? "Running..." : "Execute"} buttonType="submit" />
              </div>
            </form>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Strategy Summary */}
            {summary.pair && (
              <div className="animate-fade-in-up bg-gradient-to-r from-slate-800/30 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4 font-semibold">Strategy Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-gray-400 text-xs font-light mb-1">Pair</p>
                    <p className="text-white font-mono font-bold">{summary.pair}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-light mb-1">Hedge Ratio</p>
                    <p className="text-cyan-400 font-mono font-bold">{typeof summary.hedge_ratio === 'number' ? summary.hedge_ratio.toFixed(4) : summary.hedge_ratio}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-light mb-1">Risk Level</p>
                    <p className="text-white font-mono font-bold">{summary.risk_level}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-light mb-1">Stop-Loss Z</p>
                    <p className="text-white font-mono font-bold">{summary.stop_loss}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-light mb-1">Take-Profit Z</p>
                    <p className="text-white font-mono font-bold">{summary.take_profit}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Strategy Recommendation */}
            {recommendation && (
              <div className="animate-fade-in-up bg-gradient-to-r from-emerald-900/20 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/30 hover:border-emerald-500/50 transition-all">
                <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-4 font-semibold">Trade Recommendations</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(recommendation).map(([ticker, rec]) => (
                    <div key={ticker} className="bg-slate-950/40 rounded-lg p-4 border border-emerald-500/20">
                      <p className="text-gray-400 text-xs font-light mb-2">{ticker}</p>
                      <p className="text-emerald-400 font-mono text-sm font-bold">{rec.action}</p>
                      {rec.action !== 'Hold' && <p className="text-gray-400 text-xs mt-1 font-mono">{rec.quantity} units</p>}
                      {rec.reason && <p className="text-xs text-cyan-200 mt-2 font-mono">{rec.reason}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card title="Total Return" value={performance.total_return !== undefined ? `${(performance.total_return * 100).toFixed(2)}%` : "-"} />
              <Card title="Sharpe Ratio" value={performance.sharpe_ratio !== undefined ? performance.sharpe_ratio.toFixed(2) : "-"} />
              <Card title="Max Drawdown" value={performance.max_drawdown !== undefined ? `${(performance.max_drawdown * 100).toFixed(2)}%` : "-"} />
              <Card title="Win Rate" value={performance.win_rate !== undefined ? `${(performance.win_rate * 100).toFixed(0)}%` : "-"} />
            </div>

            {/* Charts Section */}
            <div className="bg-gradient-to-br from-slate-800/20 to-slate-900/40 backdrop-blur-sm rounded-2xl border border-cyan-500/10 p-8 animate-fade-in-up">
              <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-8 font-semibold">Performance Visualization</h2>
              {error && <div className="text-red-400 text-sm mb-6 p-4 bg-red-950/20 rounded-lg border border-red-500/20">{error}</div>}
              <div className="space-y-6">
                {priceSeries.length > 0 && summary.pair && (
                  <PriceSeriesChart data={priceSeries} ticker1={summary.pair.split("/")[0]} ticker2={summary.pair.split("/")[1]} />
                )}
                {spreadWithMean.length > 0 && <SpreadWithMeanChart data={spreadWithMean} />}
                {zscoreSignals.length > 0 && <ZScoreSignalsChart data={zscoreSignals} />}
                <EquityCurveChart data={equityCurve} />
                <PnLChart data={pnl} />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
