import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, updateTask, setSelectedCategory, fetchCategories } from '../utils/slices/taskSlice';
import TaskSkeleton from './TaskSkeleton';
import UpdateTask from './UpdateTask';

const GetTasks = () => {
  const dispatch = useDispatch();
  const { items: tasks, categories, loading, error, selectedCategory } = useSelector(state => state.tasks);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await dispatch(deleteTask(taskId)).unwrap();
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await dispatch(updateTask({
        id: task.id,
        is_completed: !task.is_completed
      })).unwrap();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category_id == selectedCategory);

  if (loading) return <TaskSkeleton />;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error.message}</div>;

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-3">Filter by Category:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => dispatch(setSelectedCategory('all'))}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            📋 All Tasks
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => dispatch(setSelectedCategory(category.id))}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedCategory == category.id 
                  ? 'text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              style={{ 
                backgroundColor: selectedCategory == category.id ? category.color : '',
                borderColor: selectedCategory == category.id ? category.color : '#D1D5DB'
              }}
            >
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: selectedCategory == category.id ? 'white' : category.color }}
              ></span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks Counter */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
        {selectedCategory !== 'all' && ` in ${categories.find(c => c.id == selectedCategory)?.name}`}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lg mb-2">No tasks found</p>
            <p className="text-sm">
              {selectedCategory !== 'all' 
                ? 'Try changing the category filter or create a new task.' 
                : 'Get started by creating your first task!'}
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className={`bg-white border-l-4 rounded-r-lg shadow-sm hover:shadow-md transition-shadow ${
                task.is_completed ? 'opacity-75' : ''
              }`}
              style={{ borderLeftColor: task.category_color || '#6B7280' }}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {/* Checkbox */}
                    <button
                      onClick={() => handleToggleComplete(task)}
                      className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        task.is_completed 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {task.is_completed && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-medium text-gray-900 break-words ${
                        task.is_completed ? 'line-through' : ''
                      }`}>
                        {task.title}
                      </h3>
                      
                      {task.description && (
                        <p className="text-gray-600 text-sm mt-1 break-words">{task.description}</p>
                      )}

                      {/* Task Meta */}
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        {/* Category */}
                        {task.category_name && (
                          <span 
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: `${task.category_color}20`,
                              color: task.category_color
                            }}
                          >
                            <span 
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: task.category_color }}
                            ></span>
                            {task.category_name}
                          </span>
                        )}

                        {/* Priority */}
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {getPriorityIcon(task.priority)}
                          {task.priority}
                        </span>

                        {/* Due Date */}
                        {task.due_date && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        )}

                        {/* Created Date */}
                        <span className="text-xs text-gray-500">
                          Created: {new Date(task.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                      title="Edit task"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      title="Delete task"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <UpdateTask 
          task={editingTask} 
          onClose={() => setEditingTask(null)} 
        />
      )}
    </div>
  );
};

export default GetTasks;