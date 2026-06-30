const SummaryCard = ({ title, value, change, icon, positive }) => {
  const isPositive = positive !== false && !String(change).startsWith("-");

  return (
    <div className="card flex items-start justify-between gap-4">
      {/* Text */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
          {title}
        </p>
        <h2 className="text-2xl font-bold text-slate-800 leading-none">{value}</h2>
        <p
          className={`text-sm font-medium mt-2 ${
            isPositive ? "text-brand-600" : "text-red-500"
          }`}
        >
          {change}
        </p>
      </div>

      {/* Icon bubble */}
      {icon && (
        <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-lg shrink-0">
          {icon}
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
