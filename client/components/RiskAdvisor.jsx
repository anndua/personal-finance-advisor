import { useState } from "react";
import { mlAPI } from "../Services/api";
import toast from "react-hot-toast";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FaBrain, FaChartPie, FaLightbulb, FaSpinner } from "react-icons/fa";

const RISK_META = {
  Conservative: {
    color:  "bg-blue-100 text-blue-700",
    border: "border-blue-200",
    desc:   "You prefer stability over high returns. Capital preservation is your priority.",
    icon:   "🛡️",
  },
  Moderate: {
    color:  "bg-gold-400/20 text-gold-700",
    border: "border-yellow-200",
    desc:   "You balance growth with safety. A diversified approach suits you well.",
    icon:   "⚖️",
  },
  Aggressive: {
    color:  "bg-brand-100 text-brand-700",
    border: "border-brand-200",
    desc:   "You seek maximum growth and can stomach short-term volatility.",
    icon:   "🚀",
  },
};

const ALLOC_COLORS = { Equity: "#1a6b5e", Debt: "#d4a843", Gold: "#f59e0b" };

const defaultForm = {
  age:        "",
  income:     "",
  savings:    "",
  experience: "",
  horizon:    "",
};

const FieldInput = ({ label, name, value, onChange, placeholder, hint }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
      {label}
    </label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min="0"
      className="field"
      required
    />
    {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
  </div>
);

const RiskAdvisor = () => {
  const [form, setForm]       = useState(defaultForm);
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        age:        Number(form.age),
        income:     Number(form.income),
        savings:    Number(form.savings),
        experience: Number(form.experience),
        horizon:    Number(form.horizon),
      };
      const res = await mlAPI.predictRisk(payload);
      setResult(res.data);
      // Cache in localStorage so Dashboard can read it
      localStorage.setItem("riskResult", JSON.stringify(res.data));
      toast.success("Risk profile analysed!");
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

  const handleReset = () => {
    setResult(null);
    setForm(defaultForm);
  };

  const allocData = result
    ? [
        { name: "Equity", value: result.portfolio.equity },
        { name: "Debt",   value: result.portfolio.debt   },
        { name: "Gold",   value: result.portfolio.gold   },
      ]
    : [];

  const meta = result ? RISK_META[result.risk_profile] ?? RISK_META.Moderate : null;

  return (
    <div className="space-y-6">
      {/* ── Form ── */}
      {!result ? (
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <FaBrain size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">AI Risk Profiler</h3>
              <p className="text-xs text-slate-400">
                Answer 5 questions to get your personalised investment profile
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldInput
              label="Age"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="e.g. 28"
              hint="Between 18 – 100"
            />
            <FieldInput
              label="Annual Income (₹)"
              name="income"
              value={form.income}
              onChange={handleChange}
              placeholder="e.g. 800000"
              hint="Your gross yearly income"
            />
            <FieldInput
              label="Total Savings (₹)"
              name="savings"
              value={form.savings}
              onChange={handleChange}
              placeholder="e.g. 200000"
              hint="Liquid savings available"
            />
            <FieldInput
              label="Investment Experience (yrs)"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="e.g. 3"
              hint="Years you've been investing"
            />
            <FieldInput
              label="Investment Horizon (yrs)"
              name="horizon"
              value={form.horizon}
              onChange={handleChange}
              placeholder="e.g. 10"
              hint="How long you plan to stay invested"
            />

            <div className="sm:col-span-2 flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary min-w-[160px] justify-center"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" size={13} />
                    Analysing…
                  </>
                ) : (
                  <>
                    <FaBrain size={13} />
                    Analyse My Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* ── Results ── */
        <div className="space-y-5">
          {/* Risk profile badge */}
          <div className={`card border ${meta.border}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{meta.icon}</span>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                    Your Risk Profile
                  </p>
                  <span className={`text-xl font-bold px-3 py-1 rounded-lg ${meta.color}`}>
                    {result.risk_profile}
                  </span>
                  <p className="text-sm text-slate-500 mt-2 max-w-sm">{meta.desc}</p>
                </div>
              </div>
              <button onClick={handleReset} className="btn-ghost text-xs shrink-0">
                Re-analyse
              </button>
            </div>
          </div>

          {/* Allocation chart + recommended funds */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Donut chart */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <FaChartPie className="text-brand-600" size={15} />
                <h4 className="font-semibold text-slate-800 text-sm">Recommended Allocation</h4>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={allocData}
                    dataKey="value"
                    outerRadius={85}
                    innerRadius={48}
                    paddingAngle={4}
                    strokeWidth={0}
                  >
                    {allocData.map((entry) => (
                      <Cell key={entry.name} fill={ALLOC_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v, name) => [`${v}%`, name]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #f1f5f9",
                      fontSize: "13px",
                    }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(v) => <span className="text-xs text-slate-600">{v}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Allocation pills */}
              <div className="flex justify-center gap-3 mt-2">
                {allocData.map((d) => (
                  <div key={d.name} className="text-center">
                    <div
                      className="text-lg font-bold"
                      style={{ color: ALLOC_COLORS[d.name] }}
                    >
                      {d.value}%
                    </div>
                    <div className="text-xs text-slate-400">{d.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended funds */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <FaLightbulb className="text-gold-500" size={15} />
                <h4 className="font-semibold text-slate-800 text-sm">Recommended Funds</h4>
              </div>

              <div className="space-y-3">
                {result.recommended_funds.map((fund, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50
                               border border-slate-100"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center
                                 text-white text-sm font-bold shrink-0"
                      style={{ background: "#1a6b5e" }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{fund}</p>
                      <p className="text-xs text-slate-400">
                        {result.risk_profile} profile recommendation
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                * These are AI-generated suggestions based on your risk profile. Consult a
                SEBI-registered advisor before investing.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAdvisor;
