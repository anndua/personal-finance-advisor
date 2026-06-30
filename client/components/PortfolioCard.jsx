import { FaEdit, FaTrash } from "react-icons/fa";

const typeColors = {
  Stock:        "bg-brand-100 text-brand-700",
  Crypto:       "bg-purple-100 text-purple-600",
  "Mutual Fund":"bg-blue-100 text-blue-600",
  Gold:         "bg-gold-400/20 text-gold-600",
};

const PortfolioCard = ({ item, onEdit, onDelete }) => {
  const invested = item.quantity * item.buyPrice;
  const current = item.quantity * item.currentPrice;
  const profit = current - invested;
  const profitPercent = invested > 0 ? ((profit / invested) * 100).toFixed(2) : 0;
  const isPositive = profit >= 0;

  return (
    <div className="card flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-start gap-2">
        <div>
          <h2 className="font-semibold text-slate-800 text-base">{item.name}</h2>
          <span className={`badge mt-1 ${typeColors[item.type] ?? "bg-slate-100 text-slate-600"}`}>
            {item.type}
          </span>
        </div>

        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={() => onEdit(item)}
            className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100
                       flex items-center justify-center transition"
            aria-label="Edit"
          >
            <FaEdit size={13} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-100
                       flex items-center justify-center transition"
            aria-label="Delete"
          >
            <FaTrash size={13} />
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Qty</span>
          <span className="font-medium text-slate-700">{item.quantity}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Invested</span>
          <span className="font-medium text-slate-700">₹{invested.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Current</span>
          <span className="font-medium text-slate-700">₹{current.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-slate-500 pt-1 border-t border-slate-100">
          <span>P&amp;L</span>
          <span className={`font-bold ${isPositive ? "text-brand-600" : "text-red-500"}`}>
            {isPositive ? "+" : ""}₹{profit.toLocaleString()} ({profitPercent}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
