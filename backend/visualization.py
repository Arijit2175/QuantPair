import matplotlib.pyplot as plt
import pandas as pd

def plot_prices(price1: pd.Series, price2: pd.Series, ticker1: str, ticker2: str):
    plt.figure(figsize=(10, 4))
    plt.plot(price1, label=ticker1)
    plt.plot(price2, label=ticker2)
    plt.title(f"Price Series: {ticker1} & {ticker2}")
    plt.legend()
    plt.xlabel("Date")
    plt.ylabel("Price")
    plt.tight_layout()
    plt.show()

def plot_spread(spread: pd.Series):
    plt.figure(figsize=(10, 4))
    plt.plot(spread, label="Spread")
    plt.axhline(spread.mean(), color='r', linestyle='--', label="Mean")
    plt.title("Spread with Mean")
    plt.legend()
    plt.xlabel("Date")
    plt.ylabel("Spread")
    plt.tight_layout()
    plt.show()

def plot_zscore(zscore: pd.Series, signals: pd.DataFrame):
    plt.figure(figsize=(10, 4))
    plt.plot(zscore, label="Z-score")
    plt.axhline(2, color='r', linestyle='--', label="+2")
    plt.axhline(-2, color='g', linestyle='--', label="-2")
    buy_signals = signals[signals['Signal'] == 1].index
    sell_signals = signals[signals['Signal'] == -1].index
    plt.scatter(buy_signals, zscore.loc[buy_signals], color='g', marker='^', label='Buy')
    plt.scatter(sell_signals, zscore.loc[sell_signals], color='r', marker='v', label='Sell')
    plt.title("Z-score & Trade Signals")
    plt.legend()
    plt.xlabel("Date")
    plt.ylabel("Z-score")
    plt.tight_layout()
    plt.show()

def plot_equity_curve(equity_curve: pd.Series):
    plt.figure(figsize=(10, 4))
    plt.plot(equity_curve, label="Equity Curve")
    plt.title("Equity Curve")
    plt.xlabel("Date")
    plt.ylabel("Portfolio Value")
    plt.legend()
    plt.tight_layout()
    plt.show()