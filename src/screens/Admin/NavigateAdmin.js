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

    // Kiểm tra nếu `customerUserData` tồn tại và có thể được parse mà không gây lỗi
    if (customerUserData) {
      try {
        const user = JSON.parse(customerUserData);
        
        if (user.user_name === 'admin') {
          const paths = {
            '/roomManager': '/roomManager',
            '/addRoom': '/addRoom',
            '/orderManager' : '/orderManager',
            '/listRoom': '/listRoom',
          };
          const targetPath = paths[location.pathname] || '/roomManager';
          navigate(targetPath);
        } else {
          if (location.pathname === '/roomManager' || location.pathname === '/addRoom' || location.pathname === '/orderManager') {
            navigate('/');
          }
        }
      } catch (error) {
        console.error("Failed to parse JSON from localStorage:", error);
        // Xử lý lỗi JSON không hợp lệ (có thể xóa dữ liệu sai, thông báo người dùng, v.v.)
        localStorage.removeItem('customerUser');  // Xóa dữ liệu không hợp lệ
        if (location.pathname === '/roomManager' || location.pathname === '/addRoom' || location.pathname === '/orderManager') {
          navigate('/');
        }
      }
    } else {
      if (location.pathname === '/roomManager' || location.pathname === '/addRoom' || location.pathname === '/orderManager') {
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

