import React, { useEffect, useState } from "react";
import { getTaskAPI } from "../../api/taskAPi";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    // get tasks
    const getTasks = async () => {
      const data = await getTaskAPI();
      console.log(data);
      setTasks(data);
    };
    setTimeout(() => {
      getTasks();
    }, 3000);
  }, []);
  return (
    <div className="flex flex-col mx-5 mt-7">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* <div className={`flex flex-col w-full px-3 py-2 border rounded  `}>
            <div className="flex items-center justify-between">
              <div className="w-[15%]">Status</div>
              <h2 className="cursor-pointe w-[60%] text-lg truncate"></h2>
              <p className="text-sm cursor-pointer w-[20%]">Due Date</p>
              <p className="text-sm cursor-pointer w-[10%] flex items-end">
                Delete
              </p>
            </div>
          </div> */}
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>

      {showAddTask && (
        <div className="fixed inset-0 flex items-center justify-center">
          <AddTask />
          {/* Backdrop */}
          <div
            onClick={() => setShowAddTask(!showAddTask)}
            className="fixed inset-0 bg-black opacity-50"
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
