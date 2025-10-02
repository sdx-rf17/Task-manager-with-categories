import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import CategoryFilter from './components/CategoryFilter';
// import './styles/styles.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchCategories = async () => {
    // For now, we'll use static categories. You can create a categories API later
    const defaultCategories = [
      { id: 1, name: 'Work', color: '#EF4444' },
      { id: 2, name: 'Personal', color: '#10B981' },
      { id: 3, name: 'Shopping', color: '#F59E0B' },
      { id: 4, name: 'Health', color: '#8B5CF6' }
    ];
    setCategories(defaultCategories);
  };

  const addTask = async (task) => {
    try {
      await axios.post(`${API_URL}/tasks`, task);
      fetchTasks();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (task) => {
    try {
      await axios.put(`${API_URL}/tasks/${task.id}`, task);
      fetchTasks();
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category_id == selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Manager</h1>
          <p className="text-gray-600">Organize your tasks by categories and priority</p>
        </header>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors mt-4"
            >
              + Add New Task
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <TaskList
              tasks={filteredTasks}
              categories={categories}
              onEdit={setEditingTask}
              onDelete={deleteTask}
              onUpdateTask={updateTask}
            />
          </main>
        </div>

        {/* Task Form Modal */}
        {(showForm || editingTask) && (
          <TaskForm
            task={editingTask}
            categories={categories}
            onSave={editingTask ? updateTask : addTask}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;