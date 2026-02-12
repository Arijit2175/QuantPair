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


