import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import PortfolioCard from "../components/PortfolioCard";
import PortfolioModal from "../components/PortfolioModal";
import RiskAdvisor from "../components/RiskAdvisor";
import SipCalculator from "../components/SipCalculator";
import { portfolioAPI } from "../Services/api";
import toast from "react-hot-toast";
import { FaPlus, FaBriefcase, FaBrain } from "react-icons/fa";

const TABS = [
  { id: "holdings", label: "Holdings",   icon: <FaBriefcase size={13} /> },
  { id: "advisor",  label: "AI Advisor", icon: <FaBrain     size={13} /> },
];

const Portfolio = () => {
  const [items, setItems]   = useState([]);
  const [open, setOpen]     = useState(false);
  const [editing, setEditing] = useState(null);
  const [tab, setTab]       = useState("holdings");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await portfolioAPI.getAll();
      setItems(res.data);
    } catch {
      toast.error("Failed to load portfolio");
    }
  };

  const save = async (data) => {
    try {
      if (editing) {
        await portfolioAPI.update(editing._id, data);
        toast.success("Asset updated");
      } else {
        await portfolioAPI.create(data);
        toast.success("Asset added");
      }
      setOpen(false);
      setEditing(null);
      load();
    } catch {
      toast.error("Error saving asset");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this asset?")) return;
    await portfolioAPI.delete(id);
    toast.success("Asset removed");
    load();
  };

  /* Summary metrics */
  const totalValue = items.reduce((s, i) => s + (i.amount || 0), 0);

  /* Group by asset_type for a mini summary */
  const byType = items.reduce((acc, i) => {
    acc[i.asset_type] = (acc[i.asset_type] || 0) + (i.amount || 0);
    return acc;
  }, {});

  return (
    <MainLayout>
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Portfolio</h1>
          <p className="text-slate-500 text-sm mt-1">
            {items.length} asset{items.length !== 1 ? "s" : ""} tracked
          </p>
        </div>
        {tab === "holdings" && (
          <button
            onClick={() => { setEditing(null); setOpen(true); }}
            className="btn-primary"
          >
            <FaPlus size={12} />
            Add Asset
          </button>
        )}
      </div>

      {/* ── Tabs ── */}
      <div className="flex bg-slate-100 rounded-xl p-1 mb-6 w-full sm:w-72">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg
                        text-sm font-medium transition-all ${
                          tab === t.id
                            ? "bg-white text-brand-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Holdings tab ── */}
      {tab === "holdings" && (
        <>
          {/* Summary bar */}
          {items.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-5 mb-6">
              <div className="card col-span-2 sm:col-span-1">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Total Value
                </p>
                <p className="text-xl font-bold text-slate-800">
                  ₹{totalValue.toLocaleString("en-IN")}
                </p>
              </div>

              {Object.entries(byType).map(([type, amt]) => (
                <div key={type} className="card">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 truncate">
                    {type}
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    ₹{amt.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Asset cards */}
          {items.length === 0 ? (
            <div className="card text-center py-16 text-slate-400">
              <FaBriefcase size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium mb-1">No assets yet</p>
              <p className="text-sm">Add your first investment to start tracking.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {items.map((item) => (
                <PortfolioCard
                  key={item._id}
                  item={item}
                  onEdit={(i) => { setEditing(i); setOpen(true); }}
                  onDelete={remove}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ── AI Advisor tab ── */}
      {tab === "advisor" && (
        <div className="space-y-6">
          <RiskAdvisor />
          <SipCalculator />
        </div>
      )}

      <PortfolioModal
        isOpen={open}
        onClose={() => { setOpen(false); setEditing(null); }}
        onSave={save}
        item={editing}
      />
    </MainLayout>
  );
};

export default Portfolio;
