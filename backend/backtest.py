import pandas as pd
import numpy as np
from typing import Dict, Any

def backtest_strategy(price1: pd.Series, price2: pd.Series, signals: pd.DataFrame, beta: float, initial_capital: float = 10000, transaction_cost: float = 0.001) -> Dict[str, Any]:
    positions = signals['Signal'].shift(1).fillna(0)
    spread = price1 - beta * price2
    returns = spread.diff().fillna(0)
    pnl = positions * returns - abs(positions.diff().fillna(0)) * transaction_cost * spread
    equity_curve = initial_capital + pnl.cumsum()

    total_return = (equity_curve.iloc[-1] - initial_capital) / initial_capital
    daily_returns = equity_curve.pct_change().fillna(0)
    sharpe = np.mean(daily_returns) / np.std(daily_returns) * np.sqrt(252) if np.std(daily_returns) > 0 else 0
    max_drawdown = ((equity_curve.cummax() - equity_curve) / equity_curve.cummax()).max()
    win_rate = (pnl > 0).sum() / len(pnl)

    return {
        'equity_curve': equity_curve,
        'total_return': total_return,
        'sharpe_ratio': sharpe,
        'max_drawdown': max_drawdown,
        'win_rate': win_rate,
        'pnl': pnl
    }

if __name__ == "__main__":
    import yfinance as yf
    from hedge_ratio import estimate_hedge_ratio
    from trading_rules import generate_trade_signals
    ticker1 = "AAPL"
    ticker2 = "MSFT"
    data = yf.download([ticker1, ticker2], start="2020-01-01", end="2023-01-01")['Close']
    data = data.dropna()
    beta = estimate_hedge_ratio(data[ticker1], data[ticker2])
    spread = data[ticker1] - beta * data[ticker2]
    z = (spread - spread.rolling(20).mean()) / spread.rolling(20).std()
    signals = generate_trade_signals(z)
    results = backtest_strategy(data[ticker1], data[ticker2], signals, beta)
    print(f"Total Return: {results['total_return']:.2%}")
    print(f"Sharpe Ratio: {results['sharpe_ratio']:.2f}")
    print(f"Max Drawdown: {results['max_drawdown']:.2%}")
    print(f"Win Rate: {results['win_rate']:.2%}")
