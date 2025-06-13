import SideBar from '../components/sidebar';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/navigation';
import ChatPage from '../pages/ChatPages';
import { useLocation } from 'react-router-dom';

const MainLayout = () => {
    const location = useLocation();
  const hideOnPaths = ['/login', '/signup'];
  const shouldHideChat = hideOnPaths.includes(location.pathname);
  return (
    <div className="flex min-h-screen relative">
    {/* Sidebar */}
    <div className="w-64 bg-gray-800 text-white">
      <SideBar />
    </div>

    {/* Main content */}
    <div className="flex-1 bg-gray-100">
      <Navigation />
      <main className="px-6 py-24">
        <Outlet />
      </main>
    </div>

    {/* ChatPage */}
    {!shouldHideChat && (
      <div className="fixed bottom-6 right-6 z-50">
        <ChatPage />
      </div>
    )}
  </div>
  );
};

export default MainLayout;
