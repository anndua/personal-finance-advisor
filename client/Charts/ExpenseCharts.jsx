import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { expenseAPI } from "../Services/api";

const COLORS = ["#1a6b5e", "#d4a843", "#5c7cfa", "#a855f7", "#94a3b8", "#f97316", "#06b6d4"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-card px-3 py-2 text-sm">
      <p className="font-medium text-slate-700">{payload[0].name}</p>
      <p className="text-brand-600 font-semibold">
        ₹{Number(payload[0].value).toLocaleString("en-IN")}
      </p>
    </div>
  );
};

const ExpenseChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    expenseAPI.getAll()
      .then((res) => {
        const expenses = res.data || [];
        // Aggregate by category
        const map = expenses.reduce((acc, e) => {
          const cat = e.category || "Others";
          acc[cat] = (acc[cat] || 0) + (e.amount || 0);
          return acc;
        }, {});
        setData(
          Object.entries(map)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
        );
      })
      .catch(() => setData([]));
  }, []);

  return (
    <div className="card">
      <h2 className="font-semibold text-slate-800 mb-1">Expense Distribution</h2>
      <p className="text-xs text-slate-400 mb-5">Breakdown by category</p>

      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-300 text-sm">
          No expense data yet
        </div>
      ) : (
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
              formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ExpenseChart;
