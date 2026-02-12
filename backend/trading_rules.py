import pandas as pd
from typing import List, Dict

def generate_trade_signals(zscore: pd.Series, entry_threshold: float = 2.0, exit_threshold: float = 0.5) -> pd.DataFrame:
    signals = []
    position = 0  
    for z in zscore:
        if position == 0:
            if z > entry_threshold:
                signals.append(-1)
                position = -1
            elif z < -entry_threshold:
                signals.append(1)
                position = 1
            else:
                signals.append(0)
        elif position == 1:
            if abs(z) < exit_threshold:
                signals.append(0) 
                position = 0
            else:
                signals.append(1) 
        elif position == -1:
            if abs(z) < exit_threshold:
                signals.append(0) 
                position = 0
            else:
                signals.append(-1)
    return pd.DataFrame({'Signal': signals}, index=zscore.index)

if __name__ == "__main__":
    import numpy as np
    z = pd.Series(np.random.normal(0, 1, 100))
    signals = generate_trade_signals(z)
    print(signals.tail())