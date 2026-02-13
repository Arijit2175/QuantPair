from fastapi import FastAPI
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pandas as pd
import yfinance as yf
from pair_selection import select_pairs
from hedge_ratio import estimate_hedge_ratio
from spread_signal import compute_spread, compute_rolling_stats, compute_zscore
from trading_rules import generate_trade_signals
from risk_management import calculate_position_size, set_stop_loss_take_profit, assign_risk_level
from backtest import backtest_strategy

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StrategyRequest(BaseModel):
    tickers: List[str]
    start_date: str
    end_date: str
    initial_capital: float = 10000

@app.post("/run_strategy")
def run_strategy(req: StrategyRequest):
    data = yf.download(req.tickers, start=req.start_date, end=req.end_date)["Close"].dropna()
    pairs = select_pairs(data)
    if not pairs:
        return {"valid_pairs": [], "error": "No valid pairs found."}
    ticker1, ticker2 = pairs[0]
    pair_data = data[[ticker1, ticker2]]
    beta = estimate_hedge_ratio(pair_data[ticker1], pair_data[ticker2])
    spread = compute_spread(pair_data[ticker1], pair_data[ticker2], beta)
    mean, std = compute_rolling_stats(spread)
    zscore = compute_zscore(spread, mean, std)
    signals_df = generate_trade_signals(zscore)
    volatility = std.iloc[-1]
    price1 = pair_data[ticker1].iloc[-1]
    price2 = pair_data[ticker2].iloc[-1]
    qty = calculate_position_size(req.initial_capital, volatility)
    stop, tp = set_stop_loss_take_profit(spread.iloc[-1], volatility)
    q25 = std.quantile(0.25)
    q75 = std.quantile(0.75)
    risk = assign_risk_level(volatility, q25, q75)

    if isinstance(signals_df, pd.DataFrame):
        positions = signals_df["Position"]
    else:
        positions = signals_df

    price_series = [
        {"date": str(idx), ticker1: float(row[ticker1]), ticker2: float(row[ticker2])}
        for idx, row in pair_data.iterrows()
    ]

    spread_with_mean = [
        {"date": str(idx), "spread": float(spread.loc[idx]), "mean": float(mean.loc[idx]) if not pd.isna(mean.loc[idx]) else 0.0}
        for idx in spread.index
    ]

    zscore_signals = []
    zscore_vals = zscore if hasattr(zscore, 'index') else pd.Series(zscore)
    for idx in zscore_vals.index:
        val = float(zscore_vals.loc[idx])
        signal = int(positions.loc[idx]) if idx in positions.index else 0
        zscore_signals.append({
            "date": str(idx),
            "zscore": val,
            "signal": signal
        })

    latest_signal = positions.iloc[-1] if hasattr(positions, 'iloc') else positions[-1]
    action_map = {1: ("Buy", "Sell"), -1: ("Sell", "Buy"), 0: ("Hold", "Hold")}
    action1, action2 = action_map.get(int(latest_signal), ("Hold", "Hold"))
    qty1 = qty if action1 != "Hold" else 0
    qty2 = qty if action2 != "Hold" else 0

    def get_reason(ticker, action, z, vol, stop, tp):
        if action == "Buy":
            return f"Z-score ({z:.2f}) is below entry threshold, indicating {ticker} is undervalued relative to pair. Volatility: {vol:.4f}. Stop-loss: {stop}, Take-profit: {tp}."
        elif action == "Sell":
            return f"Z-score ({z:.2f}) is above entry threshold, indicating {ticker} is overvalued relative to pair. Volatility: {vol:.4f}. Stop-loss: {stop}, Take-profit: {tp}."
        else:
            return f"No strong signal. Z-score ({z:.2f}) near neutral. Volatility: {vol:.4f}."

    z_val = float(zscore_vals.iloc[-1]) if hasattr(zscore_vals, 'iloc') else float(zscore_vals[-1])
    reason1 = get_reason(ticker1, action1, z_val, volatility, stop, tp)
    reason2 = get_reason(ticker2, action2, z_val, volatility, stop, tp)

    results = backtest_strategy(pair_data[ticker1], pair_data[ticker2], positions, beta, req.initial_capital)

    results["equity_curve"] = results["equity_curve"].replace([np.inf, -np.inf], np.nan).fillna(0)
    results["pnl"] = results["pnl"].replace([np.inf, -np.inf], np.nan).fillna(0)

    def safe_float(val):
        try:
            if pd.isna(val) or np.isinf(val):
                return 0.0
            return float(val)
        except Exception:
            return 0.0

    performance = {
        "total_return": safe_float(results['total_return']),
        "sharpe_ratio": safe_float(results['sharpe_ratio']),
        "max_drawdown": safe_float(results['max_drawdown']),
        "win_rate": safe_float(results['win_rate'])
    }

    equity_curve = [
        {"date": str(idx), "value": float(val)}
        for idx, val in results["equity_curve"].items()
    ]
    pnl = [
        {"date": str(idx), "value": float(val)}
        for idx, val in results["pnl"].items()
    ]
    return {
        "valid_pairs": pairs,
        "selected_pair": [ticker1, ticker2],
        "hedge_ratio": beta,
        "position_size": {ticker1: qty, ticker2: qty},
        "stop_loss": stop,
        "take_profit": tp,
        "risk_level": risk,
        "performance": performance,
        "equity_curve": equity_curve,
        "pnl": pnl,
        "strategy_recommendation": {
            ticker1: {"action": action1, "quantity": round(qty1, 2), "reason": reason1},
            ticker2: {"action": action2, "quantity": round(qty2, 2), "reason": reason2}
        },
        "price_series": price_series,
        "spread_with_mean": spread_with_mean,
        "zscore_signals": zscore_signals
    }

@app.get("/")
def root():
    return {"message": "QuantPair API is running."}