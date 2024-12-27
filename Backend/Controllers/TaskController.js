const Task = require("../model/TaskSchema");

// task create controller 
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = new Task({ title, description, status });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// send the task in frontend  controller
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// update find the id controller 
exports.getupdateController = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id);
    const findData = await Task.findById(id)
    res.json({ findData })
  } catch (error) {
    console.error("Error update tasks:", error);
    res.status(500).json({ error: "Failed to update tasks" });
  }

}

// update task controller  
exports.postupdateController = async (req, res) => {
  try {
    const { title, description, status } = req.body
    const id = req.params.id
    await Task.findByIdAndUpdate(id, {
      title,
      description,
      status
    }, { new: true })
    res.status(200).json({
      message: "data successfully updated"
    })
  } catch (error) {
    console.error("Error update tasks:", error);
    res.status(500).json({ error: "Failed to update tasks" });
  }

}


// delete task controller 
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};


