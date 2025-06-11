import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const colors = ["#10B981", "#EF4444", "#8B5CF6", "#F59E0B"];

const StatCard = ({ title, stats }) => (
  <div className="bg-white rounded-2xl shadow p-4 w-full flex flex-col items-center">
    <h4 className="text-sm font-semibold mb-4">{title}</h4>
    {stats.map(({ label, percent }, i) => {
      const color = colors[i % colors.length];
      return (
        <div key={i} className="flex flex-col items-center space-y-2">
          <div className="w-24 h-24">
            <CircularProgressbar
              value={parseFloat(percent)}
              text={`${percent}%`}
              styles={buildStyles({
                textColor: color,
                pathColor: color,
                trailColor: "#E5E7EB",
                textSize: "16px",
              })}
            />
          </div>
          <span className="text-xs text-gray-600">{label}</span>
        </div>
      );
    })}
  </div>
);

export default StatCard;
