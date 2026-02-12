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

if __name__ == "__main__":
    import yfinance as yf
    ticker1 = "AAPL"
    ticker2 = "MSFT"
    data = yf.download([ticker1, ticker2], start="2020-01-01", end="2023-01-01")['Close']
    data = data.dropna()
    beta = estimate_hedge_ratio(data[ticker1], data[ticker2])
    print(f"Hedge ratio (beta) for {ticker1}/{ticker2}: {beta:.4f}")