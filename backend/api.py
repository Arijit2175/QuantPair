from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import yfinance as yf
from pair_selection import select_pairs
from hedge_ratio import estimate_hedge_ratio
from spread_signal import compute_spread, compute_rolling_stats, compute_zscore
from trading_rules import generate_trade_signals
from risk_management import calculate_position_size, set_stop_loss_take_profit, assign_risk_level
from backtest import backtest_strategy