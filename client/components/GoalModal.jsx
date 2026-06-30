import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const defaultForm = {
  name: "",
  targetAmount: "",
  currentAmount: "",
  deadline: "",
};

const GoalModal = ({ isOpen, onClose, onSave, goal }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    setForm(goal ?? defaultForm);
  }, [goal, isOpen]);

  if (!isOpen) return null;

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      targetAmount: Number(form.targetAmount),
      currentAmount: Number(form.currentAmount),
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
            {goal ? "Edit Goal" : "Add Goal"}
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
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Goal Name</label>
            <input
              className="field"
              placeholder="e.g. Emergency Fund"
              value={form.name}
              onChange={set("name")}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                Target (₹)
              </label>
              <input
                type="number"
                className="field"
                placeholder="0"
                min="0"
                value={form.targetAmount}
                onChange={set("targetAmount")}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                Saved so far (₹)
              </label>
              <input
                type="number"
                className="field"
                placeholder="0"
                min="0"
                value={form.currentAmount}
                onChange={set("currentAmount")}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Deadline</label>
            <input type="date" className="field" value={form.deadline} onChange={set("deadline")} />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {goal ? "Save Changes" : "Add Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalModal;
