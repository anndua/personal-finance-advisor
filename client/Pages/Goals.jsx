import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import GoalCard from "../components/GoalCard";
import GoalModal from "../components/GoalModal";
import { goalAPI } from "../Services/api";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const res = await goalAPI.getAll();
      setGoals(res.data);
    } catch {
      toast.error("Cannot load goals");
    }
  };

  const saveGoal = async (goal) => {
    try {
      if (editing) {
        await goalAPI.update(editing._id, goal);
        toast.success("Goal updated");
      } else {
        await goalAPI.create(goal);
        toast.success("Goal added");
      }
      setModal(false);
      setEditing(null);
      loadGoals();
    } catch {
      toast.error("Operation failed");
    }
  };

  const deleteGoal = async (id) => {
    if (!window.confirm("Delete this goal?")) return;
    await goalAPI.delete(id);
    toast.success("Goal deleted");
    loadGoals();
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Financial Goals</h1>
          <p className="text-slate-500 text-sm mt-1">
            {goals.length} goal{goals.length !== 1 ? "s" : ""} set
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModal(true);
          }}
          className="btn-primary"
        >
          <FaPlus size={12} />
          Add Goal
        </button>
      </div>

      {/* Goal cards */}
      {goals.length === 0 ? (
        <div className="card text-center py-16 text-slate-400">
          <p className="text-lg font-medium mb-1">No goals yet</p>
          <p className="text-sm">Add your first financial goal to get started.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <GoalCard
              key={goal._id}
              goal={goal}
              onEdit={(g) => {
                setEditing(g);
                setModal(true);
              }}
              onDelete={deleteGoal}
            />
          ))}
        </div>
      )}

      <GoalModal
        isOpen={modal}
        goal={editing}
        onClose={() => {
          setModal(false);
          setEditing(null);
        }}
        onSave={saveGoal}
      />
    </MainLayout>
  );
};

export default Goals;
