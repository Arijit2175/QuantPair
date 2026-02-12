import pandas as pd
from typing import Tuple, Dict

def calculate_position_size(capital: float, price1: float, price2: float, volatility: float, risk_per_trade: float = 0.01) -> Tuple[int, int]:
    dollar_risk = capital * risk_per_trade
    qty1 = int(dollar_risk / (volatility * price1))
    qty2 = int(dollar_risk / (volatility * price2))
    return qty1, qty2

