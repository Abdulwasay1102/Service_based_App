
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRequest } from "../api/request";
import Navbar from "./Navbar";
import { CATEGORIES } from "../utils/format";

const CreateRequest = () => {
  const [form, setForm] = useState({
    title: "",
    category: "Electricity",
    description: "",
    priority: "MEDIUM",
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim() || !form.description.trim()) {
      return setError("Title and description are required");
    }
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    files.forEach((f) => formData.append("attachments", f));

    try {
      setLoading(true);
      await createRequest(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* Page Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            SERVICEHUB
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Create Service Request
          </h1>

          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Submit your problem and our team will help you resolve it.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">

          {/* Card Header */}
          <div className="px-6 sm:px-8 py-6 border-b border-slate-800 bg-gradient-to-r from-indigo-500/10 to-transparent">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400/20 flex items-center justify-center text-2xl">
                🛠️
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Request Information
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Fill in the details below
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="p-6 sm:p-8 space-y-6" onSubmit={handleSubmit}>

            {/* Error */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                <span className="text-lg">⚠</span>
                {error}
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Request Title <span className="text-red-400">*</span>
              </label>

              <input
                placeholder="Electricity problem in bedroom"
                value={form.title}
                onChange={set("title")}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 outline-none transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-500"
              />

              <p className="text-xs text-slate-500">
                Give your request a short and clear title.
              </p>
            </div>

            {/* Category and Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Category <span className="text-red-400">*</span>
                </label>

                <select
                  value={form.category}
                  onChange={set("category")}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Priority Level <span className="text-red-400">*</span>
                </label>

                <select
                  value={form.priority}
                  onChange={set("priority")}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition cursor-pointer"
                >
                  <option>LOW</option>
                  <option>MEDIUM</option>
                  <option>HIGH</option>
                </select>

                <p className="text-xs text-slate-500">
                  Select how urgent your problem is.
                </p>
              </div>

            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Problem Description <span className="text-red-400">*</span>
              </label>

              <textarea
                rows="5"
                placeholder="Describe the problem in detail..."
                value={form.description}
                onChange={set("description")}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition resize-y"
              />

              <p className="text-xs text-slate-500">
                Provide enough information so our team can understand the issue.
              </p>
            </div>

            {/* Attachments */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-200">
                Attachments <span className="text-slate-500 font-normal">(Optional)</span>
              </label>

              <div className="relative border-2 border-dashed border-slate-700 hover:border-indigo-500/60 rounded-xl bg-slate-950/60 p-7 text-center transition duration-200">

                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="pointer-events-none">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/10 flex items-center justify-center text-3xl mb-3">
                    📎
                  </div>

                  <p className="text-white font-medium">
                    Click to upload files
                  </p>

                  <p className="text-slate-500 text-xs mt-2">
                    You can select multiple attachments
                  </p>
                </div>
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-slate-400 font-medium">
                    Selected Files ({files.length})
                  </p>

                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800"
                    >
                      <span className="text-indigo-400">📄</span>
                      <span className="text-sm text-slate-300 truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-slate-500 ml-auto shrink-0">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="pt-5 border-t border-slate-800 flex flex-col sm:flex-row gap-3">

              <button
                className="flex-1 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-200 active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Creating Request...
                  </span>
                ) : (
                  "Create Request →"
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-xs mt-6">
          ServiceHub — We're here to help you.
        </p>

      </div>
    </div>
  );
};

export default CreateRequest;
