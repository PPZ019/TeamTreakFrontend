import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getCounts } from "../../http";
import { setCount } from "../../store/main-slice";
import StatCard from "./StatCard";
import CardSummary from "./CardSummary";
import { Pie, Bar } from "react-chartjs-2";
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

  const [filterRange, setFilterRange] = useState("month");

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

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(`http://localhost:5500/api/invoice/invoiceSummary?range=${filterRange}`);
        const data = await response.json();
        if (data.success) {
          const {
            totalPaid,
            totalUnpaid,
            totalInvoices,
            previousPaid = 0,
            previousUnpaid = 0,
            previousInvoices = 0,
            pendingInvoices = 0, 
          } = data.result;

          setSummary({
            totalPaid,
            totalUnpaid,
            totalInvoices,
            previousPaid,
            previousUnpaid,
            previousInvoices,
            pendingInvoices, // ✅ Add this
          });
        }
      } catch (error) {
        console.error("Error fetching invoice summary:", error);
      }
    };
    fetchSummary();
  }, [filterRange]);


const barData = {
  labels: ["Paid", "Unpaid",],
  datasets: [
    {
      label: "Invoice Summary",
      data: [
        summary.totalPaid,
        summary.totalUnpaid,
        summary.pendingInvoices || 0,
      ],
      backgroundColor: ["#34d399", "#f87171", "#FBBF24"],
      borderColor: "#fff",
      borderWidth: 1,
    },
  ],
};

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

  const pieData = {
    labels: ["Paid", "Unpaid"],
    datasets: [
      {
        data: [paidValue, unpaidValue], 
        backgroundColor: ["#34d399", "#f87171"],        
        borderColor: "#fff",
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };
  
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#374151",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = summary.totalPaid + summary.totalUnpaid;
            const value = context.raw;
            const label = context.label;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ₹${value} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: "#000",
        font: {
          size: 12,
          weight: "bold",
        },
        formatter: (value, context) => {
          if (value <= 0.001) return '';
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
      },
    },
  
    // ✅ Correct placement here
    elements: {
      arc: {
        borderAlign: "inner",
        spacing: 0,
      },
    },
  };
  

  return (
    <div className="space-y-8 pb-4">
      <div className="flex justify-end">
        <select
          value={filterRange}
          onChange={(e) => setFilterRange(e.target.value)}
          className="text-sm border border-gray-300 rounded-xl px-3 py-3"
        >
          <option value="today">Today</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select>
      </div>

      {/* Invoice Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardSummary title="Total Invoices" value={summary.totalInvoices} previousValue={summary.previousInvoices} filterRange={filterRange} color="purple" />
        <CardSummary title="Total Paid" value={summary.totalPaid.toFixed(2)} previousValue={summary.previousPaid} filterRange={filterRange} color="green" />
        <CardSummary title="Unpaid Amount" value={summary.totalUnpaid.toFixed(2)} previousValue={summary.previousUnpaid} filterRange={filterRange} color="red" />
        <CardSummary title="Pending Invoices" value={summary.pendingInvoices} previousValue={0} filterRange={filterRange} color="purple" />

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
  {/* Bar Chart: spans 3 columns */}
  <div className="col-span-1 lg:col-span-3 bg-white rounded-xl shadow-md p-4 flex flex-col justify-center overflow-hidden">
    <div className="w-full flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-gray-700">Invoice Summary (Bar)</h3>
    </div>
    <div className="w-full mx-auto">
      <Bar data={barData} options={barOptions} />
    </div>
  </div>

  {/* Pie Chart: spans 1 column */}
  <div className="col-span-1 bg-white rounded-xl shadow-md p-4 flex flex-col justify-center items-center overflow-hidden">
    <div className="w-full flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-gray-700">Paid vs Unpaid</h3>
    </div>
    <div className="w-full max-w-xs mx-auto">
      <Pie data={pieData} options={pieOptions} />
    </div>
  </div>
</div>



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
