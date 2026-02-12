import numpy as np
import pandas as pd
from typing import Tuple
from sklearn.linear_model import LinearRegression

def estimate_hedge_ratio(price1: pd.Series, price2: pd.Series) -> float:
    log_p1 = np.log(price1)
    log_p2 = np.log(price2)

    X = log_p2.values.reshape(-1, 1)
    y = log_p1.values

    model = LinearRegression().fit(X, y)
    beta = model.coef_[0]
    return beta