import v1Route from "./v1/index.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const Route = (app) => {
  // Serve static files using the serve middleware
  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, "../../dist")));

  app.use("/api/v1", v1Route);



  app.use("*", (req, res) => {
    res.status(404).json({
      status: "fail",
      message: "404 Error! Page Not Found!",
    });
  });
};

export default Route;
