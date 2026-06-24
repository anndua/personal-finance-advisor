import {
  FaEdit,
  FaTrash
} from "react-icons/fa";

const ExpenseTable = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-50">
          <tr>
            <th className="text-left p-4">
              Title
            </th>
            <th className="text-left p-4">
              Category
            </th>
            <th className="text-left p-4">
              Amount
            </th>
            <th className="text-left p-4">
              Date
            </th>
            <th className="text-center p-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-t"
            >
              <td className="p-4">
                {expense.title}
              </td>

              <td className="p-4">
                {expense.category}
              </td>

              <td className="p-4">
                ₹{expense.amount}
              </td>

              <td className="p-4">
                {expense.date}
              </td>

              <td className="p-4 flex justify-center gap-3">

                <button
                  onClick={() =>
                    onEdit(expense)
                  }
                  className="text-blue-600"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() =>
                    onDelete(expense.id)
                  }
                  className="text-red-500"
                >
                  <FaTrash />
                </button>

              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ExpenseTable;