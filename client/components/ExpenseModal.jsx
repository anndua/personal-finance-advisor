import { useEffect, useState } from "react";

const ExpenseModal = ({
  isOpen,
  onClose,
  onSave,
  expense,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Food",
    amount: "",
    date: "",
    notes: "",
  });

  useEffect(() => {
    if (expense) {
      setFormData(expense);
    } else {
      setFormData({
        title: "",
        category: "Food",
        amount: "",
        date: "",
        notes: "",
      });
    }
  }, [expense]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      amount: Number(formData.amount),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6">
          {expense ? "Edit Expense" : "Add Expense"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Expense Name"
            className="w-full border rounded-xl p-3 mb-4"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            required
          />

          <select
            className="w-full border rounded-xl p-3 mb-4"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Bills</option>
            <option>Shopping</option>
            <option>Others</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            className="w-full border rounded-xl p-3 mb-4"
            value={formData.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: e.target.value,
              })
            }
            required
          />

          <input
            type="date"
            className="w-full border rounded-xl p-3 mb-4"
            value={formData.date}
            onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target.value,
              })
            }
          />

          <textarea
            rows="4"
            placeholder="Notes"
            className="w-full border rounded-xl p-3 mb-6"
            value={formData.notes}
            onChange={(e) =>
              setFormData({
                ...formData,
                notes: e.target.value,
              })
            }
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#1a6b5e] text-white"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ExpenseModal;