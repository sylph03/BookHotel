// import React, { useEffect, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const NavigateAdmin = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const hasChecked = useRef(false);

//   useEffect(() => {
//     if (hasChecked.current) return;

//     const customerUserData = localStorage.getItem('customerUser');
//     if (customerUserData) {
//       const user = JSON.parse(customerUserData);
//       if (user.user_name === 'admin') {
//         if (location.pathname !== '/addRoom' && location.pathname !== '/listRoom' && location.pathname !== '/roomManager') {
//           navigate('/roomManager');
//         }
//       }
//     }

//     hasChecked.current = true;
//   }, [navigate, location]);

//   return null;
// };

// export default NavigateAdmin;

// import React, { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const NavigateAdmin = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const customerUserData = localStorage.getItem('customerUser');
//     if (customerUserData) {
//       const user = JSON.parse(customerUserData);
//       if (user.user_name !== 'admin' && isAdminPath(location.pathname)) {
//         navigate('/');
//       }
//     } else {
//       // Nếu không có dữ liệu khách hàng, chuyển hướng về trang chủ
//       navigate('/');
//     }
//   }, [navigate, location.pathname]);

//   // Kiểm tra xem đường dẫn có phải là đường dẫn admin hay không
//   const isAdminPath = (path) => {
//     const adminPaths = ['/roomManager', '/addRoom', '/listRoom'];
//     return adminPaths.includes(path);
//   };

//   return null;
// };

// export default NavigateAdmin;

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigateAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const customerUserData = localStorage.getItem('customerUser');
    if (customerUserData) {
      const user = JSON.parse(customerUserData);
      if (user.user_name === 'admin') {
        const paths = {
          '/roomManager': '/roomManager',
          '/addRoom': '/addRoom',
          '/listRoom': '/listRoom',
        };
        const targetPath = paths[location.pathname] || '/roomManager';
        navigate(targetPath);
      } else {
        if (location.pathname === '/roomManager' || location.pathname === '/addRoom') {
          navigate('/');
        }
      }
    } else {
      if (location.pathname === '/roomManager' || location.pathname === '/addRoom') {
        navigate('/');
      }
    }
  }, [navigate, location.pathname]);

  return null;
};

export default NavigateAdmin;


// import React, { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const NavigateAdmin = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const customerUserData = localStorage.getItem('customerUser');
//     if (customerUserData) {
//       const user = JSON.parse(customerUserData);
//       if (user.user_name === 'admin') {
//         const paths = {
//           '/roomManager': '/roomManager',
//           '/addRoom': '/addRoom',
//           '/listRoom': '/listRoom',
//         };
//         const targetPath = paths[location.pathname] || '/roomManager';
//         navigate(targetPath);
//       }
//     }
//   }, [navigate]);

//   return null;
// };

// export default NavigateAdmin;

