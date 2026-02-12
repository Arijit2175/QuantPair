import pandas as pd
import numpy as np
from typing import Tuple

def compute_spread(price1: pd.Series, price2: pd.Series, beta: float) -> pd.Series:
    return price1 - beta * price2

def compute_rolling_stats(spread: pd.Series, window: int = 20) -> Tuple[pd.Series, pd.Series]:
    rolling_mean = spread.rolling(window=window).mean()
    rolling_std = spread.rolling(window=window).std()
    return rolling_mean, rolling_std

def compute_zscore(spread: pd.Series, rolling_mean: pd.Series, rolling_std: pd.Series) -> pd.Series:
    return (spread - rolling_mean) / rolling_std
