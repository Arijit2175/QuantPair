// src/api/strategy.js

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchStrategyResults({ tickers, start_date, end_date, initial_capital }) {
  const response = await fetch(`${API_URL}/run_strategy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tickers,
      start_date,
      end_date,
      initial_capital: Number(initial_capital)
    })
  });
  if (!response.ok) throw new Error("Failed to fetch strategy results");
  return response.json();
}
