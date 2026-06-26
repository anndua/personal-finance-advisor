const SummaryCard = ({
  title,
  value,
  change
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

      <p className="text-[#1a6b5e] text-sm mt-2">
        {change}
      </p>

    </div>
  );
};

export default SummaryCard;