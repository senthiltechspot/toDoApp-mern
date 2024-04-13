import mongoose from "mongoose";
import { StatusTypes } from "../utils/constants.js";

const task = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(StatusTypes),
    default: StatusTypes.PENDING,
    required: true,
  },
  duedate: { 
    type: Date,
    required: true,
  },
  reminder: {
    type: Date,
  },
});

const Task = mongoose.model("Task", task);
export default Task;
