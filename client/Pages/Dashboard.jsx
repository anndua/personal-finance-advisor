import MainLayout from "../layouts/MainLayout";
import SummaryCard from "../components/SummaryCard";
import ExpenseChart from "../Charts/ExpenseCharts";
import PortfolioChart from "../Charts/PortfolioChart";
import {
  FaWallet,
  FaMoneyBillWave,
  FaBullseye,
  FaChartLine,
} from "react-icons/fa";

/* Placeholder recent transactions — replace with API data as needed */
const recentTransactions = [
  { id: 1, title: "Grocery Shopping", category: "Food",    amount: "₹2,500", date: "Jun 28" },
  { id: 2, title: "Electricity Bill",  category: "Bills",   amount: "₹1,800", date: "Jun 27" },
  { id: 3, title: "Cab Ride",          category: "Travel",  amount: "₹650",   date: "Jun 26" },
  { id: 4, title: "Netflix",           category: "Others",  amount: "₹499",   date: "Jun 25" },
];

const categoryColors = {
  Food:    "bg-brand-100 text-brand-700",
  Bills:   "bg-gold-400/20 text-gold-600",
  Travel:  "bg-blue-100 text-blue-600",
  Others:  "bg-slate-100 text-slate-600",
};

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Here's your financial overview</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <SummaryCard title="Net Worth"   value="₹1,24,500" change="↑ +12% this month" icon={<FaWallet />} />
        <SummaryCard title="Expenses"    value="₹15,800"   change="↓ -8% vs last month" icon={<FaMoneyBillWave />} positive={false} />
        <SummaryCard title="Goals"       value="4 Active"  change="2 on track" icon={<FaBullseye />} />
        <SummaryCard title="Investments" value="₹75,000"   change="↑ +18% total return" icon={<FaChartLine />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ExpenseChart />
        <PortfolioChart />
      </div>

      {/* Recent transactions */}
      <div className="card">
        <h2 className="font-semibold text-slate-800 mb-5">Recent Transactions</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Description
                </th>
                <th className="text-left py-2 pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Category
                </th>
                <th className="text-left py-2 pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Date
                </th>
                <th className="text-right py-2 pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 font-medium text-slate-700">{tx.title}</td>
                  <td className="py-3.5">
                    <span className={`badge ${categoryColors[tx.category] ?? "bg-slate-100 text-slate-600"}`}>
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-400">{tx.date}</td>
                  <td className="py-3.5 text-right font-semibold text-slate-800">{tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
