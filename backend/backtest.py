import pandas as pd
import numpy as np
from typing import Dict, Any

def backtest_strategy(
    price1: pd.Series,
    price2: pd.Series,
    positions: pd.Series,  
    beta: float,
    initial_capital: float = 10000,
    transaction_cost: float = 0.001
) -> Dict[str, Any]:

    price1_ret = price1.diff().fillna(0)
    price2_ret = price2.diff().fillna(0)

    pos = positions.shift(1).fillna(0)

    pnl = pos * (price1_ret - beta * price2_ret)

    trade_cost = transaction_cost * (abs(pos.diff().fillna(0)) * (price1 + beta * price2))
    pnl = pnl - trade_cost

    equity_curve = initial_capital + pnl.cumsum()

    daily_returns = equity_curve.pct_change(fill_method=None).fillna(0)
    std_val = np.std(daily_returns)
    sharpe = np.mean(daily_returns) / std_val * np.sqrt(252) if std_val > 0 else 0
    max_drawdown = ((equity_curve.cummax() - equity_curve) / equity_curve.cummax()).max()
    total_return = (equity_curve.iloc[-1] - initial_capital) / initial_capital
    win_rate = (pnl > 0).sum() / len(pnl)

    return {
        "equity_curve": equity_curve,
        "total_return": total_return,
        "sharpe_ratio": sharpe,
        "max_drawdown": max_drawdown,
        "win_rate": win_rate,
        "pnl": pnl
    }