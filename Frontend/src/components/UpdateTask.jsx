import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({ title: "", description: "", status: "" });

// data fetching api 
  useEffect(() => {
    const fetchTask = async () => {
      try {
        console.log("Fetching task with ID:", id);
        axios.get(`http://localhost:8000/api/getUpdate/${id}`).then((res) => {
          console.log(res.data.findData);
          setTask(res.data.findData);
        })

      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [id]);
  console.log(task);


  // handle change function  
  const handleInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

// handle submit function   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.put(`http://localhost:8000/api/postUpdate/${id}`, task).then((data) => {
        console.log(data);
        if (data && data.status === 200) {

          navigate('/');
        }
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  console.log(task);
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">Update Task</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Open">Open</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
