import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const data = [
  { name: "Food", value: 35 },
  { name: "Bills", value: 25 },
  { name: "Travel", value: 20 },
  { name: "Others", value: 20 }
];

const colors = [
  "#1a6b5e",
  "#d4a843",
  "#5c7cfa",
  "#94a3b8"
];

const ExpenseChart = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      <h2 className="font-semibold mb-4">
        Expense Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={colors[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default ExpenseChart;