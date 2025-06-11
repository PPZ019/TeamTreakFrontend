import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCounts } from "../../http";
import { setCount } from "../../store/main-slice";
import StatCard from './StatCard';
import CardSummary from './CardSummary';

const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await getCounts();
      if (res.success) dispatch(setCount(res.data));
    })();
  }, [dispatch]);

  const counts = useSelector((state) => state.mainSlice.counts) || {};
  const { admin = 0, employee = 0, leader = 0, team = 0 } = counts;

  const total = admin + employee + leader + team || 1;

  const statData = [
    { title: "Total Employee", label: "Employee", count: employee },
    { title: "Total Leader", label: "Leader", count: leader },
    { title: "Total Admin", label: "Admin", count: admin },
    { title: "Total Team", label: "Team", count: team },
  ];

  return (
    <div className="space-y-8">
      {/* CardSummary row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardSummary title="Invoices" value="₹00.00" color="green" />
        <CardSummary title="Quotes For Customers" value="₹00.00" color="purple" />
        <CardSummary title="Quotes For Leads" value="₹00.00" color="green" />
        <CardSummary title="Unpaid" value="₹00.00" color="red" />
      </div>

      {/* StatCard row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statData.map((stat, i) => (
          <StatCard
            key={i}
            title={stat.title}
            stats={[{ label: stat.label, percent: ((stat.count / total) * 100).toFixed(1) }]}
          />
        ))}
      </div>
    </div>
  );
};

export default Admin;
