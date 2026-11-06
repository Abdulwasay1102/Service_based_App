
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteRequest, getRequest, updateRequest, updateStatus } from "../api/request";
import Navbar from "../components/Navbar";
import FilePreview from "../components/FilePreview";
import { getRole } from "../utils/getRole";
import { fmtDate, fmtStatus } from "../utils/format";

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAdmin = getRole() === "admin";
  const [request, setRequest] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "MEDIUM" });

  useEffect(() => {
    getRequest(id)
      .then((res) => setRequest(res.data))
      .catch((err) => setError(err.response?.data?.message || "Request not found"));
  }, [id]);

  const changeStatus = async (status) => {
    setError("");
    try {
      const res = await updateStatus(id, status);
      setRequest(res.data.request);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this request?")) return;
    try {
      await deleteRequest(id);
      navigate(isAdmin ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  const startEdit = () => {
    setForm({ title: request.title, description: request.description, priority: request.priority });
    setEditing(true);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim() || !form.description.trim()) return setError("Title and description are required");
    try {
      const res = await updateRequest(id, form);
      setRequest({ ...request, ...res.data.request, user: request.user });
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const back = isAdmin ? "/admin" : "/dashboard";

  if (!request) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
            {error ? (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 mb-6">
                {error}
              </div>
            ) : (
              <div className="flex items-center gap-3 text-slate-400 mb-6">
                <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                Loading request...
              </div>
            )}
            <button
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition"
              onClick={() => navigate(back)}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const canUserEdit = !isAdmin && request.status === "PENDING";

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
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Back Button */}
        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 mb-7 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition duration-200"
          onClick={() => navigate(back)}
        >
          <span>←</span> Back to Dashboard
        </button>

        {/* Main Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-slate-800 bg-gradient-to-r from-indigo-500/10 to-transparent">

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

              <div>
                <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  REQUEST DETAILS
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white break-words">
                  {request.title}
                </h2>

                <p className="text-slate-500 text-sm mt-3">
                  Request ID: <span className="text-slate-400">{id}</span>
                </p>
              </div>

              <span className={`inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${statusStyles[request.status] || "bg-slate-800 text-slate-300 border-slate-700"}`}>
                <span className="w-2 h-2 rounded-full bg-current" />
                {fmtStatus(request.status)}
              </span>

            </div>
          </div>

          <div className="p-6 sm:p-8">

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 mb-6 flex items-center gap-3">
                <span className="text-lg">⚠</span>
                {error}
              </div>
            )}

            {editing ? (

              /* Edit Form */
              <form className="space-y-6" onSubmit={saveEdit}>

                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Edit Request</h3>
                  <p className="text-sm text-slate-500">Update your request information below.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Request Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                    placeholder="Enter request title"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Description</label>
                  <textarea
                    rows="5"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition resize-y"
                    placeholder="Describe your request..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Priority Level</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition cursor-pointer"
                  >
                    <option>LOW</option>
                    <option>MEDIUM</option>
                    <option>HIGH</option>
                  </select>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20 transition active:scale-95">
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </div>

              </form>

            ) : (

              <>

                {/* Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Customer */}
                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-lg">
                        👤
                      </div>
                      <span className="text-sm text-slate-500">Customer</span>
                    </div>
                    <p className="text-white font-medium break-all">
                      {request.user?.email}
                    </p>
                  </div>

                  {/* Category */}
                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 text-lg">
                        📁
                      </div>
                      <span className="text-sm text-slate-500">Category</span>
                    </div>
                    <p className="text-white font-medium">
                      {request.category}
                    </p>
                  </div>

                  {/* Priority */}
                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-lg">
                        ⚡
                      </div>
                      <span className="text-sm text-slate-500">Priority</span>
                    </div>
                    <span className={`inline-flex px-3 py-1 rounded-lg border text-sm font-semibold ${priorityStyles[request.priority] || "bg-slate-800 text-slate-300 border-slate-700"}`}>
                      {request.priority}
                    </span>
                  </div>

                  {/* Created Date */}
                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-lg">
                        📅
                      </div>
                      <span className="text-sm text-slate-500">Created At</span>
                    </div>
                    <p className="text-white font-medium">
                      {fmtDate(request.createdAt)}
                    </p>
                  </div>

                </div>

                {/* Description */}
                <div className="mt-6 bg-slate-950/70 border border-slate-800 rounded-xl p-5 sm:p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <span className="text-indigo-400">▤</span>
                    Description
                  </h3>
                  <p className="text-slate-400 leading-7 whitespace-pre-wrap break-words">
                    {request.description}
                  </p>
                </div>

                {/* Attachments */}
                {request.attachments?.length > 0 && (
                  <div className="mt-6 bg-slate-950/70 border border-slate-800 rounded-xl p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h3 className="text-white font-semibold text-lg">Attachments</h3>
                        <p className="text-slate-500 text-sm mt-1">
                          Files submitted with this request
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
                        {request.attachments.length} Files
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {request.attachments.map((f, i) => (
                        <FilePreview key={i} file={f} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Completed Message */}
                {request.status === "RESOLVED" && (
                  <div className="mt-6 p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-emerald-400 font-semibold">Service Completed</h3>
                      <p className="text-emerald-400/70 text-sm mt-1">
                        This request has been successfully resolved.
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-8 pt-6 border-t border-slate-800">

                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Request Actions
                  </h3>

                  <div className="flex flex-wrap gap-3">

                    {isAdmin && request.status === "PENDING" && (
                      <button
                        className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold transition shadow-lg shadow-orange-500/10 active:scale-95"
                        onClick={() => changeStatus("IN_PROGRESS")}
                      >
                        ✓ Accept Request
                      </button>
                    )}

                    {isAdmin && request.status === "IN_PROGRESS" && (
                      <button
                        className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition shadow-lg shadow-emerald-600/10 active:scale-95"
                        onClick={() => changeStatus("RESOLVED")}
                      >
                        ✓ Mark as Resolved
                      </button>
                    )}

                    {isAdmin && (request.status === "PENDING" || request.status === "IN_PROGRESS") && (
                      <button
                        className="px-5 py-3 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 font-semibold transition active:scale-95"
                        onClick={() => changeStatus("CANCELLED")}
                      >
                        ✕ Cancel Request
                      </button>
                    )}

                    {canUserEdit && (
                      <button
                        className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition shadow-lg shadow-indigo-600/10 active:scale-95"
                        onClick={startEdit}
                      >
                        ✎ Edit Request
                      </button>
                    )}

                    {(isAdmin || ["PENDING", "CANCELLED"].includes(request.status)) && (
                      <button
                        className="px-5 py-3 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 font-semibold transition active:scale-95"
                        onClick={handleDelete}
                      >
                        🗑 Delete Request
                      </button>
                    )}

                  </div>
                </div>

              </>
            )}

          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-xs mt-6">
          Request Management System
        </p>

      </div>
    </div>
  );
};

export default RequestDetails;
