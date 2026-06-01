import { Navigate, Outlet } from "react-router-dom";

function AuthProtectedRoute() {
  const user = localStorage.getItem("user");
  return user ? <Outlet /> : <Navigate to="/login" replace/>;
}

export default AuthProtectedRoute;
