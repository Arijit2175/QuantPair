// src/api/strategy.js

export async function fetchStrategyResults() {
  // Update the URL to your actual backend endpoint
  const response = await fetch("http://localhost:8000/run-strategy");
  if (!response.ok) throw new Error("Failed to fetch strategy results");
  return response.json();
}
