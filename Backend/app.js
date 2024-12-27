const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./Routes/taskRoutes");

const app = express();


// middlewawre 
app.use(cors());
app.use(express.json());

// prefix 
app.use("/api", taskRoutes);

// database connection  
mongoose
  .connect("mongodb://localhost:27017/mern-task-manager")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8000, () => console.log("Server running on port 8000"));
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
