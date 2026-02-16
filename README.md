# 📈 QuantPair

**A dashboard for pair trading strategy system** 📈📊 — visualize, analyze, and manage statistically paired assets.

A complete end-to-end dashboard built with a frontend UI and backend logic to support pairs trading strategies in financial markets. 

---

## 🧠 About

QuantPair is an interactive **Pairs Trading Dashboard** that helps you:

✔ Explore statistical relationships between asset pairs  
✔ Generate trading signals using classic quantitative finance techniques  
✔ Track performance and visualize entry/exit opportunities

A perfect tool for traders, quants, and data-driven investors! 

---

## 📦 Features

| Feature | Description |
|---------|-------------|
| 📊 **Interactive Dashboard** | Frontend UI to visualize price spreads and signals |
| 📈 **Pairs Strategy Logic** | Compute co-integration and trading signals |
| 🔄 **Backend API** | Serve data and analytics securely |
| 🧪 **Strategy Testing** | Test historic data to validate signals |
| 📁 **Modular Architecture** | Separate frontend and backend projects |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | JavaScript / React |
| Backend | Python (FastAPI / Flask ) |
| Visualization | Chart.js |
| Deployment | Vercel / Render/ Cloud Hosting |

--

## 📁 Project Structure

```
QuantPair/
├── backend/ 
      ├── api.py
      ├── backtest.py
      ├── data_acquisition.py
      ├── hedge_ratio.py
      ├── pair_selection.py
      ├── risk_management.py
      ├── run.py
      ├── spread_signal.py
      ├── trading_rules.py
      ├── visualization_data.py
      ├── visualization.py
      └── requirements.txt             
├── frontend/quantpair/
        ├── public/
        ├── src/
            ├── pages/
            ├── api/
            └── components/
        └── index.html            
└── README.md               
```

---

## ⚙️ Installation & Setup

### 📥 Clone the Repository

```
git clone https://github.com/Arijit2175/QuantPair.git
cd QuantPair
```

### 🧠 Backend Setup

```
cd backend
pip install -r requirements.txt
```

### 🎨 Frontend Setup

```
cd frontend/quantpair
npm install
```

---

## 👀 Preview

A quick look at the **QuantPair Dashboard** and its features 📊🚀

---

### 🖥️ Dashboard View

| Feature | Preview |
|--------|---------|
| 📈 Pair Price Chart | ![Pair Chart](frontend/quantpair/src/assets/pair_chart.png) |
| 📊 Spread & Z-Score | ![Spread Chart](frontend/quantpair/src/assets/spread_chart.png) |

---

### 🧪 Strategy Signal Example

| Asset A | Asset B | Z-Score | Signal |
|--------|---------|---------|--------|
| KO | PEP | 1.57 | 📉 Sell KO / 📈 Buy PEP |

### 📌 Interpretation

- 🥤 **KO (Coca-Cola)** is **overpriced** relative to PEP  
- 🥤 **PEP (Pepsi)** is **underpriced** relative to KO  
- 📊 Z-score of **1.57** indicates a divergence from the mean  
- ⚡ Strategy suggests:  
  - **Short (Sell) KO**  
  - **Long (Buy) PEP**

---

## 📊 Metrics Evaluated

QuantPair evaluates multiple statistical and trading metrics to identify strong asset pairs and generate reliable trading signals.

### 📈 1. Price Spread

**What it is:**  
The difference between the prices of two assets.

**How it is calculated:**
Spread = Price(A) − Price(B)

**Purpose:**  
Helps measure how far apart two related assets have moved from each other.

### 📊 2. Z-Score of Spread

**What it is:**  
A normalized value indicating how far the current spread deviates from its historical mean.

**How it is calculated:**
Z-score = (Spread − Mean Spread) / Standard Deviation

**Purpose:**  
- Identifies overvaluation and undervaluation  
- Used to generate buy/sell signals  
- Higher absolute value ⇒ stronger divergence

### 🔗 3. Cointegration Score

**What it is:**  
A statistical test that checks if two assets move together in the long run.

**How it is evaluated:**
- Uses historical price series  
- Applies cointegration test (e.g., Engle-Granger)

**Purpose:**  
Ensures only **statistically related pairs** are traded  
Reduces false signals

### 📉 4. Correlation

**What it is:**  
Measures short-term linear relationship between two assets.

**How it is calculated:**
Correlation = cov(A, B) / (std(A) × std(B))

**Purpose:**  
- Filters weakly related asset pairs  
- Confirms similarity in price movement

### ⚡ 5. Trading Signal

**What it is:**  
Final action recommendation based on Z-score thresholds.

**How it is generated:**

| Z-Score Range | Signal |
|--------------|--------|
| Z > +Threshold | 📉 Sell Asset A / 📈 Buy Asset B |
| Z < -Threshold | 📈 Buy Asset A / 📉 Sell Asset B |
| Between limits | ⏸️ Hold |

### 🧪 6. Strategy Performance Metrics

| Metric | Purpose |
|--------|---------|
| 📈 Total Return | Measures profit from strategy |
| 📉 Max Drawdown | Measures worst loss |
| 📊 Sharpe Ratio | Risk-adjusted return |
| 🔁 Win Rate | Percentage of profitable trades |

### 🎯 Why These Metrics?

These metrics help ensure:
- 📉 Mean reversion behavior  
- 📊 Statistical validity  
- ⚡ Actionable trading signals  
- 🧠 Data-driven decisions  

All calculations are based on historical price data and updated dynamically within the dashboard.

---

