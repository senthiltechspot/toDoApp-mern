import mongoose from "mongoose";

// MongoDB options
const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODBURI, options)
  .then(() => {
    console.log("Connection to MongoDB has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to MongoDB:", err);
  });

// Export mongoose connection
export default mongoose.connection;
