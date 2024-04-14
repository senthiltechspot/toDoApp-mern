import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { getTaskAPI } from "../api/taskAPi";

// Create a context for managing Taskentication
const TaskContext = createContext(null);

// Define a provider to wrap the app and manage Taskentication state
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { isLoggedIn } = useAuth();
  const fetchTasks = async () => {
    try {
      const data = await getTaskAPI();
      // Data should be a array
      if (data && Array.isArray(data)) {
        setTasks(data);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
      setTasks([]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        fetchTasks();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const ClearTask = () => {
    setTasks([]);
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, ClearTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to access Taskentication context
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within an TaskProvider");
  }
  return context;
};
