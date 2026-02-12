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

