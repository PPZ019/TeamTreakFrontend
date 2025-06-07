import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCounts } from "../../http";
import { setCount } from "../../store/main-slice";
import CountsCard from './CountsCard';

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

  return (
    <div className="row">
      <CountsCard title="Total Employee" icon="fa-user" count={employee} />
      <CountsCard title="Total Leader" icon="fa-user-tie" count={leader} />
      <CountsCard title="Total Admin" icon="fa-user-cog" count={admin} />
      <CountsCard title="Total Team" icon="fa-users" count={team} />
    </div>
  );
};

export default Admin;
