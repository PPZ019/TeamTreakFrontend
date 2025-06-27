import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getCounts } from "../../http";
import { setCount } from "../../store/main-slice";
import StatCard from "./StatCard";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  BarElement, } from "chart.js";


  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    ChartDataLabels
  );


ChartJS.register(ArcElement, Tooltip, Legend);

const Admin = () => {
  const dispatch = useDispatch();

  const [summary, setSummary] = useState({
    totalPaid: 0,
    totalUnpaid: 0,
    totalInvoices: 0,
  });


  const counts = useSelector((state) => state.mainSlice.counts) || {};
  const { admin = 0, employee = 0, leader = 0, team = 0 } = counts;
  const totalUsers = admin + employee + leader + team || 1;

  const statData = [
    { title: "Total Employees", label: "Employee", count: employee },
    { title: "Total Leaders", label: "Leader", count: leader },
    { title: "Total Admins", label: "Admin", count: admin },
    { title: "Total Teams", label: "Team", count: team },
  ];

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await getCounts();
        if (res.success) {
          dispatch(setCount(res.data));
        }
      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    };
    fetchCounts();
  }, [dispatch]);






const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => `₹${context.raw}`,
      },
    },
    datalabels: {
      anchor: "end",
      align: "top",
      formatter: (value) => `₹${value}`,
      font: {
        weight: "bold",
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => `₹${value}`,
      },
    },
  },
};

  
  const paidValue = summary.totalPaid === 0 ? 0.001 : summary.totalPaid;
  const unpaidValue = summary.totalUnpaid === 0 ? 0.001 : summary.totalUnpaid;
  console.log(paidValue, unpaidValue)


  return (
    <div className="space-y-8 pb-4">




      {/* Team/User Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            stats={[
              {
                label: stat.label,
                percent: ((stat.count / totalUsers) * 100).toFixed(1),
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
};

export default Admin;
