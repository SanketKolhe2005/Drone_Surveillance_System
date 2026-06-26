const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg w-64">

      <h3 className="text-gray-400 text-lg">
        {title}
      </h3>

      <h1 className="text-4xl font-bold mt-3 text-cyan-400">
        {value}
      </h1>

    </div>
  );
};

export default StatsCard;