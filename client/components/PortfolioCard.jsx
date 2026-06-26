import { FaEdit, FaTrash } from "react-icons/fa";

const PortfolioCard = ({ item, onEdit, onDelete }) => {
  const invested = item.quantity * item.buyPrice;
  const current = item.quantity * item.currentPrice;
  const profit = current - invested;
  const profitPercent = ((profit / invested) * 100).toFixed(2);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-lg font-bold">{item.name}</h2>
          <p className="text-xs text-slate-500">{item.type}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => onEdit(item)}>
            <FaEdit className="text-blue-600" />
          </button>

          <button onClick={() => onDelete(item.id)}>
            <FaTrash className="text-red-500" />
          </button>
        </div>

      </div>

      <div className="mt-4 space-y-1 text-sm">

        <p>Invested: ₹{invested}</p>
        <p>Current: ₹{current}</p>

        <p
          className={`font-semibold ${
            profit >= 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {profit >= 0 ? "+" : ""}{profit} ({profitPercent}%)
        </p>

      </div>

    </div>
  );
};

export default PortfolioCard;