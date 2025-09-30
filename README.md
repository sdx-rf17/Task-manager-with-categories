# 📝 Full-Stack Task Manager with Categories

A full-stack task manager where users can organize tasks by categories and priorities, powered by React, Tailwind CSS, Node.js, Express, and MySQL.

## 🔧 Tech Stack

**Frontend**
- React
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express
- MySQL

## ✨ Features

- CRUD operations for tasks and categories
- Organize tasks into customizable categories
- Priority-based sorting and filtering
- Task reminders (future feature)
- Persistent data using MySQL
- RESTful API with Node.js & Express

## 🧠 Learning Focus

This project is ideal for **advanced beginners** to learn:
- Full-stack CRUD operations
- RESTful API design
- Database schema modeling with MySQL
- Connecting frontend and backend with Axios
- Git workflow and collaboration

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── CategoryFilter.jsx
│   │   └── App.jsx
│   └── tailwind.config.js
├── README.md
└── .gitignore
```

## ⚙️ Backend Setup

### 1. Navigate to the backend folder
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install express mysql2 cors dotenv
```

### 3. Set up .env
Create a `.env` file in the `backend/` directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=taskmanager
PORT=5000
```

### 4. Start the server
```bash
node server.js
```

## 🖥️ Frontend Setup

### 1. Navigate to the frontend folder
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

**Frontend runs on:** http://localhost:5173  
**Backend runs on:** http://localhost:5000

## 🌿 GitHub & Git Workflow

### 1. Create Repository
Create a new GitHub repository and connect it locally:

```bash
git init
git remote add origin (https://github.com/sdx-rf17/Task-manager-with-categories.git)
git checkout -b dev
```

### 2. Branch Strategy
- `main` – Production-ready code
- `dev` – Development integration branch
- `feature/*` – Individual feature branches (e.g., `feature/add-task-form`)
- `bugfix/*` – Bug fix branches

### 3. Git Commands
```bash
git checkout -b feature/your-feature-name
# Make changes
git add .
git commit -m "Your message"
git push origin feature/your-feature-name
```

Then create a Pull Request into `dev`.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Add a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## 🛠️ To Do / Contributions Welcome

- Add reminders & notifications
- Task color coding
- Analytics per category
- Recurring task support
- Unit tests

## 📄 License

MIT License – open to contributions
