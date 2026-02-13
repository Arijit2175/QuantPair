from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
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
    risk = assign_risk_level(volatility)
    results = backtest_strategy(pair_data[ticker1], pair_data[ticker2], signals_df, beta, req.initial_capital)
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
        "performance": {
            "total_return": results['total_return'],
            "sharpe_ratio": results['sharpe_ratio'],
            "max_drawdown": results['max_drawdown'],
            "win_rate": results['win_rate']
        },
        "equity_curve": equity_curve,
        "pnl": pnl
    }

@app.get("/")
def root():
    return {"message": "QuantPair API is running."}