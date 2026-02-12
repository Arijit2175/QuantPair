import pandas as pd
import numpy as np
from statsmodels.tsa.stattools import coint
from typing import List, Tuple

def compute_returns(price_data: pd.DataFrame) -> pd.DataFrame:
    return np.log(price_data).diff().dropna()

def find_highly_correlated_pairs(price_data: pd.DataFrame, threshold: float = 0.6) -> List[Tuple[str, str]]:
    returns = compute_returns(price_data)
    corr_matrix = returns.corr()
    
    pairs = []
    tickers = corr_matrix.columns
    
    for i in range(len(tickers)):
        for j in range(i+1, len(tickers)):
            if corr_matrix.iloc[i, j] >= threshold:
                pairs.append((tickers[i], tickers[j]))
    return pairs

def cointegration_test(price1: pd.Series, price2: pd.Series, significance: float = 0.1) -> bool:
    price1 = np.log(price1)
    price2 = np.log(price2)
    score, pvalue, _ = coint(price1, price2)
    return pvalue < significance

def select_pairs(price_data: pd.DataFrame, corr_threshold: float = 0.6, coint_significance: float = 0.1) -> List[Tuple[str, str]]:
    correlated_pairs = find_highly_correlated_pairs(price_data, corr_threshold)
    
    valid_pairs = []
    for t1, t2 in correlated_pairs:
        if cointegration_test(price_data[t1], price_data[t2], coint_significance):
            valid_pairs.append((t1, t2))
    
    return valid_pairs