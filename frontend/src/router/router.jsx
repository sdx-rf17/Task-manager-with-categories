import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Tasks from '../pages/Tasks/Tasks';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;