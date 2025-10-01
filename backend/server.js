const express = require("express");
const body_parser =  require("body-parser");
const cors =  require("cors");
const app = express();


app.use(cors());
app.use(body_parser.json());



const taskRoute = require("./routes/taskRoutes.js");

app.use("/api/tasks", taskRoute);


const PORT = 5000;
app.listen(PORT , ()=> console.log(`Server is run on ${PORT}`));


