const express = require("express");
const body_parser =  require("body-parser");
const cors =  require("cors");
const app = express();

app.use(cors());
app.use(body_parser.json());



const taskRoute = require("./routes/taskRoutes.js");
const categoryRoute = require("./routes/categoryRoutes.js");

app.use("/api/tasks", taskRoute);
app.use("/api/category", categoryRoute);


const PORT = 5000;
app.listen(PORT , ()=> console.log(`Server is run on ${PORT}`));


