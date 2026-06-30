import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* Static sample data — swap out for API data when ready */
const data = [
  { month: "Jan", value: 15000 },
  { month: "Feb", value: 18000 },
  { month: "Mar", value: 21000 },
  { month: "Apr", value: 28000 },
  { month: "May", value: 32000 },
  { month: "Jun", value: 40000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-card px-3 py-2 text-sm">
      <p className="text-slate-500 text-xs mb-0.5">{label}</p>
      <p className="font-semibold text-brand-600">
        ₹{Number(payload[0].value).toLocaleString()}
      </p>
    </div>
  );
};

const PortfolioChart = () => {
  return (
    <div className="card">
      <h2 className="font-semibold text-slate-800 mb-1">Portfolio Growth</h2>
      <p className="text-xs text-slate-400 mb-5">Value over the last 6 months</p>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#1a6b5e" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#1a6b5e" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={48}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#1a6b5e"
            strokeWidth={2.5}
            fill="url(#portfolioGradient)"
            dot={{ fill: "#1a6b5e", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#1a6b5e" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
