import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { GroceryListProvider } from './context/GroceryListContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <GroceryListProvider>
     <BrowserRouter>
      <App />
     </BrowserRouter>
     </GroceryListProvider>
  </React.StrictMode>
);

