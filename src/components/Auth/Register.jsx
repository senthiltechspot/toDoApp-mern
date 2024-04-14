import React, { useState } from "react";
import { signupAPI } from "../../api/authapi";

const Register = ({ setLogComp, serverOnline }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signupAPI(formData);
      if (data.status === 201) {
        setLogComp("login");
      } else {
        throw new Error(data || "Error signing up");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className=" min-h-screen flex justify-center items-center text-black">
      <div className="bg-white p-8 rounded shadow-lg shadow-gray-400 w-full max-w-md ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">SignUp</h2>
          <div
            className={`w-4 h-4 ${
              serverOnline ? "bg-green-500" : "bg-red-500"
            } rounded-full animate-pulse mr-3`}
          ></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full text-black bg-white rounded border focus:outline-none focus:border-blue-500"
            />
          </div>
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
              className="mt-1 p-2 block w-full text-black bg-white rounded border focus:outline-none focus:border-blue-500"
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
            SignUp
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <button onClick={() => setLogComp("login")} className="text-blue-500">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
