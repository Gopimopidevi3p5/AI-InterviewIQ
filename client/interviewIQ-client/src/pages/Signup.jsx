import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

function Signup() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    age: 0,
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // 👁️ Toggle state for both password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function updateFormData(e) {
    const { name, value } = e.target;
    if (name === "phone" && value.length > 10) {
      return toast.warn("Phone number must be 10 digits", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  async function signUp(e) {
    e.preventDefault();
    try {
      if (formValues.confirmPassword !== formValues.password) {
        return toast.error("Passwords do not match", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
      const userData = { ...formValues };
      delete userData.confirmPassword;
      const data = await axios.post(
        "http://localhost:4000/auth/signup",
        userData,
      );
      console.log(data.data, "data from signup");
      toast.success("Account created successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error("Signup failed. Please try again.");
    }
  }

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Sign up to get started
        </p>

        <form className="flex flex-col gap-4" onSubmit={signUp}>
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              className={inputClass}
              onChange={updateFormData}
              value={formValues.name}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="john@example.com"
              className={inputClass}
              onChange={updateFormData}
              value={formValues.email}
              required
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className={labelClass}>
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder="18"
              min="1"
              max="120"
              className={inputClass}
              onChange={updateFormData}
              value={formValues.age}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="9876543210"
              className={inputClass}
              onChange={updateFormData}
              value={formValues.phone}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // 👁️ toggles type
                name="password"
                id="password"
                placeholder="••••••••"
                className={inputClass}
                onChange={updateFormData}
                value={formValues.password}
                required
              />
              {/* 👁️ Toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition"
              >
                {showPassword ? <RxEyeClosed /> : <RxEyeOpen />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"} // 👁️ toggles type
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className={inputClass}
                onChange={updateFormData}
                value={formValues.confirmPassword}
                required
              />
              {/* 👁️ Toggle button */}
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition"
              >
                {showConfirmPassword ? <RxEyeClosed /> : <RxEyeOpen />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 mt-2"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Log in
            </a>
          </p>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;
