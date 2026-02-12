import pandas as pd

def generate_trade_signals(
    zscore: pd.Series,
    entry_threshold: float = 2.0,
    exit_threshold: float = 0.0
) -> pd.DataFrame:

    position = 0
    signals = []

    for t, z in zscore.items():
        if position == 0:
            if z > entry_threshold:
                position = -1   
            elif z < -entry_threshold:
                position = 1    

        elif position == 1:
            if z >= exit_threshold:
                position = 0

        elif position == -1:
            if z <= -exit_threshold:
                position = 0

        signals.append(position)

    return pd.DataFrame({"Position": signals}, index=zscore.index)