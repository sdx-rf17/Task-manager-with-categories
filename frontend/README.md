# Task Manager Frontend

## Overview

This is the frontend for the Task Manager web application, built with **React**. It provides a user-friendly interface for task management, user authentication, and profile handling. The application integrates with a backend API to perform CRUD operations on tasks and manage user authentication.

## Features

- **User Authentication**
  - Register new users
  - Login with JWT-based authentication
  - Forgot and reset password functionality
- **User Profile Management**

  - View and update profile details

- **Task Management**

  - Create, read, update, and delete tasks
  - Display a list of user tasks

- **State Management**

  - Uses **Redux Toolkit** for managing global state

- **UI & Styling**
  - Built with **Tailwind CSS** for responsive design

## Tech Stack

- **React** (Create React App / Vite)
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Axios** for API requests
- **Tailwind CSS** for styling

## Installation

### Prerequisites

- Node.js installed
- Backend service running

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com:muhammadranju/task-management.git
   cd task-manager/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5173
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
/src
│── components/     # Reusable UI components
│── pages/          # Application pages (Login, Register, Dashboard)
│── store/         # Redux store and slices
│── utils/         # Helper functions
│── App.js         # Main app component
│── index.js       # Entry point
```

## API Integration

- **User Authentication**: Communicates with backend `/auth` endpoints
- **Task Management**: Handles CRUD operations via `/tasks` API

## Routing

- **Public Routes**: Login, Register, Forgot Password
- **Protected Routes**: Dashboard, Profile, Task Management

## Deployment

- **Hosting:** Deploy on **Vercel, Netlify, or Firebase Hosting**
- **Environment Variables:** Ensure API base URL is set properly

## Contribution Guidelines

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit: `git commit -m "Your message"`
4. Push to the branch: `git push origin feature-branch`
5. Submit a pull request

## License

This project is licensed under the **MIT License**.
