
const SummaryCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded shadow flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
    <div className="text-3xl text-blue-950">{icon}</div>
  </div>
);

export default SummaryCard;