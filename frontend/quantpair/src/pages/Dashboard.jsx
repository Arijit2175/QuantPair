import React, { useState, useEffect } from "react";
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
      // eslint-disable-next-line no-console
      console.error("Strategy fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Modern dashboard design
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-slate-900 to-slate-800 text-white flex items-center justify-center">

      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-cyan-800/80 to-slate-900/80 backdrop-blur-lg border-r border-slate-700 p-8 hidden md:flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl font-extrabold mb-10 text-cyan-300 drop-shadow-lg">QuantPair</h2>
        <nav className="w-full">
          <ul className="space-y-6 text-lg">
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">📊 Overview</li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">⚙ Run Strategy</li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">📈 Results</li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">🛠 Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen items-center justify-center">

        {/* Header */}
        <header className="bg-gradient-to-r from-cyan-900/80 to-slate-900/80 backdrop-blur border-b border-slate-700 p-8 flex flex-col md:flex-row md:justify-between md:items-center shadow-lg gap-6 w-full max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight text-cyan-300 drop-shadow">QuantPair Dashboard</h1>
          <form className="flex flex-wrap gap-4 items-end" onSubmit={handleRunStrategy}>
            <div>
              <label className="block text-xs mb-1 text-cyan-200">Tickers (comma separated)</label>
              <input type="text" className="rounded px-2 py-1 text-slate-900" value={tickers} onChange={e => setTickers(e.target.value)} placeholder="e.g. MSFT,AAPL" required />
            </div>
            <div>
              <label className="block text-xs mb-1 text-cyan-200">Start Date</label>
              <input type="date" className="rounded px-2 py-1 text-slate-900" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs mb-1 text-cyan-200">End Date</label>
              <input type="date" className="rounded px-2 py-1 text-slate-900" value={endDate} onChange={e => setEndDate(e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs mb-1 text-cyan-200">Initial Capital</label>
              <input type="number" className="rounded px-2 py-1 text-slate-900" value={initialCapital} onChange={e => setInitialCapital(e.target.value)} min={1} required />
            </div>
            <Button text={loading ? "Running..." : "Run Strategy"} buttonType="submit" />
          </form>
        </header>

        {/* Content */}
        <main className="p-10 space-y-10 bg-gradient-to-br from-slate-900/60 to-cyan-900/40 flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-center">

          {/* Strategy Summary */}
          {summary.pair && (
            <div className="mb-8 bg-white/10 rounded-xl p-6 flex flex-wrap gap-8 items-center justify-center shadow-lg">
              <div>
                <span className="text-cyan-300 font-bold">Pair:</span> <span className="text-white font-mono">{summary.pair}</span>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">Hedge Ratio:</span> <span className="text-white font-mono">{typeof summary.hedge_ratio === 'number' ? summary.hedge_ratio.toFixed(4) : summary.hedge_ratio}</span>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">Risk Level:</span> <span className="text-white font-mono">{summary.risk_level}</span>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">Stop-loss Z:</span> <span className="text-white font-mono">{summary.stop_loss}</span>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">Take-profit Z:</span> <span className="text-white font-mono">{summary.take_profit}</span>
              </div>
            </div>
          )}

          {/* Strategy Recommendation */}
          {recommendation && (
            <div className="mb-8 bg-cyan-900/40 rounded-xl p-6 flex flex-wrap gap-8 items-center justify-center shadow-lg border border-cyan-700">
              <h3 className="text-xl font-bold text-cyan-200 w-full mb-2">Strategy Recommendation</h3>
              {Object.entries(recommendation).map(([ticker, rec]) => (
                <div key={ticker} className="flex flex-col items-center">
                  <span className="text-cyan-300 font-bold">{ticker}:</span>
                  <span className="text-white font-mono">{rec.action} {rec.action !== 'Hold' ? rec.quantity : ''}</span>
                </div>
              ))}
            </div>
          )}

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full items-center justify-center">
            <Card title="Total Return" value={performance.total_return !== undefined ? `${(performance.total_return * 100).toFixed(2)}%` : "-"} />
            <Card title="Sharpe Ratio" value={performance.sharpe_ratio !== undefined ? performance.sharpe_ratio.toFixed(2) : "-"} />
            <Card title="Max Drawdown" value={performance.max_drawdown !== undefined ? `${(performance.max_drawdown * 100).toFixed(2)}%` : "-"} />
            <Card title="Win Rate" value={performance.win_rate !== undefined ? `${(performance.win_rate * 100).toFixed(0)}%` : "-"} />
          </div>


          {/* Charts */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-6 text-cyan-200">Strategy Visualization</h2>
            {error && <div className="text-red-400 mb-4">{error}</div>}
            {priceSeries.length > 0 && summary.pair && (
              <PriceSeriesChart data={priceSeries} ticker1={summary.pair.split("/")[0]} ticker2={summary.pair.split("/")[1]} />
            )}
            {spreadWithMean.length > 0 && <SpreadWithMeanChart data={spreadWithMean} />}
            {zscoreSignals.length > 0 && <ZScoreSignalsChart data={zscoreSignals} />}
            <EquityCurveChart data={equityCurve} />
            <PnLChart data={pnl} />
          </div>

        </main>
      </div>
    </div>
  );
}
