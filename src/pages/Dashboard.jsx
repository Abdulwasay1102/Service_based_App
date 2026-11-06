import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getMyRequests } from "../api/request";
import RequestCard from "../components/RequestCard";
import Navbar from "../components/Navbar";
import { getRole } from "../utils/getRole";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyRequests()
      .then((res) => setRequests(res.data))
      .catch((err) =>
        setError(
          err.response?.data?.message || "Could not load requests"
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (getRole() === "admin") return <Navigate to="/admin" replace />;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            {/* Heading */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-200">
                  Customer Dashboard
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                My Service Requests
              </h1>

              <p className="mt-2 max-w-xl text-sm text-slate-300 sm:text-base">
                Track your home service requests and check their current
                status.
              </p>
            </div>

            {/* New Request Button */}
            <Link
              to="/create-request"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-lg">
                +
              </span>
              New Request
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Stats */}
        {!loading && !error && (
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414A1 1 0 0118 8.414V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Requests
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {requests.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                  <svg
                    className="h-6 w-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Resolved
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {requests.filter((r) => r.status === "RESOLVED").length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-medium text-red-700">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-5 w-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {error}
          </div>
        )}

        {/* Section Heading */}
        {!loading && requests.length > 0 && (
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Your Requests
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                View and track your submitted service requests.
              </p>
            </div>

            <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 sm:block">
              {requests.length}{" "}
              {requests.length === 1 ? "Request" : "Requests"}
            </span>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

              <p className="text-sm font-medium text-slate-500">
                Loading your requests...
              </p>
            </div>
          </div>
        ) : requests.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
              <svg
                className="h-8 w-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414A1 1 0 0118 8.414V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
              No service requests yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              You haven't submitted any service requests. Create your first
              request and we'll help get your problem solved.
            </p>

            <Link
              to="/create-request"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
            >
              <span className="text-lg">+</span>
              Create Your First Request
            </Link>
          </div>
        ) : (
          /* Requests */
          <div className="space-y-5">
            {requests.map((r) => (
              <div
                key={r._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <RequestCard request={r} />
              </div>
            ))}
          </div>
        )}

        {/* Change Password */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/change-password"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-5a2 2 0 00-2-2H6a2 2 0 00-2 2v5a2 2 0 002 2zm10-9V7a4 4 0 00-8 0v3h8z"
              />
            </svg>
            Change Password
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;