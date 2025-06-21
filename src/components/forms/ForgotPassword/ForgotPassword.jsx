import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEmail } from "../../../store/auth-slice";
import { forgotPassword } from "../../../http";
import { toast } from "react-toastify";

const ForgotPassword = ({ onNext }) => {
  const dispatch = useDispatch();
  const storeEmail = useSelector((state) => state.authSlice.email);
  const [emailAddress, setEmailAddress] = useState(storeEmail);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!emailAddress) return;

    const res = await forgotPassword({ email: emailAddress });
    if (res.success) {
      toast.success(res.message);
      dispatch(setEmail(emailAddress));
      onNext();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 sm:p-8">
      <div className="w-full max-w-xl bg-white border-2 border-[#211C84] rounded-3xl  px-10 py-12 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-[#211C84] tracking-wide">Team Treak</h1>
          <p className="mt-3 text-base text-gray-600">
            Enter your registered email. We’ll send you an OTP to reset your password.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#211C84]"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#211C84] hover:bg-[#3b33b9] text-white font-semibold py-3 rounded-lg text-lg transition duration-300 shadow-md"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
