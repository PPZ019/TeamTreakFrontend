import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Admin from './Navigation/Admin';
import Leader from './Navigation/Leader';
import Employee from './Navigation/Employee';

const SideBar = () => {
  const { user } = useSelector(state => state.authSlice);

  return (
    <div className="w-64 min-h-screen flex flex-col bg-white z-50 fixed">
      <aside className="flex flex-col h-full">
        
        {/* Header */}
        <div className="px-4 pt-4 ">
          <NavLink to="/home" className="text-3xl font-bold mb-8 text-blue-900 hover:no-underline">
            TeamTreak
          </NavLink>
          {/* <NavLink to="/home" className="block text-sm font-semibold text-[#B5A8D5]">
            TM
          </NavLink> */}
        </div>

        {/* Menu */}
        <div className="flex-1 p-4 overflow-y-auto">
          {user.type === 'Admin' ? <Admin /> : user.type === 'Leader' ? <Leader /> : <Employee />}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#4D55CC]">
          <a
            href="https://placementplaza.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center px-4 py-2 rounded transition text-white bg-blue-900 hover:bg-[#7A73D1]"
          >
            <i className="fas fa-rocket mr-2"></i> Team Treak
          </a>
        </div>

      </aside>
    </div>
  );
};

export default SideBar;
