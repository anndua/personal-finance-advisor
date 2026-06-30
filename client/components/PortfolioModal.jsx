import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const ASSET_TYPES = ["Stock", "Crypto", "Mutual Fund", "Gold"];

const defaultForm = {
  name: "",
  type: "Stock",
  quantity: "",
  buyPrice: "",
  currentPrice: "",
};

const PortfolioModal = ({ isOpen, onClose, onSave, item }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    setForm(item ?? defaultForm);
  }, [item, isOpen]);

  if (!isOpen) return null;

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      quantity: Number(form.quantity),
      buyPrice: Number(form.buyPrice),
      currentPrice: Number(form.currentPrice),
    });
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
              placeholder="e.g. Reliance Industries"
              value={form.name}
              onChange={set("name")}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Asset Type</label>
            <select className="field" value={form.type} onChange={set("type")}>
              {ASSET_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Quantity</label>
              <input
                type="number"
                className="field"
                placeholder="0"
                min="0"
                value={form.quantity}
                onChange={set("quantity")}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Buy Price</label>
              <input
                type="number"
                className="field"
                placeholder="₹"
                min="0"
                value={form.buyPrice}
                onChange={set("buyPrice")}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                Current Price
              </label>
              <input
                type="number"
                className="field"
                placeholder="₹"
                min="0"
                value={form.currentPrice}
                onChange={set("currentPrice")}
                required
              />
            </div>
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
