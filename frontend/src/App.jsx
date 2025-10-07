import React from 'react';
import { Provider } from 'react-redux';
import { store } from './utils/redux/store';
import Router from './router/router';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;