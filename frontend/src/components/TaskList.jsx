import React from 'react';

const TaskList = ({ tasks, categories, onEdit, onDelete, onUpdateTask }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleComplete = async (task) => {
    await onUpdateTask({
      ...task,
      is_completed: !task.is_completed
    });
  };

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks found. Add your first task!
        </div>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow p-4 border-l-4" 
               style={{ borderLeftColor: task.category_color || '#6B7280' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() => toggleComplete(task)}
                  className="h-5 w-5 text-blue-500 rounded"
                />
                <div>
                  <h3 className={`font-medium ${task.is_completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {task.category_name || 'Uncategorized'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    {task.due_date && (
                      <span className="text-xs text-gray-500">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(task)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;