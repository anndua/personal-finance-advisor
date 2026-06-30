import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseModal from "../components/ExpenseModal";
import { expenseAPI } from "../Services/api";
import toast from "react-hot-toast";
import { FaPlus, FaSearch } from "react-icons/fa";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const res = await expenseAPI.getAll();
      setExpenses(res.data);
    } catch {
      toast.error("Failed to load expenses");
    }
  };

  const handleSave = async (expense) => {
    try {
      if (editingExpense) {
        await expenseAPI.update(editingExpense._id, expense);
        toast.success("Expense updated");
      } else {
        await expenseAPI.create(expense);
        toast.success("Expense added");
      }
      loadExpenses();
      setModalOpen(false);
      setEditingExpense(null);
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await expenseAPI.delete(id);
      toast.success("Expense deleted");
      loadExpenses();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filtered = expenses.filter((e) =>
    (e.title || e.description || "").toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingExpense(null);
    setModalOpen(true);
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Expenses</h1>
          <p className="text-slate-500 text-sm mt-1">
            {expenses.length} expense{expenses.length !== 1 ? "s" : ""} recorded
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <FaPlus size={12} />
          Add Expense
        </button>
      </div>

      {/* Search */}
      <div className="card mb-6 py-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="field pl-9"
          />
        </div>
      </div>

      <ExpenseTable
        expenses={filtered}
        onEdit={(expense) => {
          setEditingExpense(expense);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <ExpenseModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingExpense(null);
        }}
        onSave={handleSave}
        expense={editingExpense}
      />
    </MainLayout>
  );
};

export default Expenses;
