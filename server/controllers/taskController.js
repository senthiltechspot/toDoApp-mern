import Task from "../models/task.js";
import { errorHandler } from "../utils/errorHandler.js";

// Get all tasks
export const getAllTasks = async (req, res) => {
  const userId = req.user._id;
  try {
    const tasks = await Task.find({ user: userId });
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    errorHandler(error, res);
  }
};

// Create new task
export const createTask = async (req, res) => {
  const userId = req.user._id;
  try {
    const { title, description, status, duedate, reminder } = req.body;
    const newTask = new Task({
      title,
      description,
      status,
      duedate,
      reminder,
      user: userId,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    errorHandler(error, res);
  }
};

// Update task
export const updateTask = async (req, res) => {
    const userID = req.user._id;
    const taskId = req.params.id;
    try {
      // Validate that the task belongs to the authenticated user
      const task = await Task.findOneAndUpdate(
        { _id: taskId, user: userID },
        { $set: req.body },
        { new: true }
      );
  
      if (!task) {
        // Task not found or doesn't belong to the authenticated user
        return res.status(403).json({ message: "Unauthorized or Task not found" });
      }
  
      res.status(200).json(task);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  

// Delete task
export const deleteTask = async (req, res) => {
    const userID = req.user._id;
    try {
      const task = await Task.findOneAndDelete({ _id: req.params.id, user: userID });
      if (!task) {
        // Task not found or doesn't belong to the authenticated user
        return res.status(403).json({ message: "Unauthorized or Task not found" });
      }
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      errorHandler(error, res);
    }
  };
  
