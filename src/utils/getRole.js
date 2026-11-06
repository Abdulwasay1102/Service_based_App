import { jwtDecode } from "jwt-decode";

// UI-only helper. The backend always re-checks the role from the database.
export const getRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return jwtDecode(token).role;
  } catch {
    return null;
  }
};
