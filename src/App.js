import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home/Home';
import Rooms from './screens/Rooms/Rooms';
import RoomDetail from './screens/RoomDetail/RoomDetail';
import Register from './screens/Login/Register/Register'
import LogIn from './screens/Login/LogIn/LogIn'
import AccountManager from './screens/AccountManager/AccountManager';
import Cart from './screens/Cart/Cart'

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="accoutManager" element={<AccountManager />} />
          <Route path="accoutManager/:changePassword" element={<AccountManager />} />
          <Route path="cart" element={<Cart/>} />
          {/* Các Route khác tại đây */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
