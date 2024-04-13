import express from "express";
import userRoute from "./authRoutes.js";
import taskRoute from "./taskRoutes.js";

const router = express.Router();

router.use("/auth", userRoute);
router.use("/task", taskRoute);

router.use("/check", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is up and running!",
  });
});

export default router;
