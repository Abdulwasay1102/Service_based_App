
import { useState } from "react"
import { changePassword } from '../api/auth'

const ChangePassword = () => {

    const [form, setForm] = useState({
        oldPassword:"",
        newPassword:"",
    })

    const submit = async(e)=>{
        e.preventDefault()
        try{
            const res = await changePassword(form)
            console.log(res);
            
            alert(res.data.message)
        }catch(err){
            alert(err.response?.data?.message || "Something went wrong")

        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10">

      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-10">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-400/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-indigo-400"
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
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Change Password
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Keep your account secure with a strong password.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={submit}>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">
                Old Password
              </label>
              <input
                type="password"
                placeholder="Enter your old password"
                onChange={(e)=> setForm({...form, oldPassword:e.target.value})}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder-slate-500 outline-none transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">
                New Password 
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                onChange={(e)=> setForm({...form, newPassword:e.target.value})}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder-slate-500 outline-none transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-500"
              />
            </div>

            <button
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-200 cursor-pointer"
            >
              Update Password
            </button>

          </form>

          {/* Back Link */}
          <div className="mt-7 text-center">
            <a
              href="/dashboard"
              className="text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200"
            >
              ← Back to Dashboard
            </a>
          </div>

        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          Protect your account. Never share your password with anyone.
        </p>

      </div>
    </div>
  )
}

export default ChangePassword
