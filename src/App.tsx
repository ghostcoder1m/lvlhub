import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
