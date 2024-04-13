import React, { useState } from "react";
import AddTask from "./AddTask";
// {
//     "_id": "661adbc204483e80f64b6e18",
//     "user": "661aa740fc92be5024602afc",
//     "title": "test2",
//     "description": "test description",
//     "status": "INPROGRESS",
//     "duedate": "2024-04-13T17:16:08.814Z",
//     "__v": 0
// }
const TaskCard = ({ task }) => {
  const [showDescription, setShowDescription] = useState(false);

  const Status = {
    PENDING: <i className="bi bi-hourglass text-red-500"></i>,
    INPROGRESS: <i className="bi bi-arrow-repeat text-yellow-500"></i>,
    CANCELLED: <i className="bi bi-x-circle text-red-500"></i>,
    DONE: <i className="bi bi-check-circle text-green-500"></i>,
  };

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
    setShowDescription(!showDescription);
  };

  const bgColor = {
    PENDING: "border-red-500",
    INPROGRESS: "border-yellow-500",
    CANCELLED: "border-gray-600",
    DONE: "border-green-500",
  };

  return (
    <div
      className={`flex flex-col w-full px-3 py-2 border rounded ${
        bgColor[task.status]
      } `}
    >
      <div className="flex items-center justify-between">
        <div className="w-[15%]">{Status[task.status]}</div>
        <h2
          onClick={toggleDescription}
          className="cursor-pointer w-[60%] text-lg truncate"
        >
          {task.title}
        </h2>
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
          {/* <h3 className="text-lg font-bold">{task.title}</h3>
            <p className="text-sm">{task.description}</p>
            <p className="text-sm">{formatDate(task.duedate)}</p> */}
          <AddTask data={task} edit={true} />
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
