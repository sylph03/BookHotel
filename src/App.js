import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home/Home';
import Rooms from './screens/Rooms/Rooms';
import RoomDetail from './screens/RoomDetail/RoomDetail';
import Register from './screens/Login/Register/Register';
import LogIn from './screens/Login/LogIn/LogIn';
import AccountManager from './screens/AccountManager/AccountManager';
import Cart from './screens/Cart/Cart';
import Admin from './screens/Admin/Admin';
import NavigateAdmin from './screens/Admin/NavigateAdmin';
import Payment from './screens/Payment/Payment';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigateAdmin />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/accountManager" element={<AccountManager />} />
          <Route path="/accountManager/changePassword" element={<AccountManager />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/payment" element={<Payment/>} />
          {/* Các Route khác tại đây */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
