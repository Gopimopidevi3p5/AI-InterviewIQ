import axios from "axios";
import {  useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleToChangeValues(e) {
    const { name, value } = e.target;

    // const newObj = { ...formData };

    // newObj[name] = value;

    // setFormData(newObj);

    setFormData((prev)=>({...prev,[name]:value}))
  }

  async function login(e) {
    e.preventDefault();

    try {
      const data = await axios.post(
        "http://localhost:4000/auth/login",
        formData,
      );

      localStorage.setItem("token", data.data.token);

      localStorage.setItem("user", JSON.stringify(data.data.user));

      navigate("/");

      setFormData({ email: "", password: "" });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  console.log(formData, "form data");


  useEffect(() => {
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
      input.value = "";
    });
  }, []);
  

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <form
        autoComplete="off"
        onSubmit={login}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Login
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            id="email"
            // autoComplete="off"
            value={formData.email}
            onChange={handleToChangeValues}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleToChangeValues}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mb-4 w-full rounded-md bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500">
          User does not have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:underline"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
