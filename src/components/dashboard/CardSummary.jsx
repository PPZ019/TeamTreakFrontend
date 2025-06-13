import CountUp from "react-countup";
import { FiBarChart2 } from "react-icons/fi"; // Optional icon, can be customized

const CardSummary = ({ title, value, color, filterRange }) => {
  const colorMap = {
    green: {
      text: "text-green-600",
      bg: "bg-green-100",
      ring: "ring-green-300",
      dot: "bg-green-500"
    },
    red: {
      text: "text-red-600",
      bg: "bg-red-100",
      ring: "ring-red-300",
      dot: "bg-red-500"
    },
    purple: {
      text: "text-purple-600",
      bg: "bg-purple-100",
      ring: "ring-purple-300",
      dot: "bg-purple-500"
    },
  };

  const colorClass = colorMap[color] || {
    text: "text-gray-800",
    bg: "bg-gray-100",
    ring: "ring-gray-300",
    dot: "bg-gray-400"
  };

  

  return (
    <div
      className={`bg-white rounded-xl shadow-md py-6 px-4 w-full transition-transform duration-200 hover:scale-[1.02] hover:ring-2 ${colorClass.ring}`}
    >
      <div className="flex flex-col gap-4">
        
        {/* Title with icon */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <FiBarChart2 className="text-gray-400" />
            {title}
          </h3>
          <div className={`h-3 w-3 rounded-full ${colorClass.dot}`}></div>
        </div>

        {/* Animated Value */}
        <div className="flex justify-between items-center">
        <div className={`text-2xl font-bold ${colorClass.text}`}>
          {typeof value === "string" ? (
          <CountUp end={value} duration={1.2} separator="," prefix="₹" />
          ) : (
            value
          )}
        </div>
        <div className="text-right">
  <span
    className="capitalize text-xs text-purple-800 bg-purple-100 rounded-xl py-2 px-3 font-medium"
    title={`Showing data for ${filterRange}`}
  >
    {filterRange === "month"
      ? "Last Month"
      : filterRange === "week"
      ? "Last Week"
      : "Today"}
  </span>
</div></div>

        {/* Colored divider */}
        <div className={`h-1 w-14 rounded-full ${colorClass.bg}`}></div>

        {/* Filter range badge */}


      </div>
    </div>
  );
};

export default CardSummary;
