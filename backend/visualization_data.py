import pandas as pd

def prepare_chart_data(price1: pd.Series, price2: pd.Series, ticker1: str, ticker2: str,
                       spread: pd.Series, zscore: pd.Series,
                       signals: pd.DataFrame, equity_curve: pd.Series):

    df = pd.DataFrame({
        "date": price1.index.astype(str),
        ticker1: price1.values,
        ticker2: price2.values,
        "spread": spread.values,
        "zscore": zscore.values,
        "equity": equity_curve.values,
        "position": signals["Position"].values
    })

    return df.to_dict(orient="records")
