import { Navigate, Outlet } from "react-router-dom";

function ProtectedLayout() {
  const user = localStorage.getItem("user");
  return user ? <Navigate to="/" replace /> : <Outlet />;
}

export default ProtectedLayout;
