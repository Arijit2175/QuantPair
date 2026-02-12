import pandas as pd
import yfinance as yf
from typing import Tuple

def download_stock_data(ticker: str, start: str, end: str) -> pd.DataFrame:
    df = yf.download(ticker, start=start, end=end)[['Close']]
    df = df.rename(columns={'Close': ticker})
    df.index = pd.to_datetime(df.index)
    return df

def get_aligned_data(ticker1: str, ticker2: str, start: str, end: str) -> pd.DataFrame:
    df1 = download_stock_data(ticker1, start, end)
    df2 = download_stock_data(ticker2, start, end)
    df = pd.concat([df1, df2], axis=1)
    df = df.dropna()
    return df

if __name__ == "__main__":
    ticker1 = "AAPL"
    ticker2 = "MSFT"
    start = "2020-01-01"
    end = "2023-01-01"
    data = get_aligned_data(ticker1, ticker2, start, end)
    print(data.head())