def plot_all(price1: pd.Series, price2: pd.Series, ticker1: str, ticker2: str,
             spread: pd.Series, zscore: pd.Series, signals: pd.DataFrame, equity_curve: pd.Series):
    fig, axs = plt.subplots(4, 1, figsize=(12, 16), sharex=True)

    axs[0].plot(price1, label=ticker1)
    axs[0].plot(price2, label=ticker2)
    axs[0].set_title(f"Price Series: {ticker1} & {ticker2}")
    axs[0].legend()
    axs[0].set_ylabel("Price")

    axs[1].plot(spread, label="Spread")
    axs[1].axhline(spread.mean(), color='r', linestyle='--', label="Mean")
    axs[1].set_title("Spread with Mean")
    axs[1].legend()
    axs[1].set_ylabel("Spread")

    axs[2].plot(zscore, label="Z-score")
    axs[2].axhline(2, color='r', linestyle='--', label="+2")
    axs[2].axhline(-2, color='g', linestyle='--', label="-2")
    buy_signals = signals[signals['Position'] == 1].index
    sell_signals = signals[signals['Position'] == -1].index
    axs[2].scatter(buy_signals, zscore.loc[buy_signals], color='g', marker='^', label='Buy')
    axs[2].scatter(sell_signals, zscore.loc[sell_signals], color='r', marker='v', label='Sell')
    axs[2].set_title("Z-score & Trade Signals")
    axs[2].legend()
    axs[2].set_ylabel("Z-score")

    axs[3].plot(equity_curve, label="Equity Curve")
    axs[3].set_title("Equity Curve")
    axs[3].set_ylabel("Portfolio Value")
    axs[3].legend()
    axs[3].set_xlabel("Date")

    plt.tight_layout()
    plt.show()
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
    buy_signals = signals[signals['Position'] == 1].index
    sell_signals = signals[signals['Position'] == -1].index
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