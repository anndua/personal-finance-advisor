import MainLayout from "../layouts/MainLayout";

import SummaryCard from "../components/SummaryCard";

import ExpenseChart from "../charts/ExpenseChart";
import PortfolioChart from "../charts/PortfolioChart";

const Dashboard = () => {
  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6 mb-8">

        <SummaryCard
          title="Net Worth"
          value="₹1,24,500"
          change="+12%"
        />

        <SummaryCard
          title="Expenses"
          value="₹15,800"
          change="-8%"
        />

        <SummaryCard
          title="Goals"
          value="4"
          change="2 Active"
        />

        <SummaryCard
          title="Investments"
          value="₹75,000"
          change="+18%"
        />

      </div>

      <div className="grid grid-cols-2 gap-6">

        <ExpenseChart />

        <PortfolioChart />

      </div>

      <div className="bg-white mt-8 rounded-2xl p-6 shadow-sm">

        <h2 className="font-semibold mb-4">
          Recent Transactions
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-3">
                Expense
              </th>
              <th className="text-left py-3">
                Category
              </th>
              <th className="text-left py-3">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td className="py-4">
                Grocery Shopping
              </td>
              <td>Food</td>
              <td>₹2,500</td>
            </tr>

            <tr>
              <td className="py-4">
                Electricity Bill
              </td>
              <td>Bills</td>
              <td>₹1,800</td>
            </tr>

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
};

export default Dashboard;