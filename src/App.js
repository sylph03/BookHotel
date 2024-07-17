import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home/Home';
import Rooms from './screens/Rooms/Rooms';
import RoomDetail from './screens/RoomDetail/RoomDetail';
import Register from './screens/Login/Register/Register';
import LogIn from './screens/Login/LogIn/LogIn';
import AccountManager from './screens/Account/AccountManager';
import Cart from './screens/Cart/Cart';
import RoomManager from './screens/Admin/RoomManager/RoomManager';
import NavigateAdmin from './screens/Admin/NavigateAdmin';
import Payment from './screens/Payment/Payment';
import BookingSuccess from './screens/BookingSuccess/BookingSuccess'
import AddRoom from './screens/Admin/AddRoom/AddRoom'
import AccountAddress from './screens/Account/AccoutAddress';
import Introduce from './screens/Introduce/Introduce'
import IntroduceDetail from './screens/Introduce/IntroduceDetail';
import News from './screens/News/News'

import './App.css';
import NewsDetail from './screens/News/NewsDetail';
import AccountOrder from './screens/Account/AccountOrder';
import AccountOrderDetail from './screens/Account/AccountOrderDetail';

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
          <Route path="/roomManager" element={<RoomManager />} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/success" element={<BookingSuccess/>} />
          <Route path="/addRoom" element={<AddRoom/>} />
          <Route path="/accountAddress" element={<AccountAddress/>} />
          <Route path="/introduce" element={<Introduce/>} />
          <Route path="/introduce/:id" element={<IntroduceDetail />} />
          <Route path="/news" element={<News/>} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/accountOrder" element={<AccountOrder/>} />
          <Route path="/accountOrderDetail/:id" element={<AccountOrderDetail />} />
          {/* Các Route khác tại đây */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;




