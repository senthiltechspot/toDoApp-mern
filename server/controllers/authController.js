import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        message: "User created successfully",
      },
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, res);
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await user.isValidPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate access token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res
      .cookie("refreshToken", refreshToken, {
        // httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true, // set to true if using HTTPS
      })
      .cookie("token", token, {
        // httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          token,
          refreshToken,
        },
      });
  } catch (error) {
    console.error(error);
    errorHandler(error, res);
  }
};

// Refresh Token
const RefreshToken = async (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    return res.status(401).send("No refresh token provided.");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).send("User not found.");
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const newRefreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res
      .cookie("token", accessToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      })
      .cookie("refreshToken", newRefreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.error("Refresh token error", error);
    return res.status(401).send("Invalid refresh token.");
  }
};

const signOut = async (req, res) => {
  res
    .clearCookie("token")
    .clearCookie("refreshToken")
    .status(200)
    .json({ message: "Logged out successfully" });
};

export { registerUser, loginUser, RefreshToken, signOut };
