import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import PortfolioCard from "../components/PortfolioCard";
import PortfolioModal from "../components/PortfolioModal";
import { portfolioAPI } from "../Services/api";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

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
        await portfolioAPI.update(editing.id, data);
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
  const totalInvested = items.reduce((s, i) => s + i.quantity * i.buyPrice, 0);
  const totalCurrent = items.reduce((s, i) => s + i.quantity * i.currentPrice, 0);
  const totalPnl = totalCurrent - totalInvested;
  const pnlPct = totalInvested > 0 ? ((totalPnl / totalInvested) * 100).toFixed(2) : 0;

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Portfolio</h1>
          <p className="text-slate-500 text-sm mt-1">
            {items.length} asset{items.length !== 1 ? "s" : ""} tracked
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="btn-primary"
        >
          <FaPlus size={12} />
          Add Asset
        </button>
      </div>

      {/* Summary bar */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="card">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
              Total Invested
            </p>
            <p className="text-xl font-bold text-slate-800">₹{totalInvested.toLocaleString()}</p>
          </div>
          <div className="card">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
              Current Value
            </p>
            <p className="text-xl font-bold text-slate-800">₹{totalCurrent.toLocaleString()}</p>
          </div>
          <div className="card">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
              Total P&amp;L
            </p>
            <p className={`text-xl font-bold ${totalPnl >= 0 ? "text-brand-600" : "text-red-500"}`}>
              {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toLocaleString()} ({pnlPct}%)
            </p>
          </div>
        </div>
      )}

      {/* Asset cards */}
      {items.length === 0 ? (
        <div className="card text-center py-16 text-slate-400">
          <p className="text-lg font-medium mb-1">No assets yet</p>
          <p className="text-sm">Add your first investment to start tracking.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onEdit={(i) => {
                setEditing(i);
                setOpen(true);
              }}
              onDelete={remove}
            />
          ))}
        </div>
      )}

      <PortfolioModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSave={save}
        item={editing}
      />
    </MainLayout>
  );
};

export default Portfolio;
