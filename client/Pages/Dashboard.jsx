import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SummaryCard from "../components/SummaryCard";
import ExpenseChart from "../Charts/ExpenseCharts";
import PortfolioChart from "../Charts/PortfolioChart";
import { expenseAPI, goalAPI, portfolioAPI } from "../Services/api";
import { useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaMoneyBillWave,
  FaBullseye,
  FaChartLine,
  FaReceipt,
  FaBrain,
} from "react-icons/fa";

const categoryColors = {
  Food:          "bg-brand-100 text-brand-700",
  Bills:         "bg-gold-400/20 text-gold-600",
  Travel:        "bg-blue-100 text-blue-600",
  Entertainment: "bg-purple-100 text-purple-600",
  Health:        "bg-green-100 text-green-700",
  Shopping:      "bg-pink-100 text-pink-600",
  Education:     "bg-cyan-100 text-cyan-700",
  Others:        "bg-slate-100 text-slate-600",
};

const formatINR = (amount) =>
  "₹" +
  Number(amount).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

const formatDate = (dateStr) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  } catch {
    return dateStr;
  }
};

/* Skeleton pulse block */
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
);

const Dashboard = () => {
  const [expenses, setExpenses]   = useState([]);
  const [goals, setGoals]         = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [riskResult, setRiskResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [expRes, goalRes, portRes] = await Promise.all([
          expenseAPI.getAll(),
          goalAPI.getAll(),
          portfolioAPI.getAll(),
        ]);
        setExpenses(expRes.data  || []);
        setGoals(goalRes.data    || []);
        setPortfolio(portRes.data|| []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();

    // Load cached AI risk result
    try {
      const cached = localStorage.getItem("riskResult");
      if (cached) setRiskResult(JSON.parse(cached));
    } catch {}
  }, []);

  /* ── Derived metrics ── */
  const totalExpenses    = expenses.reduce((s, e) => s + (e.amount || 0), 0);
  const totalInvestments = portfolio.reduce((s, p) => s + (p.amount || 0), 0);
  const netWorth         = totalInvestments - totalExpenses;

  const activeGoals  = goals.length;
  const onTrackGoals = goals.filter(
    (g) => g.current_amount >= g.target_amount * 0.5
  ).length;

  /* Recent 5 expenses sorted by date desc */
  const recentTransactions = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <MainLayout>
        <div className="mb-8">
          <Skeleton className="h-7 w-40 mb-2" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card">
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-3 w-28" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
        <Skeleton className="h-48" />
      </MainLayout>
    );
  }

  /* ── Error state ── */
  if (error) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
            <FaReceipt className="text-red-400 text-2xl" />
          </div>
          <h2 className="text-lg font-semibold text-slate-700 mb-1">
            Something went wrong
          </h2>
          <p className="text-slate-400 text-sm mb-5">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Here's your financial overview</p>
      </div>

      {/* ── Summary cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-8">
        <SummaryCard
          title="Net Worth"
          value={expenses.length === 0 && portfolio.length === 0 ? "—" : formatINR(netWorth)}
          change={
            expenses.length === 0 && portfolio.length === 0
              ? "No data yet"
              : netWorth >= 0
              ? "Investments exceed expenses"
              : "Expenses exceed investments"
          }
          icon={<FaWallet />}
          positive={netWorth >= 0}
        />
        <SummaryCard
          title="Expenses"
          value={expenses.length === 0 ? "—" : formatINR(totalExpenses)}
          change={
            expenses.length === 0
              ? "No expenses recorded"
              : `${expenses.length} transaction${expenses.length !== 1 ? "s" : ""}`
          }
          icon={<FaMoneyBillWave />}
          positive={false}
        />
        <SummaryCard
          title="Goals"
          value={goals.length === 0 ? "—" : `${activeGoals} Active`}
          change={
            goals.length === 0
              ? "No goals set yet"
              : `${onTrackGoals} of ${activeGoals} on track`
          }
          icon={<FaBullseye />}
          positive={onTrackGoals > 0}
        />
        <SummaryCard
          title="Investments"
          value={portfolio.length === 0 ? "—" : formatINR(totalInvestments)}
          change={
            portfolio.length === 0
              ? "No investments added"
              : riskResult
              ? `${riskResult.risk_profile} profile · ${portfolio.length} asset${portfolio.length !== 1 ? "s" : ""}`
              : `${portfolio.length} asset${portfolio.length !== 1 ? "s" : ""}`
          }
          icon={<FaChartLine />}
          positive={true}
        />
      </div>

      {/* ── AI nudge banner (shown when no risk profile yet) ── */}
      {!riskResult && (
        <div
          onClick={() => navigate("/portfolio")}
          className="card mb-6 md:mb-8 flex items-center gap-4 cursor-pointer
                     border border-brand-100 bg-brand-50 hover:bg-brand-100 transition"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center
                          justify-center shrink-0">
            <FaBrain size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-brand-700">
              Discover your risk profile
            </p>
            <p className="text-xs text-brand-500 mt-0.5">
              Answer 5 quick questions and get AI-powered fund recommendations →
            </p>
          </div>
        </div>
      )}

      {/* Show AI profile badge if result exists */}
      {riskResult && (
        <div
          onClick={() => navigate("/portfolio")}
          className="card mb-6 md:mb-8 flex items-center gap-4 cursor-pointer
                     border border-brand-100 bg-brand-50 hover:bg-brand-100 transition"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center
                          justify-center shrink-0">
            <FaBrain size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-brand-700">
              AI Risk Profile: {riskResult.risk_profile}
            </p>
            <p className="text-xs text-brand-500 mt-0.5">
              Recommended allocation — Equity {riskResult.portfolio.equity}% · Debt {riskResult.portfolio.debt}% · Gold {riskResult.portfolio.gold}% → View details
            </p>
          </div>
        </div>
      )}

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <ExpenseChart />
        <PortfolioChart />
      </div>

      {/* ── Recent transactions ── */}
      <div className="card">
        <h2 className="font-semibold text-slate-800 mb-5">Recent Transactions</h2>

        {recentTransactions.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
              <FaReceipt className="text-slate-300 text-2xl" />
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">No transactions yet</p>
            <p className="text-slate-400 text-xs">
              Add expenses to see your recent activity here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            {/* Mobile card list */}
            <div className="sm:hidden divide-y divide-slate-50">
              {recentTransactions.map((tx) => (
                <div key={tx._id} className="px-4 py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`badge shrink-0 ${
                        categoryColors[tx.category] ?? "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {tx.category}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {tx.description}
                      </p>
                      <p className="text-xs text-slate-400">{formatDate(tx.date)}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-800 shrink-0 text-sm">
                    {formatINR(tx.amount)}
                  </span>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <table className="hidden sm:table w-full text-sm">
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
                  <tr key={tx._id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 font-medium text-slate-700">{tx.description}</td>
                    <td className="py-3.5">
                      <span
                        className={`badge ${
                          categoryColors[tx.category] ?? "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-400">{formatDate(tx.date)}</td>
                    <td className="py-3.5 text-right font-semibold text-slate-800">
                      {formatINR(tx.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
