import React from 'react';
import ReactDOM from 'react-dom/client';
import './maincss/index.css';
import App from './App';
import About from './routes/About/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/About' element={<About />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

