// src/api/strategy.js

export async function fetchStrategyResults({ tickers, start_date, end_date, initial_capital }) {
  const response = await fetch("http://localhost:8000/run_strategy", {
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
