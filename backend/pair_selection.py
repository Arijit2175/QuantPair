import pandas as pd
import numpy as np
from statsmodels.tsa.stattools import coint
from typing import List, Tuple

def compute_correlation_matrix(price_data: pd.DataFrame) -> pd.DataFrame:
    return price_data.corr()

def find_highly_correlated_pairs(price_data: pd.DataFrame, threshold: float = 0.8) -> List[Tuple[str, str]]:
    corr_matrix = compute_correlation_matrix(price_data)
    pairs = []
    tickers = price_data.columns
    for i in range(len(tickers)):
        for j in range(i+1, len(tickers)):
            if corr_matrix.iloc[i, j] >= threshold:
                pairs.append((tickers[i], tickers[j]))
    return pairs

def cointegration_test(price1: pd.Series, price2: pd.Series, significance: float = 0.05) -> bool:
    score, pvalue, _ = coint(price1, price2)
    return pvalue < significance

def select_pairs(price_data: pd.DataFrame, corr_threshold: float = 0.8, coint_significance: float = 0.05) -> List[Tuple[str, str]]:
    correlated_pairs = find_highly_correlated_pairs(price_data, corr_threshold)
    valid_pairs = []
    for t1, t2 in correlated_pairs:
        if cointegration_test(price_data[t1], price_data[t2], coint_significance):
            valid_pairs.append((t1, t2))
    return valid_pairs

if __name__ == "__main__":
    import yfinance as yf
    tickers = ["AAPL", "MSFT", "GOOG", "AMZN"]
    data = yf.download(tickers, start="2020-01-01", end="2023-01-01")['Close']
    data = data.dropna()
    pairs = select_pairs(data)
    print("Valid pairs:", pairs)