import React, { useState } from "react";
import { loginAPI } from "../../api/authapi";

const Login = ({ setLogComp, login, serverOnline }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = await loginAPI(formData);
  //   if (data.status === 200) {
  //     login(false);
  //   } else {
  // console.error("Error signing:", data);
  // alert(data || "Error signing");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginAPI(formData);
      if (data.status === 200) {
        login(false);
      } else {
        throw new Error(data || "Error signing up");
      }
    } catch (error) {
      alert(error.message || "Error signing");
    }
  };

  return (
    <div className=" min-h-screen flex justify-center items-center text-black">
      <div className="bg-white p-8 rounded shadow-lg shadow-gray-400 w-full max-w-md ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">LOGIN</h2>
          <div
            className={`w-4 h-4 ${
              serverOnline ? "bg-green-500" : "bg-red-500"
            } rounded-full animate-pulse mr-3`}
          ></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded border text-black bg-white border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded border text-black bg-white border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => setLogComp("register")}
            className="text-blue-500"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
