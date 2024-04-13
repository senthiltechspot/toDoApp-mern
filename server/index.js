import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import Route from "./routes/index.js";
import mongooseConnection from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Routes
Route(app);

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}, visit http://localhost:${PORT}`
  );
});

// Use the mongooseConnection for any operations requiring a database connection
mongooseConnection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Optional: You can add additional event listeners to mongooseConnection if needed
mongooseConnection.once("open", () => {
  console.log("MongoDB connection established successfully");
});
