import { useEffect, useState } from "react";
import { getAllRequests, updateStatus } from "../api/request";
import RequestCard from "../components/RequestCard";
import Navbar from "../components/Navbar";

const FILTERS = ["ALL", "PENDING", "IN_PROGRESS", "RESOLVED", "CANCELLED"];

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRequests()
      .then((res) => setRequests(res.data))
      .catch((err) => setError(err.response?.data?.message || "Access denied"))
      .finally(() => setLoading(false));
  }, []);

  const changeStatus = async (id, status) => {
    setError("");
    try {
      const res = await updateStatus(id, status);
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? res.data.request : r))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const shown =
    filter === "ALL"
      ? requests
      : requests.filter((r) => r.status === filter);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-200">
                  Admin Panel
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Admin Dashboard
              </h1>

              <p className="mt-2 text-sm text-slate-300 sm:text-base">
                Manage and track all customer service requests.
              </p>
            </div>

            {/* Total Requests */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 shadow-lg backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <svg
                  className="h-6 w-6 text-blue-200"
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
                <p className="text-xs font-medium uppercase tracking-wider text-slate-300">
                  Total Requests
                </p>
                <p className="text-2xl font-bold text-white">
                  {requests.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Filter Section */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <svg
              className="h-5 w-5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 14.414V19l-2 1v-5.586a1 1 0 00-.293-.707L4.293 7.293A1 1 0 014 6.586V4z"
              />
            </svg>

            <span className="text-sm font-semibold text-slate-700">
              Filter Requests
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  filter === f
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {f.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

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

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
              <p className="text-sm font-medium text-slate-500">
                Loading requests...
              </p>
            </div>
          </div>
        ) : shown.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <svg
                className="h-8 w-8 text-slate-400"
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
              No requests found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              There are no requests matching the selected filter.
            </p>
          </div>
        ) : (
          /* Requests */
          <div className="space-y-5">
            {shown.map((r) => (
              <div
                key={r._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <RequestCard request={r} showCustomer>
                  <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 mt-4">

                    {r.status === "PENDING" && (
                      <button
                        className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-600 hover:shadow-md active:scale-95"
                        onClick={() =>
                          changeStatus(r._id, "IN_PROGRESS")
                        }
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
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.868v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Accept
                      </button>
                    )}

                    {r.status === "IN_PROGRESS" && (
                      <button
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md active:scale-95"
                        onClick={() =>
                          changeStatus(r._id, "RESOLVED")
                        }
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Mark as Resolved
                      </button>
                    )}

                    {(r.status === "PENDING" ||
                      r.status === "IN_PROGRESS") && (
                      <button
                        className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 ring-1 ring-inset ring-red-200 transition-all hover:bg-red-100 hover:text-red-700 active:scale-95"
                        onClick={() =>
                          changeStatus(r._id, "CANCELLED")
                        }
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Cancel
                      </button>
                    )}

                    {r.status === "RESOLVED" && (
                      <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
                          ✓
                        </span>
                        Service Completed
                      </span>
                    )}

                  </div>
                </RequestCard>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;