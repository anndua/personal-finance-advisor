import {
    FaEdit,
    FaTrash
} from "react-icons/fa";

const GoalCard = ({ goal, onEdit, onDelete }) => {

    const percentage =
        Math.min(
            (goal.currentAmount / goal.targetAmount) * 100,
            100
        );

    return (

        <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex justify-between">

                <div>

                    <h2 className="text-xl font-bold">
                        {goal.name}
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Target ₹{goal.targetAmount}
                    </p>

                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() => onEdit(goal)}
                    >
                        <FaEdit className="text-blue-600"/>
                    </button>

                    <button
                        onClick={() => onDelete(goal.id)}
                    >
                        <FaTrash className="text-red-500"/>
                    </button>

                </div>

            </div>

            <div className="mt-6">

                <div className="flex justify-between mb-2">

                    <span>

                        ₹{goal.currentAmount}

                    </span>

                    <span>

                        {percentage.toFixed(0)}%

                    </span>

                </div>

                <div className="bg-slate-200 rounded-full h-3">

                    <div

                        className="bg-[#1a6b5e] h-3 rounded-full"

                        style={{
                            width: `${percentage}%`
                        }}

                    />

                </div>

            </div>

            <p className="text-sm text-slate-500 mt-5">

                Deadline : {goal.deadline}

            </p>

        </div>

    );

}

export default GoalCard;