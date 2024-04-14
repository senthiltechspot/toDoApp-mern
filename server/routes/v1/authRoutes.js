import express from "express";
import { loginUser, RefreshToken, registerUser, signOut } from "../../controllers/authController.js";
import {
  validateLoginReq,
  validateRegisterReq,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", validateRegisterReq, registerUser);
router.post("/login", validateLoginReq, loginUser);
router.get("/refresh", RefreshToken);
router.get("/logout", signOut);


export default router;
