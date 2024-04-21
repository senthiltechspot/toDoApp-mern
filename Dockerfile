# Use the official Node.js image as base
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application 
COPY . .

# This ensures that npm run build will build the application
RUN npm run build

# Expose the port on which your backend will run
EXPOSE 3000

# Command to run your backend server
CMD ["npm", "start"]
