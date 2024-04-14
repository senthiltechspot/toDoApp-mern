import React, { useEffect, useState } from "react";
import { getTaskAPI } from "../../api/taskAPi";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { useTask } from "../../contextAPI/TaskProvider";
import { logoutAPI } from "../../api/authapi";
import { validateToken } from "../../handlers.js/authHandle";
import { useAuth } from "../../contextAPI/Auth";

const Tasks = () => {
  const { login, logout } = useAuth();
  const { tasks, ClearTask } = useTask();
  const [showAddTask, setShowAddTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("All");
  const filteredTasks =
    tasks && tasks.length > 0
      ? tasks.filter((task) => {
          const normalizedSearchQuery = searchQuery.toLowerCase();
          const normalizedTitle = task.title.toLowerCase();
          return (
            (filterOption === "All" || task.status === filterOption) &&
            normalizedTitle.includes(normalizedSearchQuery)
          );
        })
      : [];

  // Group tasks by due date
  const groupedTasks = {};
  filteredTasks.forEach((task) => {
    const dueDate = new Date(task.duedate).toDateString();
    if (!groupedTasks[dueDate]) {
      groupedTasks[dueDate] = [];
    }
    groupedTasks[dueDate].push(task);
  });

  // Sort group keys (dates) in ascending order
  const sortedGroupKeys = Object.keys(groupedTasks).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const handleLogout = async () => {
    try {
      const res = await logoutAPI();
      if (res.status === 200 || res.status === 201) {
        validateToken(login, logout);
        ClearTask();
      }
    } catch (error) {
      console.log(error);
      validateToken(login, logout);
    }
  };

  return (
    <div className="flex flex-col mx-7 mt-7">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
      <div className="flex gap-3 mb-7">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded px-4 py-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="w-1/3 px-4 py-2 rounded"
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="All">All</option>
          <option value="PENDING">To Do</option>
          <option value="INPROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>
      {/* Render tasks grouped by due date */}
      {sortedGroupKeys.length > 0 ? (
        sortedGroupKeys.map((date) => (
          <div key={date} className="mb-7">
            <h2 className="text-xl font-semibold mb-2">{date}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {groupedTasks[date].map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>No tasks found</div>
      )}

      {showAddTask && (
        <div className="fixed inset-0 flex items-center justify-center">
          <AddTask onClose={() => setShowAddTask(false)} />
          <div
            onClick={() => setShowAddTask(false)}
            className="fixed inset-0 bg-black opacity-50"
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
