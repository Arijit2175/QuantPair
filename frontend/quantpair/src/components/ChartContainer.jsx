import Plot from "react-plotly.js";

export default function ChartContainer({ equityCurve, pnl }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Equity Curve</h2>

      <Plot
        data={[
          {
            x: equityCurve.map(p => p.date),
            y: equityCurve.map(p => p.value),
            type: "scatter",
            mode: "lines",
            name: "Equity",
          },
        ]}
        layout={{
          autosize: true,
          margin: { t: 30 },
          paper_bgcolor: "white",
          plot_bgcolor: "white",
        }}
        style={{ width: "100%", height: "300px" }}
      />

      <h2 className="text-lg font-semibold mt-6 mb-4">PnL</h2>

      <Plot
        data={[
          {
            x: pnl.map(p => p.date),
            y: pnl.map(p => p.value),
            type: "bar",
            name: "PnL",
          },
        ]}
        layout={{
          autosize: true,
          margin: { t: 30 },
        }}
        style={{ width: "100%", height: "250px" }}
      />
    </div>
  );
}