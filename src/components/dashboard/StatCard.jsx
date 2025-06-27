import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FiBarChart2 } from "react-icons/fi";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#1e3a8a", "#d8b4fe", "#818cf8", "#a78bfa"];

const StatCard = ({ title, stats }) => {
  const totalPercent = stats.reduce((sum, s) => sum + parseFloat(s.percent), 0);
  const filledStats = [...stats];

  if (totalPercent < 100) {
    filledStats.push({
      label: "Others",
      percent: (100 - totalPercent).toFixed(1),
    });
  }

  const data = {
    labels: filledStats.map((s) => s.label),
    datasets: [
      {
        data: filledStats.map((s) => parseFloat(s.percent)),
        backgroundColor: COLORS,
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full flex flex-col items-center">
      {/* Title with Icon */}
      <div className="flex items-center gap-2 text-sm font-semibold mb-4 text-gray-800">
        <FiBarChart2 className="text-purple-600 text-base" />
        <span>{title}</span>
      </div>

      {/* Pie Chart */}
      <div className="w-full h-60">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};


export default StatCard;
