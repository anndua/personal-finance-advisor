import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const ASSET_TYPES = ["Stock", "Mutual Fund", "Gold", "Crypto", "Real Estate", "Bond", "FD"];

const defaultForm = { asset_name: "", asset_type: "Stock", amount: "" };

const PortfolioModal = ({ isOpen, onClose, onSave, item }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    setForm(item ? { asset_name: item.asset_name, asset_type: item.asset_type, amount: item.amount } : defaultForm);
  }, [item, isOpen]);

  if (!isOpen) return null;

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSave({ ...form, amount: Number(form.amount) });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-modal w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">
            {item ? "Edit Asset" : "Add Asset"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200
                       flex items-center justify-center transition"
            aria-label="Close"
          >
            <FaTimes size={13} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Asset Name</label>
            <input
              className="field"
              placeholder="e.g. Nippon India Flexi Cap Fund"
              value={form.asset_name}
              onChange={set("asset_name")}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Asset Type</label>
            <select className="field" value={form.asset_type} onChange={set("asset_type")}>
              {ASSET_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              Invested Amount (₹)
            </label>
            <input
              type="number"
              className="field"
              placeholder="e.g. 50000"
              min="0"
              value={form.amount}
              onChange={set("amount")}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {item ? "Save Changes" : "Add Asset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioModal;
