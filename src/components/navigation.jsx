import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { dLogout } from "../http/index";
import { setAuth } from "../store/auth-slice";
import { useState, useEffect, useRef } from "react";
import image1 from '../assets/employee.png'

const Navigation = () => {
  const { name, image } = useSelector((state) => state.authSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logout = async () => {
    await dLogout();
    dispatch(setAuth(null));
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white px-4 py-4 flex justify-between items-center text-black top-0 left-0 right-0 fixed z-50">

      <div className="text-lg font-semibold blue-900">
        <NavLink to="/home" className="text-3xl font-bold mb-8 text-blue-900 hover:no-underline">
          TeamTreak
        </NavLink>
      </div>
      <div className="flex items-center gap-4">

        {/* Select Dropdowns */}
        {/* <select className="border-2 border-blue-900 rounded-lg p-2 text-sm text-blue-900">
          <option>Main</option>
          <option>Add..</option>
        </select>
        <select className="border-2 border-blue-900 rounded-lg p-2 text-sm text-blue-900">
          <option>INR</option>
        </select>
        <select className="border-2 border-blue-900 rounded-lg p-2 text-sm text-blue-900">
          <option>English</option>
        </select> */}

        {/* Notifications */}
        {/* <div className="relative group">
          <button className="relative focus:outline-none">
            <i className="far fa-bell text-xl hover:text-[#4D55CC]"></i>
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
          </button>

          <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-md hidden group-hover:block z-50">
            <div className="p-4 border-b font-semibold flex justify-between">
              Notifications
              <NavLink to="/" className="text-sm text-[#4D55CC] hover:underline">
                Mark All As Read
              </NavLink>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {[
                { icon: "fas fa-code", bg: "bg-[#4D55CC]", text: "Template update is available now!", time: "2 Min Ago" },
                { icon: "far fa-user", bg: "bg-[#7A73D1]", text: "You and Dedik Sugiharto are now friends", time: "10 Hours Ago" },
                { icon: "fas fa-check", bg: "bg-green-600", text: "Kusnaedi moved Fix bug header to Done", time: "12 Hours Ago" },
                { icon: "fas fa-exclamation-triangle", bg: "bg-red-500", text: "Low disk space. Clean it!", time: "17 Hours Ago" },
                { icon: "fas fa-bell", bg: "bg-[#7A73D1]", text: "Welcome to Stisla template!", time: "Yesterday" },
              ].map((notif, idx) => (
                <div key={idx} className="flex items-start gap-3 px-4 py-2 hover:bg-gray-100">
                  <div className={`w-10 h-10 flex items-center justify-center text-white rounded-full ${notif.bg}`}>
                    <i className={notif.icon}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{notif.text}</p>
                    <p className="text-xs text-[#4D55CC]">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 text-center text-sm border-t">
              <NavLink to="/" className="text-[#4D55CC] hover:underline">
                View All <i className="fas fa-chevron-right ml-1"></i>
              </NavLink>
            </div>
          </div>
        </div> */}

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 focus:outline-none hover:text-[#4D55CC]"
          >
            <img
              src={image || image1}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />

          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-gray-100">
              <div className="px-4 py-2 text-sm text-gray-500 bg-gray-50">Logged in 5 min ago</div>
              <NavLink
                to="/profile"
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:no-underline hover:text-[#4D55CC]"
              >
                <i className="far fa-user mr-2 text-[#4D55CC]"></i> Profile
              </NavLink>
              <NavLink
                to="/activities"
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:no-underline hover:text-[#4D55CC]"
              >
                <i className="fas fa-bolt mr-2 text-[#4D55CC]"></i> Activities
              </NavLink>
              <NavLink
                to="/settings"
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:no-underline hover:text-[#4D55CC]"
              >
                <i className="fas fa-cog mr-2 text-[#4D55CC]"></i> Settings
              </NavLink>
              <div className="border-t"></div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:no-underline hover:bg-gray-100"
              >
                <i className="fas fa-sign-out-alt mr-2"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
