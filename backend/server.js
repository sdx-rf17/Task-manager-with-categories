const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const taskRoute = require("./routes/taskRoutes.js");
const categoryRoute = require("./routes/categoryRoutes.js");


//routes
app.use("/api/tasks", taskRoute);
app.use("/api/category", categoryRoute);



