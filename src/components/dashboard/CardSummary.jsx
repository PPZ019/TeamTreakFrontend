const CardSummary = ({ title, value, color }) => {
    const colorClass = {
      green: 'text-green-600',
      red: 'text-red-600',
      purple: 'text-purple-600',
    }[color] || 'text-gray-800'; // fallback color
  
    return (
      <div className="bg-white rounded-lg shadow p-4 w-full sm:w-60">
        <div className="text-sm text-gray-500">{title}</div>
        <div className={`text-lg font-semibold ${colorClass}`}>{value}</div>
      </div>
    );
  };
  
  export default CardSummary;
  