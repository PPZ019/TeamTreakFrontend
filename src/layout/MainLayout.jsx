import SideBar from '../components/sidebar';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/navigation';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white ">
        <SideBar />
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100">
        <Navigation />
        <main className="px-6 py-24">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
