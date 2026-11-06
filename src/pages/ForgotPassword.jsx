import { useState } from "react";
import { forgotPassword } from "../api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await forgotPassword(email);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-wrap"><div className="auth-card">
      <h2>Forgot Password</h2>
      <form className="stack" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset link"}
        </button>
      </form>
      <p><a href="/">Back to login</a></p>
    </div></div>
  );
};

export default ForgotPassword;
