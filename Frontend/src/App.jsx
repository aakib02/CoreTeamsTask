import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import UpdateTask from "./components/updateTask";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/tasks");
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Router>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
        <nav className="mb-4 flex justify-center ">
          <Link to="/" className="text-blue-500 mr-4">
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Task List</button>
          </Link>
          <Link to="/add-task" className="text-blue-500">
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Task</button>
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList tasks={tasks} />} />
          <Route path="/add-task" element={<TaskForm fetchTasks={fetchTasks} />} />
          <Route path="/update-task/:id" element={<UpdateTask />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
