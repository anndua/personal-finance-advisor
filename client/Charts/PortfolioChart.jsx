import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", value: 15000 },
  { month: "Feb", value: 18000 },
  { month: "Mar", value: 21000 },
  { month: "Apr", value: 28000 },
  { month: "May", value: 32000 },
  { month: "Jun", value: 40000 }
];

const PortfolioChart = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      <h2 className="font-semibold mb-4">
        Portfolio Growth
      </h2>

      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#1a6b5e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default PortfolioChart;