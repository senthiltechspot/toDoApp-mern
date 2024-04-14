# Todo App

This is a Todo App built using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Tasks](#tasks)
- [Scripts](#scripts)

## Features

- User authentication (login, register, refresh token)
- Create, read, update, and delete tasks
- Task status management (todo, in progress, done)
- Task due date tracking

## Technologies Used

- **Front-end**: React.js, Vite, Tailwind CSS
- **Back-end**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Task Runner**: npm-run-all

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

1. Clone the repository:
  `git clone https://github.com/senthiltechspot/toDoApp-mern.git`

2. Navigate to the project directory:
   `cd todo-app`

3. Install dependencies:
  `npm install`

### Environment Variables

Create a `.env` file in the root directory of the project and add the following variables:

```dotenv
MONGODBURI="your mongodb uri"
JWT_SECRET="somerandomjwtsecretkey"
REFRESH_TOKEN_SECRET="somerandomjwtsecretkeyforRefreshToken"
VITE_BACKEND_URL="http://localhost:3000/api/v1"


Replace the placeholders with your actual MongoDB connection string, JWT secret, and Refresh Token secret.

## API Documentation

### Authentication

- **Login**: `POST /api/v1/auth/login`
- **Register**: `POST /api/v1/auth/register`
- **Refresh Token**: `GET /api/v1/auth/refresh`

### Tasks

- **Get/Post Task**: `POST /api/v1/task`
- **Update/Delete Task**: `PUT /api/v1/task/:id`

## Scripts

- `npm run dev`: Runs the backend and frontend concurrently in development mode.
- `npm run backend`: Runs the backend server with nodemon.
- `npm run frontend`: Runs the frontend development server with Vite.
- `npm run build`: Builds the frontend application for production.
- `npm run preview`: Previews the built frontend application.
- `npm start`: Runs the backend server in production mode.

## Preview

![Todo App Preview](https://res.cloudinary.com/djlmmcnyh/image/upload/v1713077431/Screenshot_2024-04-14_121852_sdtxpm.png)
![Todo App Preview](https://res.cloudinary.com/djlmmcnyh/image/upload/v1713077432/Screenshot_2024-04-14_121908_mmqqzv.png)
