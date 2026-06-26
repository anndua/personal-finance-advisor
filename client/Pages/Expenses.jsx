import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseModal from "../components/ExpenseModal";

import {
  expenseAPI,
} from "../services/api";

import toast from "react-hot-toast";

const Expenses = () => {
  const [expenses, setExpenses] =
    useState([]);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingExpense,
    setEditingExpense] =
    useState(null);

  const [search,
    setSearch] = useState("");

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const res =
        await expenseAPI.getAll();

      setExpenses(res.data);
    } catch {
      toast.error(
        "Failed to load expenses"
      );
    }
  };

  const handleSave = async (
    expense
  ) => {
    try {

      if (editingExpense) {

        await expenseAPI.update(
          editingExpense.id,
          expense
        );

        toast.success(
          "Expense updated"
        );

      } else {

        await expenseAPI.create(
          expense
        );

        toast.success(
          "Expense added"
        );
      }

      loadExpenses();

      setModalOpen(false);

      setEditingExpense(null);

    } catch {
      toast.error(
        "Operation failed"
      );
    }
  };

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete expense?"
        )
      )
        return;

      try {

        await expenseAPI.delete(id);

        toast.success(
          "Expense deleted"
        );

        loadExpenses();

      } catch {
        toast.error(
          "Delete failed"
        );
      }
    };

  const filteredExpenses =
    expenses.filter((item) =>
      item.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Expenses
        </h1>

        <button
          onClick={() => {
            setEditingExpense(
              null
            );

            setModalOpen(true);
          }}
          className="bg-[#1a6b5e] text-white px-5 py-3 rounded-xl"
        >
          + Add Expense
        </button>

      </div>

      <div className="bg-white p-4 rounded-2xl mb-6">

        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl"
        />

      </div>

      <ExpenseTable
        expenses={
          filteredExpenses
        }
        onEdit={(expense) => {
          setEditingExpense(
            expense
          );

          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <ExpenseModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);

          setEditingExpense(
            null
          );
        }}
        onSave={handleSave}
        expense={editingExpense}
      />

    </MainLayout>
  );
};

export default Expenses;