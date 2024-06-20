import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home/Home';
import Rooms from './screens/Rooms/Rooms';
import RoomDetail from './screens/RoomDetail/RoomDetail';
import Register from './screens/Login/Register/Register'

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail/>} />
          {/* Các Route khác tại đây */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
