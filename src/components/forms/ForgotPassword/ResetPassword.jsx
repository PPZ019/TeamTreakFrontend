import { useState } from "react";
import { useSelector } from "react-redux";
import { resetPassword } from "../../../http/index";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const ResetPassword = () => {
  const { email } = useSelector((state) => state.authSlice);
  const history = useHistory();

  const [formData, setFormData] = useState({
    email,
    otp: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!formData.otp) return toast.error("Please enter OTP");
    setShowPassword(true); // Just show password input now
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const { email, otp, password } = formData;

    if (!email || !otp || !password) return toast.error("All fields required");

    setLoading(true);
    const res = await resetPassword({ email, otp, password });
    setLoading(false);

    if (res.success) {
      toast.success(res.message);
      history.push("/login");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-xl bg-white border-2 border-[#211C84] rounded-3xl px-10 py-12 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-[#211C84] tracking-wide">Team Treak</h1>
          <p className="mt-2 text-base text-gray-600">
            Enter the OTP sent to your email. Then proceed to reset your password.
          </p>
        </div>

        <form onSubmit={showPassword ? handlePasswordReset : handleOtpSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* OTP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
            <input
              type="number"
              name="otp"
              value={formData.otp}
              onChange={inputEvent}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#211C84]"
              required
            />
          </div>

          {/* OTP Submit Button */}
          {!showPassword && (
            <button
              type="submit"
              className="w-full bg-[#211C84] hover:bg-[#372fc9] text-white font-semibold py-3 rounded-lg text-lg transition duration-300 shadow-md"
            >
              Proceed to Reset Password
            </button>
          )}

          {/* Password */}
          {showPassword && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={inputEvent}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#211C84]"
                required
              />
            </div>
          )}

          {/* Final Reset Button */}
          {showPassword && (
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#211C84] hover:bg-[#372fc9] text-white font-semibold py-3 rounded-lg text-lg transition duration-300 shadow-md"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

