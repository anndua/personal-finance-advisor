import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { portfolioAPI } from "../Services/api";
import { FaBrain } from "react-icons/fa";

const ASSET_COLORS = {
  Stock:         "#1a6b5e",
  "Mutual Fund": "#5c7cfa",
  Gold:          "#d4a843",
  Crypto:        "#a855f7",
  "Real Estate": "#f97316",
  Bond:          "#06b6d4",
  FD:            "#ec4899",
};

const ALLOC_COLORS = { Equity: "#1a6b5e", Debt: "#d4a843", Gold: "#f59e0b" };

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-card px-3 py-2 text-sm">
      <p className="text-slate-500 text-xs mb-0.5">{payload[0].name}</p>
      <p className="font-semibold text-brand-600">
        {payload[0].payload.isPercent
          ? `${payload[0].value}%`
          : `₹${Number(payload[0].value).toLocaleString("en-IN")}`}
      </p>
    </div>
  );
};

const PortfolioChart = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [riskResult, setRiskResult]       = useState(null);
  const [showMode, setShowMode]           = useState("holdings"); // "holdings" | "ai"

  useEffect(() => {
    // Load real portfolio holdings
    portfolioAPI.getAll()
      .then((res) => {
        const items = res.data || [];
        const map = items.reduce((acc, i) => {
          const t = i.asset_type || "Other";
          acc[t] = (acc[t] || 0) + (i.amount || 0);
          return acc;
        }, {});
        setPortfolioData(
          Object.entries(map).map(([name, value]) => ({ name, value }))
        );
      })
      .catch(() => {});

    // Load cached AI risk result
    try {
      const cached = localStorage.getItem("riskResult");
      if (cached) setRiskResult(JSON.parse(cached));
    } catch {}
  }, []);

  // Data for AI allocation view
  const aiData = riskResult
    ? [
        { name: "Equity", value: riskResult.portfolio.equity, isPercent: true },
        { name: "Debt",   value: riskResult.portfolio.debt,   isPercent: true },
        { name: "Gold",   value: riskResult.portfolio.gold,   isPercent: true },
      ]
    : [];

  const activeData   = showMode === "ai" ? aiData : portfolioData;
  const activeColors = showMode === "ai" ? ALLOC_COLORS : ASSET_COLORS;
  const isEmpty      = activeData.length === 0;

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-1 gap-2">
        <div>
          <h2 className="font-semibold text-slate-800">
            {showMode === "ai" ? "AI Recommended Allocation" : "Portfolio Breakdown"}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {showMode === "ai"
              ? `Based on ${riskResult?.risk_profile} risk profile`
              : "By asset type (invested amount)"}
          </p>
        </div>

        {/* Toggle between views if AI result exists */}
        {riskResult && (
          <div className="flex bg-slate-100 rounded-lg p-0.5 shrink-0">
            <button
              onClick={() => setShowMode("holdings")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                showMode === "holdings"
                  ? "bg-white text-brand-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Holdings
            </button>
            <button
              onClick={() => setShowMode("ai")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                showMode === "ai"
                  ? "bg-white text-brand-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <FaBrain size={10} />
              AI
            </button>
          </div>
        )}
      </div>

      {isEmpty ? (
        <div className="h-64 flex flex-col items-center justify-center text-slate-300 gap-2">
          <p className="text-sm">
            {showMode === "ai"
              ? "Run the AI Risk Profiler in Portfolio → AI Advisor"
              : "No portfolio data yet"}
          </p>
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={activeData}
                dataKey="value"
                outerRadius={90}
                innerRadius={48}
                paddingAngle={3}
                strokeWidth={0}
              >
                {activeData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={
                      activeColors[entry.name] ??
                      "#94a3b8"
                    }
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v) => <span className="text-xs text-slate-600">{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* AI risk badge */}
          {showMode === "ai" && riskResult && (
            <div className="mt-2 flex justify-center">
              <span className="text-xs px-3 py-1 rounded-full bg-brand-50 text-brand-600 font-semibold">
                {riskResult.risk_profile} Profile
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PortfolioChart;
