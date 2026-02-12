import pandas as pd
from backend.data_acquisition import get_aligned_data
from backend.pair_selection import select_pairs
from backend.hedge_ratio import estimate_hedge_ratio
from backend.spread_signal import compute_spread, compute_rolling_stats, compute_zscore
from backend.trading_rules import generate_trade_signals
from backend.risk_management import calculate_position_size, set_stop_loss_take_profit, assign_risk_level
from backend.backtest import backtest_strategy

TICKERS = ["AAPL", "MSFT", "GOOG", "AMZN"]  
START_DATE = "2020-01-01"
END_DATE = "2023-01-01"
INITIAL_CAPITAL = 10000

import yfinance as yf
data = yf.download(TICKERS, start=START_DATE, end=END_DATE)["Close"].dropna()

pairs = select_pairs(data)
print(f"Valid pairs: {pairs}")

if not pairs:
    print("No valid pairs found. Exiting.")
    exit()

ticker1, ticker2 = pairs[0]
pair_data = data[[ticker1, ticker2]]

beta = estimate_hedge_ratio(pair_data[ticker1], pair_data[ticker2])
print(f"Hedge ratio (beta) for {ticker1}/{ticker2}: {beta:.4f}")

spread = compute_spread(pair_data[ticker1], pair_data[ticker2], beta)
mean, std = compute_rolling_stats(spread)
zscore = compute_zscore(spread, mean, std)

signals = generate_trade_signals(zscore)

volatility = std.iloc[-1]
price1 = pair_data[ticker1].iloc[-1]
price2 = pair_data[ticker2].iloc[-1]
qty1, qty2 = calculate_position_size(INITIAL_CAPITAL, price1, price2, volatility)
stop, tp = set_stop_loss_take_profit(spread.iloc[-1], volatility)
risk = assign_risk_level(volatility)
print(f"Position size: {qty1} {ticker1}, {qty2} {ticker2}")
print(f"Stop-loss: {stop:.2f}, Take-profit: {tp:.2f}, Risk level: {risk}")

results = backtest_strategy(pair_data[ticker1], pair_data[ticker2], signals, beta, INITIAL_CAPITAL)
print(f"Total Return: {results['total_return']:.2%}")
print(f"Sharpe Ratio: {results['sharpe_ratio']:.2f}")
print(f"Max Drawdown: {results['max_drawdown']:.2%}")
print(f"Win Rate: {results['win_rate']:.2%}")

print("\n--- STRATEGY OUTPUT ---")
print(f"Pair: {ticker1}/{ticker2}")
print(f"Hedge Ratio: {beta:.4f}")
print(f"Position Size: {qty1} {ticker1}, {qty2} {ticker2}")
print(f"Risk Level: {risk}")
print(f"Performance:")
print(f"  Total Return: {results['total_return']:.2%}")
print(f"  Sharpe Ratio: {results['sharpe_ratio']:.2f}")
print(f"  Max Drawdown: {results['max_drawdown']:.2%}")
print(f"  Win Rate: {results['win_rate']:.2%}")
print("Equity curve and PnL are available in results['equity_curve'] and results['pnl'].")