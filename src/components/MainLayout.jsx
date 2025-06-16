import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="app-layout">
      {/* Sidebar and Navbar can go here */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
