import pandas as pd
import numpy as np
from typing import Tuple

def calculate_position_size(
    capital: float,
    spread_volatility: float,
    risk_per_trade: float = 0.01
) -> float:
    dollar_risk = capital * risk_per_trade
    units = dollar_risk / spread_volatility
    return units

def set_stop_loss_take_profit(
    entry_z: float,
    stop_z: float = 3.0,
    tp_z: float = 0.0
) -> Tuple[float, float]:
    if entry_z > 0:  
        stop_loss = stop_z
        take_profit = tp_z
    else:  
        stop_loss = -stop_z
        take_profit = tp_z
    return stop_loss, take_profit

def assign_risk_level(spread_vol: float, q25: float, q75: float) -> str:
    if spread_vol < q25:
        return "Low"
    elif spread_vol < q75:
        return "Medium"
    else:
        return "High"
