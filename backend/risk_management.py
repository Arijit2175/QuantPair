import pandas as pd
from typing import Tuple, Dict

def calculate_position_size(capital: float, price1: float, price2: float, volatility: float, risk_per_trade: float = 0.01) -> Tuple[int, int]:
    dollar_risk = capital * risk_per_trade
    qty1 = int(dollar_risk / (volatility * price1))
    qty2 = int(dollar_risk / (volatility * price2))
    return qty1, qty2

def set_stop_loss_take_profit(entry_spread: float, volatility: float, stop_mult: float = 2.0, tp_mult: float = 2.0) -> Tuple[float, float]:
    stop_loss = entry_spread - stop_mult * volatility
    take_profit = entry_spread + tp_mult * volatility
    return stop_loss, take_profit

def assign_risk_level(volatility: float) -> str:
    if volatility < 0.5:
        return 'Low'
    elif volatility < 1.0:
        return 'Medium'
    else:
        return 'High'

