
import { Link } from "react-router-dom";
import { fmtDate, fmtStatus } from "../utils/format";

// children = extra action buttons (used by admin dashboard)
const RequestCard = ({ request, showCustomer = false, children }) => {

  const statusStyles = {
    PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    IN_PROGRESS: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    RESOLVED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const priorityStyles = {
    LOW: "bg-slate-500/10 text-slate-300 border-slate-500/20",
    MEDIUM: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    HIGH: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-2 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            Service Request
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors break-words">
            {request.title}
          </h3>
        </div>

        {/* Status */}
        <span className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${statusStyles[request.status] || "bg-slate-800 text-slate-300 border-slate-700"}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {fmtStatus(request.status)}
        </span>

      </div>

      {/* Details */}
      <div className="space-y-4">

        {/* Category */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 shrink-0 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </div>

          <div>
            <p className="text-xs text-slate-500">Category</p>
            <p className="text-sm text-slate-200 font-medium">{request.category}</p>
          </div>
        </div>

        {/* Priority */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 shrink-0 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          </div>

          <div>
            <p className="text-xs text-slate-500">Priority</p>
            <span className={`inline-flex mt-1 px-2.5 py-1 rounded-md border text-xs font-semibold ${priorityStyles[request.priority] || "bg-slate-800 text-slate-300 border-slate-700"}`}>
              {request.priority}
            </span>
          </div>
        </div>

        {/* Customer */}
        {showCustomer && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m6-10a4 4 0 100-8 4 4 0 000 8zm7-5h6m-3-3v6" />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="text-xs text-slate-500">Customer</p>
              <p className="text-sm text-slate-200 font-medium break-all">
                {request.user?.email}
              </p>
            </div>
          </div>
        )}

        {/* Created Date */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 shrink-0 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 012 2v14H3V6a2 2 0 012-2z" />
            </svg>
          </div>

          <div>
            <p className="text-xs text-slate-500">Created</p>
            <p className="text-sm text-slate-300 font-medium">
              {fmtDate(request.createdAt)}
            </p>
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-slate-800">

        <Link
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/10 transition-all duration-200 active:scale-95"
          to={`/request/${request._id}`}
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
          </svg>
        </Link>

        {children}

      </div>

    </div>
  );
};

export default RequestCard;
