from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def save_strategy_result(result: dict):
    """
    Save strategy result to Supabase table 'strategy_results'.
    """
    data = {
        "pair": str(result.get("selected_pair")),
        "hedge_ratio": result.get("hedge_ratio"),
        "position_size": str(result.get("position_size")),
        "stop_loss": result.get("stop_loss"),
        "take_profit": result.get("take_profit"),
        "risk_level": result.get("risk_level"),
        "performance": str(result.get("performance")),
    }
    response = supabase.table("strategy_results").insert(data).execute()
    return response

def get_strategy_results():
    """
    Retrieve all strategy results from Supabase table 'strategy_results'.
    """
    response = supabase.table("strategy_results").select("*").execute()
    return response.data