import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const CATEGORIES = ["Food", "Travel", "Bills", "Shopping", "Others"];

const defaultForm = {
  title: "",
  category: "Food",
  amount: "",
  date: "",
  notes: "",
};

const ExpenseModal = ({ isOpen, onClose, onSave, expense }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    setForm(expense ?? defaultForm);
  }, [expense, isOpen]);

  if (!isOpen) return null;

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, amount: Number(form.amount) });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-modal w-full max-w-lg">
        {/* Modal header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">
            {expense ? "Edit Expense" : "Add Expense"}
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              Expense Name
            </label>
            <input
              type="text"
              className="field"
              placeholder="e.g. Grocery Shopping"
              value={form.title}
              onChange={set("title")}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                Category
              </label>
              <select className="field" value={form.category} onChange={set("category")}>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                Amount (₹)
              </label>
              <input
                type="number"
                className="field"
                placeholder="0"
                min="0"
                value={form.amount}
                onChange={set("amount")}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Date</label>
            <input type="date" className="field" value={form.date} onChange={set("date")} />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              Notes <span className="text-slate-300">(optional)</span>
            </label>
            <textarea
              rows={3}
              className="field resize-none"
              placeholder="Any additional notes..."
              value={form.notes}
              onChange={set("notes")}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {expense ? "Save Changes" : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
