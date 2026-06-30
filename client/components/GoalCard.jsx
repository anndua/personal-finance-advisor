import { FaEdit, FaTrash } from "react-icons/fa";

const GoalCard = ({ goal, onEdit, onDelete }) => {
  const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const isComplete = percentage >= 100;

  return (
    <div className="card flex flex-col gap-5">
      {/* Header */}
      <div className="flex justify-between items-start gap-2">
        <div>
          <h2 className="font-semibold text-slate-800 text-base leading-tight">
            {goal.name}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Target: ₹{Number(goal.targetAmount).toLocaleString()}
          </p>
        </div>

        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={() => onEdit(goal)}
            className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100
                       flex items-center justify-center transition"
            aria-label="Edit goal"
          >
            <FaEdit size={13} />
          </button>
          <button
            onClick={() => onDelete(goal._id)}
            className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-100
                       flex items-center justify-center transition"
            aria-label="Delete goal"
          >
            <FaTrash size={13} />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-slate-700">
            ₹{Number(goal.currentAmount).toLocaleString()}
          </span>
          <span
            className={`font-semibold ${
              isComplete ? "text-brand-600" : "text-slate-500"
            }`}
          >
            {percentage.toFixed(0)}%
          </span>
        </div>

        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isComplete ? "bg-gold-500" : "bg-brand-600"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {isComplete && (
          <p className="text-xs text-brand-600 font-medium mt-1.5">🎉 Goal reached!</p>
        )}
      </div>

      {/* Footer */}
      <p className="text-xs text-slate-400 border-t border-slate-100 pt-4">
        Deadline: {goal.deadline}
      </p>
    </div>
  );
};

export default GoalCard;
