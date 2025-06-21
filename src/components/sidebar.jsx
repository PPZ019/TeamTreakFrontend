import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Admin from './Navigation/Admin';
import Leader from './Navigation/Leader';
import Employee from './Navigation/Employee';
import Founder from './Navigation/Founder';
import CEO from './Navigation/CEO';
import VP from './Navigation/VP';
import Manager from './Navigation/Manager';
import TeamLeader from './Navigation/TeamLeader';

const SideBar = () => {
  const { user } = useSelector(state => state.authSlice);

  return (
    <div className="w-64 min-h-screen flex flex-col bg-white z-50 fixed">
      <aside className="flex flex-col h-full">
        
        {/* Header */}
        <div className="px-4 pt-4">
          <NavLink
            to="/home"
            className="text-3xl font-bold mb-8 text-blue-900 hover:no-underline"
          >
            TeamTreak
          </NavLink>
        </div>

        {/* Menu */}
        <div className="flex-1 p-4 overflow-y-auto">
  {user.type === 'Admin' ? <Admin />
    : user.type === 'Client' ? <Leader />
    : user.type === 'Employee' ? <Employee />
    : user.type === 'Founder' ? <Founder />
    : user.type === 'CEO' ? <CEO />
    : user.type === 'VP' ? <VP />
    : user.type === 'Manager' ? <Manager />
    : user.type === 'TeamLeader' ? <TeamLeader />
    : <p>Role not recognized</p>}
</div>


        {/* Footer */}
        {/* <div className="p-4 border-t border-[#4D55CC]">
          <a
            href="https://placementplaza.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center px-4 py-2 rounded transition text-white bg-blue-900 hover:bg-[#7A73D1]"
          >
            <i className="fas fa-rocket mr-2"></i> Team Treak
          </a>
        </div> */}

      </aside>
    </div>
  );
};

export default SideBar;
