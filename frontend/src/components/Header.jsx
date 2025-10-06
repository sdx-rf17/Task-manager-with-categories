import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-800">TaskManager</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome to your task manager!</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;