import React, { useState } from "react";
import AddTask from "./AddTask";
import { bgColor, Status } from "../../Utils/constants";
const TaskCard = ({ task }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
  };

  const toggleDescription = () => {
    setIsEditing(false);
    setShowDescription(!showDescription);
  };

  return (
    <div
      className={`flex flex-col w-full px-3 py-2 border bg-slate-700 shadow-md shadow-gray-700 rounded ${
        bgColor[task.status]
      } `}
    >
      <div
        onClick={toggleDescription}
        className="flex cursor-pointer items-center justify-between"
      >
        <div className="w-[15%]">{Status[task.status]}</div>
        <h2 className=" w-[60%] text-lg truncate">{task.title}</h2>
      </div>
      <div className="flex items-center justify-between mt-2 w-full">
        <p className="text-sm cursor-pointer" onClick={toggleDescription}>
          {formatDate(task.duedate)}
        </p>

        <i className="bi bi-trash text-red-500 flex justify-end"></i>
      </div>

      {/* Modal */}
      {showDescription && (
        <div className="fixed inset-0 flex items-center justify-center">
          {isEditing ? (
            <AddTask data={task} edit={isEditing} onClose={toggleDescription} />
          ) : (
            <div className="sm:w-full lg:w-1/3  text-black bg-white p-4 rounded shadow-lg shadow-gray-400 z-10">
              <h3 className="text-xl font-bold mb-2">{task.title}</h3>
              <p className="mb-2">{task.description}</p>
              <div className="flex items-center mb-2">
                <span className="text-sm font-semibold mr-2">Status:</span>
                <span className={`px-2 py-1 rounded ${task.status}`}>
                  {task.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Due Date: {formatDate(task.duedate)}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 w-[100px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
          {/* Backdrop */}
          <div
            onClick={toggleDescription}
            className="fixed inset-0 bg-black opacity-50"
          ></div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
