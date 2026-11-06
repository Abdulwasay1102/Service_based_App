import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth";
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await resetPassword(token, password);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "password reset failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-wrap"><div className="auth-card">
      <h2>Reset Password</h2>
      <form className="stack" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Reseting..." : "Reset Password"}
        </button>
      </form>
      <p><a href="/">Back to login</a></p>
    </div></div>
  );
};

export default ResetPassword;
