import numpy as np
import pandas as pd
from typing import Tuple
from sklearn.linear_model import LinearRegression

def estimate_hedge_ratio(price1: pd.Series, price2: pd.Series) -> float:
    X = price2.values.reshape(-1, 1)
    y = price1.values
    model = LinearRegression().fit(X, y)
    beta = model.coef_[0]
    return beta

