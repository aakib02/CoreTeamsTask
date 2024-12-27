import React, { useState, useEffect } from "react";
import axios from "axios";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link } from "react-router-dom";
import moment from "moment"; 

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from database
  const fetchTasksFromAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasksFromAPI();
  }, []);

  // update task status in the database
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/api/postUpdate/${taskId}`, {
        status: newStatus,
      });
      fetchTasksFromAPI(); 
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // drag tasks
  const Task = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "TASK",
      item: { id: task._id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
    const deleteHandle = async (taskId) => {
      try {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
          await axios.delete(`http://localhost:8000/api/deleteTask/${taskId}`);
  
  
          fetchTasksFromAPI();
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    };

    return (
      <div
        ref={drag}
        className={`bg-white p-4 mb-4 rounded-lg shadow-sm cursor-pointer transition relative ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-xs text-gray-500 pt-2">
        Created At: {moment(task.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
        <div>
        <Link to={`/update-task/${task._id}`}>
        <button type="button" class=" focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm pr-5 py-1 me-2 my-2 text-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>
        </Link>
        <button
                        onClick={() => { deleteHandle(task._id) }}
                        className="text-gray-600 hover:text-red-500"
                      >
                      delete
                      </button>
        </div>
      </div>
    
    );
  };

  // drop columns
  const Column = ({ status, children }) => {
    const [, drop] = useDrop({
      accept: "TASK",
      drop: (item) => updateTaskStatus(item.id, status),
    });

    return (
      <div
        ref={drop}
        className="bg-gray-100 p-4 rounded-lg shadow-md min-h-[200px]"
      >
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
          {status}
        </h2>
        {children}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto px-4 py-6">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Open", "In-Progress", "Completed"].map((status) => (
            <Column key={status} status={status}>
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <Task key={task._id} task={task} />
                ))}
            </Column>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskList;
