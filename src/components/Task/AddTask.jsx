import React, { useState } from "react";

const AddTask = ({ data, edit }) => {
  const [formData, setFormData] = useState({
    title: data ? data.title : "",
    description: data ? data.description : "",
    status: data ? data.status : "",
    duedate: data ? data.duedate : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form submission logic here, e.g., sending data to backend
    console.log(formData);
    // Reset form fields
    setFormData({
      title: "",
      description: "",
      status: "",
      duedate: "",
    });
  };

  return (
    <div className="flex flex-col sm:w-full lg:w-1/3 p-5 border rounded mt-2 z-10 bg-white text-black">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border p-2 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter title"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full border p-2 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter description"
            required
          />
        </div>
        <div>
          <label htmlFor="status" className="block font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border p-2 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="">Select status</option>
            <option value="PENDING">Pending</option>
            <option value="INPROGRESS">In Progress</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="DONE">Done</option>
          </select>
        </div>
        <div>
          <label htmlFor="duedate" className="block font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            id="duedate"
            name="duedate"
            value={formData.duedate}
            onChange={handleChange}
            className="mt-1 block w-full border p-2 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
