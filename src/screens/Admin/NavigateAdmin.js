import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const customerUserData = localStorage.getItem('customerUser');
    if (customerUserData) {
      const user = JSON.parse(customerUserData);
      if (user.user_name === 'admin') {
        navigate('/admin');
      }
    }
  }, [navigate]);

  return null;
};

export default NavigateAdmin;
