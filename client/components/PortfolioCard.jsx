import { FaEdit, FaTrash } from "react-icons/fa";

const typeColors = {
  Stock:          "bg-brand-100 text-brand-700",
  Crypto:         "bg-purple-100 text-purple-600",
  "Mutual Fund":  "bg-blue-100 text-blue-600",
  Gold:           "bg-gold-400/20 text-gold-600",
  "Real Estate":  "bg-orange-100 text-orange-600",
  Bond:           "bg-cyan-100 text-cyan-700",
  FD:             "bg-pink-100 text-pink-600",
};

const PortfolioCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="card flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-start gap-2">
        <div>
          <h2 className="font-semibold text-slate-800 text-base">{item.asset_name}</h2>
          <span
            className={`badge mt-1 ${
              typeColors[item.asset_type] ?? "bg-slate-100 text-slate-600"
            }`}
          >
            {item.asset_type}
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
            onClick={() => onDelete(item._id)}
            className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-100
                       flex items-center justify-center transition"
            aria-label="Delete"
          >
            <FaTrash size={13} />
          </button>
        </div>
      </div>

      {/* Value */}
      <div className="border-t border-slate-100 pt-4 text-sm">
        <div className="flex justify-between items-center text-slate-500">
          <span>Invested Amount</span>
          <span className="font-bold text-slate-800 text-base">
            ₹{Number(item.amount).toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
