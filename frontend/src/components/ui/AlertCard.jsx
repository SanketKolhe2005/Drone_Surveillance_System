const AlertCard = ({ title, message, color }) => {
  return (
    <div
      className="p-5 rounded-2xl text-white shadow-lg"
      style={{ background: color }}
    >
      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p className="mt-2">
        {message}
      </p>
    </div>
  );
};

export default AlertCard;