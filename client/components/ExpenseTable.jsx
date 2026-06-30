import { FaEdit, FaTrash } from "react-icons/fa";

const categoryColors = {
  Food:     "bg-brand-100 text-brand-700",
  Travel:   "bg-blue-100 text-blue-600",
  Bills:    "bg-gold-400/20 text-gold-600",
  Shopping: "bg-purple-100 text-purple-600",
  Others:   "bg-slate-100 text-slate-600",
};

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="card text-center py-16 text-slate-400">
        <p className="text-lg font-medium mb-1">No expenses found</p>
        <p className="text-sm">Try a different search or add a new expense.</p>
      </div>
    );
  }

  return (
    <div className="card p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Title
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Category
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Amount
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Date
              </th>
              <th className="text-center px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {expenses.map((expense) => (
              <tr
                key={expense._id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-5 py-4 font-medium text-slate-700">
                  {expense.title}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`badge ${
                      categoryColors[expense.category] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {expense.category}
                  </span>
                </td>
                <td className="px-5 py-4 font-semibold text-slate-800">
                  ₹{Number(expense.amount).toLocaleString()}
                </td>
                <td className="px-5 py-4 text-slate-400">{expense.date}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100
                                 flex items-center justify-center transition"
                      aria-label="Edit"
                    >
                      <FaEdit size={13} />
                    </button>
                    <button
                      onClick={() => onDelete(expense._id)}
                      className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-100
                                 flex items-center justify-center transition"
                      aria-label="Delete"
                    >
                      <FaTrash size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
