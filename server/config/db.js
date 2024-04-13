import mongoose from 'mongoose';
import { dbConfig } from './db.config.js';

const env = process.env.NODE_ENV || 'development';

// Load db config
// Construct MongoDB connection URI
const { mongoURI } = dbConfig[env];

// MongoDB options
const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose.connect(mongoURI, options)
  .then(() => {
    console.log('Connection to MongoDB has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to MongoDB:', err);
  });

// Export mongoose connection
export default mongoose.connection;
