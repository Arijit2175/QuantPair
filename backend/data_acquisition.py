import pandas as pd
import yfinance as yf
from typing import Tuple

def download_stock_data(ticker: str, start: str, end: str) -> pd.DataFrame:
    df = yf.download(ticker, start=start, end=end)[['Close']]
    df = df.rename(columns={'Close': ticker})
    df.index = pd.to_datetime(df.index)
    return df

