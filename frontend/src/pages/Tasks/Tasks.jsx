import React from 'react';
import { useSelector } from 'react-redux';
import AddTasks from "../../components/AddTasks";
import GetTasks from "../../components/GetTasks";
import Header from "../../components/Header";

const Tasks = () => {
  const { loading } = useSelector(state => state.tasks);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Manager</h1>
          <p className="text-gray-600 text-lg">Organize your tasks by categories and priority</p>
        </div>

        {/* Add Task Section */}
        <div className="mb-8">
          <AddTasks />
        </div>

        {/* Tasks List Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Tasks</h2>
          <GetTasks />
        </div>
      </div>
    </div>
  );
};

export default Tasks;