import { useSelector } from "react-redux";
import LoginForm from "../forms/LoginForm";

function Template({ title, description1, description2 }) {
  const auth = useSelector((state) => state.auth || {});
  const loading = auth.loading;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 py-8 bg-gray-100">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between gap-12 bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl shadow-2xl">
          {/* Left Section - Login */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-50 to-white p-10 rounded-xl shadow-md border">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">{title}</h1>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              <span className="text-blue-700 text-lg font-medium">{description1}</span>{" "}
              <span className="italic text-blue-900 font-semibold">{description2}</span>
            </p>
            <LoginForm />
          </div>

          {/* Right Section - Features */}
          <div className="w-full md:w-1/2 space-y-6">
            {[
              {
                icon: "🤖",
                title: "TeamTreak AI",
                desc: "AI-powered talent matching, automated screening, and smart insights for optimized hiring decisions.",
                button: true,
              },
              {
                icon: "💰",
                title: "Seamless Payroll",
                desc: "Automated payroll with tax compliance, salary slips, and integrated benefits — all in one dashboard.",
              },
              {
                icon: "📊",
                title: "Analytics & Reporting",
                desc: "Get actionable reports and metrics to track performance, engagement, and workforce productivity in real-time.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex hover:shadow-lg transition duration-300"
              >
                <span className="text-3xl mr-4">{item.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-blue-800">{item.title}</h3>
                  <p className="text-gray-700 text-sm mt-1">{item.desc}</p>
                  {item.button && (
                    <button className="mt-3 inline-block bg-blue-900 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
                      Try TeamTreak AI
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Template;
