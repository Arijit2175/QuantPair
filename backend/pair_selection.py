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
    # For demo: use looser cointegration threshold
    correlated_pairs = find_highly_correlated_pairs(price_data, corr_threshold)
    valid_pairs = []
    demo_coint_significance = 0.1  # Looser threshold for demo
    for t1, t2 in correlated_pairs:
        if cointegration_test(price_data[t1], price_data[t2], demo_coint_significance):
            valid_pairs.append((t1, t2))
    return valid_pairs
