import pandas as pd
from pair_selection import select_pairs
from hedge_ratio import estimate_hedge_ratio
from spread_signal import compute_spread, compute_rolling_stats, compute_zscore
from trading_rules import generate_trade_signals
from risk_management import calculate_position_size, set_stop_loss_take_profit, assign_risk_level
from backtest import backtest_strategy
import yfinance as yf
import numpy as np

def main():
    print("--- Pairs Trading Strategy Runner ---")

    tickers = input("Enter stock tickers (comma separated, e.g. AAPL,MSFT,GOOG,AMZN): ").replace(' ', '').split(',')
    start_date = input("Enter start date (YYYY-MM-DD): ")
    end_date = input("Enter end date (YYYY-MM-DD): ")

    try:
        initial_capital = float(input("Enter initial capital (e.g. 10000): "))
    except ValueError:
        print("Invalid capital amount. Using default 10000.")
        initial_capital = 10000

    data = yf.download(tickers, start=start_date, end=end_date)["Close"].dropna()

    pairs = select_pairs(data)
    print(f"Valid pairs: {pairs}")

    if not pairs:
        print("No valid pairs found. Exiting.")
        return

    ticker1, ticker2 = pairs[0]
    pair_data = data[[ticker1, ticker2]]

    beta = estimate_hedge_ratio(pair_data[ticker1], pair_data[ticker2])
    print(f"Hedge ratio (beta) for {ticker1}/{ticker2}: {beta:.4f}")

    spread = compute_spread(pair_data[ticker1], pair_data[ticker2], beta)
    mean, std = compute_rolling_stats(spread)
    zscore = compute_zscore(spread, mean, std)

    signals_df = generate_trade_signals(zscore)
    positions = signals_df["Position"]

    spread_volatility = std.iloc[-1]
    entry_z = zscore.iloc[-1]

    units = calculate_position_size(initial_capital, spread_volatility)
    stop, tp = set_stop_loss_take_profit(entry_z)

    q25 = std.quantile(0.25)
    q75 = std.quantile(0.75)
    risk = assign_risk_level(spread_volatility, q25, q75)

    print(f"Position size (spread units): {units:.2f}")
    print(f"Stop-loss Z: {stop:.2f}, Take-profit Z: {tp:.2f}, Risk level: {risk}")

    results = backtest_strategy(
        pair_data[ticker1],
        pair_data[ticker2],
        positions,
        beta,
        initial_capital
    )

    print("\n--- STRATEGY OUTPUT ---")
    print(f"Pair: {ticker1}/{ticker2}")
    print(f"Hedge Ratio: {beta:.4f}")
    print(f"Risk Level: {risk}")
    print(f"Performance:")
    print(f"  Total Return: {results['total_return']:.2%}")
    print(f"  Sharpe Ratio: {results['sharpe_ratio']:.2f}")
    print(f"  Max Drawdown: {results['max_drawdown']:.2%}")
    print(f"  Win Rate: {results['win_rate']:.2%}")

    print("Equity curve and PnL are available in results['equity_curve'] and results['pnl'].")

if __name__ == "__main__":
    main()