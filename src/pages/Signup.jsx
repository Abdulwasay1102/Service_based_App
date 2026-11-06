
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth";

const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) return setError("Email and password are required");
    try {
      await signupUser(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Could not reach the server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10">

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-9 h-9 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10.5L12 3l9 7.5M5 9v11h14V9M9 20v-6h6v6"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Service<span className="text-indigo-400">Hub</span>
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            Get your home problems solved.
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-7 sm:p-9">

          <div className="mb-7">
            <h2 className="text-2xl font-bold text-white">
              Create an Account
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Join ServiceHub and get started today.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
              <span>⚠</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Email Address
              </label>

              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                  />
                </svg>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder-slate-500 outline-none transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Password
              </label>

              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4"
                  />
                </svg>

                <input
                  type="password"
                  placeholder="Password (min 6 characters)"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder-slate-500 outline-none transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-500"
                />
              </div>

              <p className="text-xs text-slate-500">
                Password must contain at least 6 characters.
              </p>
            </div>

            {/* Submit */}
            <button
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-200 cursor-pointer"
              type="submit"
            >
              Create Account →
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-7 pt-6 border-t border-slate-700/70 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                Login
              </Link>
            </p>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-xs mt-6">
          © ServiceHub. All rights reserved.
        </p>

      </div>
    </div>
  );
};

export default Signup;
