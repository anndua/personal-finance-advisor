import { useState } from "react";
import { mlAPI } from "../Services/api";
import toast from "react-hot-toast";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
} from "recharts";
import { FaCalculator, FaSpinner, FaRupeeSign } from "react-icons/fa";

const defaultForm = { monthly_investment: "", annual_rate: "", years: "" };

const formatINR = (v) =>
  "₹" + Number(v).toLocaleString("en-IN", { maximumFractionDigits: 0 });

const ResultStat = ({ label, value, highlight }) => (
  <div className={`rounded-xl p-4 ${highlight ? "bg-brand-600 text-white" : "bg-slate-50"}`}>
    <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${highlight ? "text-brand-200" : "text-slate-400"}`}>
      {label}
    </p>
    <p className={`text-xl font-bold ${highlight ? "text-white" : "text-slate-800"}`}>{value}</p>
  </div>
);

const SipCalculator = () => {
  const [form, setForm]       = useState(defaultForm);
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await mlAPI.calculateSip({
        monthly_investment: Number(form.monthly_investment),
        annual_rate:        Number(form.annual_rate),
        years:              Number(form.years),
      });
      setResult(res.data);
    } catch (err) {
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        "ML service unreachable. Make sure it's running on port 8001.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const chartData = result
    ? [
        { name: "Invested",     value: result.invested_amount,  color: "#d4a843" },
        { name: "Wealth Gained",value: result.wealth_gained,    color: "#1a6b5e" },
        { name: "Maturity",     value: result.maturity_amount,  color: "#5c7cfa" },
      ]
    : [];

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
          <FaCalculator size={17} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">SIP Calculator</h3>
          <p className="text-xs text-slate-400">
            Project your Systematic Investment Plan returns
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Monthly Investment (₹)
          </label>
          <div className="relative">
            <FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
            <input
              type="number"
              name="monthly_investment"
              value={form.monthly_investment}
              onChange={handleChange}
              placeholder="5000"
              min="1"
              className="field pl-8"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Expected Return (% p.a.)
          </label>
          <input
            type="number"
            name="annual_rate"
            value={form.annual_rate}
            onChange={handleChange}
            placeholder="12"
            min="0.1"
            max="100"
            step="0.1"
            className="field"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Time Period (Years)
          </label>
          <input
            type="number"
            name="years"
            value={form.years}
            onChange={handleChange}
            placeholder="10"
            min="1"
            max="50"
            className="field"
            required
          />
        </div>

        <div className="sm:col-span-3 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary min-w-[160px] justify-center"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" size={13} />
                Calculating…
              </>
            ) : (
              <>
                <FaCalculator size={13} />
                Calculate Returns
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results */}
      {result && (
        <div className="border-t border-slate-100 pt-6 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultStat
              label="Monthly SIP"
              value={formatINR(result.monthly_investment)}
            />
            <ResultStat
              label="Total Invested"
              value={formatINR(result.invested_amount)}
            />
            <ResultStat
              label="Wealth Gained"
              value={formatINR(result.wealth_gained)}
            />
            <ResultStat
              label="Maturity Amount"
              value={formatINR(result.maturity_amount)}
              highlight
            />
          </div>

          {/* Bar chart */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Breakdown
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={chartData}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                barSize={48}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  width={52}
                />
                <Tooltip
                  formatter={(v) => [formatINR(v)]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #f1f5f9",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <button
            onClick={() => setResult(null)}
            className="btn-ghost text-xs"
          >
            Reset Calculator
          </button>
        </div>
      )}
    </div>
  );
};

export default SipCalculator;
