import { Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify/unstyled";
import ProtectedLayout from "./components/ProtectedLayout";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
import FallBackComponent from "./components/FallBackComponent";
import Profile from "./components/Profile";

function App() {
  const location = useLocation();
  console.log(location);
  const pathName =
    location.pathname === "/login" || location.pathname === "/signup";
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />

      <div className="flex h-screen" id="identify">x
        {!pathName && <div className="w-32 border-1">Side Bar</div>}
        <div className="w-[100vw]">
          <Routes>
            <Route element={<ProtectedLayout />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<AuthProtectedRoute />}>
              <Route path="*" element={<FallBackComponent />} />
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
