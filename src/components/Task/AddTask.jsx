import React, { useState } from "react";
import { createTaskAPI, updateTaskAPI } from "../../api/taskAPi";
import { useTask } from "../../contextAPI/TaskProvider";
import { useToast } from "../../contextAPI/ToastProvider";

const AddTask = ({ data, edit, onClose }) => {
  const { handletoast } = useToast();
  const [formData, setFormData] = useState({
    title: data ? data.title : "",
    description: data ? data.description : "",
    status: data ? data.status : "",
    duedate: data ? new Date(data.duedate).toISOString().substring(0, 10) : "",
  });
  const { fetchTasks } = useTask();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (edit) {
        formData.id = data._id;
        res = await updateTaskAPI(formData);
      } else {
        res = await createTaskAPI(formData);
      }

      if (res.status === 200 || res.status === 201) {
        fetchTasks();
        handletoast({
          type: "success",
          message: edit
            ? "Task updated successfully"
            : "Task created successfully",
        });
        onClose();
      } else {
        handletoast({
          type: "error",
          message: res.data.message || "Error handling task",
        });
      }
    } catch (error) {
      console.error("Error handling task:", error);
      handletoast({
        type: "error",
        message: error.message || "Error handling task",
      });
    }
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
        <div className="flex justify-between items-center mt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-7 py-2 text-white bg-red-500 rounded"
          >
            Close
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-7 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {edit ? "Update" : "Create"} Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
