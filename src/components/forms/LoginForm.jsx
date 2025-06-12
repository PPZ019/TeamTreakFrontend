import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { doLogin } from "../../http";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/auth-slice";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate()

  const togglePassword = () => setShowPassword(!showPassword);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) return toast.error("All fields are required");

    try {
      const res = await doLogin({ email, password });
      if (res.success) {
        dispatch(setAuth(res.user));
        toast.success("Login successful");
         console.log("Navigating to /home"); // ✅ Debug line
  navigate("/home");

      } else {
        toast.error(res.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md mx-auto animate-fade-in">
  
      <h2 className="text-3xl font-extrabold text-blue-900 mb-6 text-center tracking-tight">
        Team Treak
      </h2>
      <p className="text-m text-black text-center mb-8">
       We provide top-tier talent, and a perfect fit for your Business needs.
      </p>

      {/* Login Form */}
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={inputEvent}
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={inputEvent}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none "
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-2 text-gray-500 hover:text-blue-900 text-xl  focus:outline-none"
            >
              {showPassword ?<AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
          <div className="text-right mt-1">
            <NavLink to="/forgot" className="text-sm text-blue-700 hover:underline">
              Forgot Password?
            </NavLink>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
        >
          Login
        </button>
      </form>
      {/* Social Media Handles */}
<div className="mt-10 text-center">
  <p className="text-black text-sm mb-4">Connect with us</p>
  <div className="flex justify-center space-x-5">
    <a
      href="https://www.facebook.com/yourpage"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 transition"
      title="Facebook"
    >
      <i className="fab fa-facebook-f text-2xl"></i>
    </a>
    <a
      href="https://www.linkedin.com/in/yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-700 hover:text-blue-900 transition"
      title="LinkedIn"
    >
      <i className="fab fa-linkedin-in text-2xl"></i>
    </a>
    <a
      href="https://twitter.com/yourhandle"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-600 transition"
      title="Twitter"
    >
      <i className="fab fa-twitter text-2xl"></i>
    </a>
    <a
      href="https://www.instagram.com/yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      className="text-pink-500 hover:text-pink-700 transition"
      title="Instagram"
    >
      <i className="fab fa-instagram text-2xl"></i>
    </a>
  </div>
</div>

    </div>
  );
};

export default LoginForm;
