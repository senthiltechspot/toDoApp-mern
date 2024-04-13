import express from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../../controllers/taskController.js";

const router = express.Router();

// Define a single route for all task-related actions
router
  .route("/")
  .get(verifyToken, getAllTasks)
  .post(verifyToken, createTask)
router
  .route("/:id")
  .put(verifyToken, updateTask)
  .delete(verifyToken, deleteTask);

export default router;
