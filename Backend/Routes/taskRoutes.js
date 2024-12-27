const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/TaskController");

// post router for data create 
router.post("/tasks", taskController.createTask);

// get router for data read 
router.get("/tasks", taskController.getTasks);

// find by id router 
router.get("/getUpdate/:id", taskController.getupdateController)

// put router for task update  
router.put("/postUpdate/:id", taskController.postupdateController)

// delete router for task delete 
router.delete("/deleteTask/:id", taskController.deleteTask);


module.exports = router;
