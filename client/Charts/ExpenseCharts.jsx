import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

/* Static sample data — swap out for API data when ready */
const data = [
  { name: "Food",     value: 35 },
  { name: "Bills",    value: 25 },
  { name: "Travel",   value: 20 },
  { name: "Shopping", value: 12 },
  { name: "Others",   value: 8 },
];

const COLORS = ["#1a6b5e", "#d4a843", "#5c7cfa", "#a855f7", "#94a3b8"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-card px-3 py-2 text-sm">
      <p className="font-medium text-slate-700">{payload[0].name}</p>
      <p className="text-brand-600 font-semibold">{payload[0].value}%</p>
    </div>
  );
};

const ExpenseChart = () => {
  return (
    <div className="card">
      <h2 className="font-semibold text-slate-800 mb-1">Expense Distribution</h2>
      <p className="text-xs text-slate-400 mb-5">Breakdown by category</p>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={95}
            innerRadius={50}
            paddingAngle={3}
            strokeWidth={0}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs text-slate-600">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
