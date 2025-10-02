import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => onSelectCategory('all')}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
            selectedCategory === 'all' 
              ? 'bg-blue-100 text-blue-800' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Tasks
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${
              selectedCategory == category.id 
                ? 'bg-blue-100 text-blue-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            ></span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;