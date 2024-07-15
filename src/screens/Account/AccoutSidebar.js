import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const AccoutSidebar = ( {customerData, setCustomerData} ) => {

    const location = useLocation();

    const [selectedFile, setSelectedFile] = useState(null);

    const handleUploadClick = () => {
        const fileInput = document.getElementById('imageUpload');
        if (fileInput) {
          fileInput.click();
        }
      };
    
      const handleFileUpload = (file) => {
        setSelectedFile(file);
        if (customerData && file) {
          const formData = new FormData();
          formData.append('image', file);
    
          axios.put(`http://localhost:3000/api/customers/${customerData.customer_id}/changeAvatar`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(response => {
              console.log('Thay ảnh đại diện thành công', response.data);
              const updatedCustomerData = {
                ...customerData,
                customer_image: response.data.avatarUrl,
              };
              localStorage.setItem('customerUser', JSON.stringify(updatedCustomerData));
              setCustomerData(updatedCustomerData);
              toast.success('Thay ảnh đại diện thành công!');
            })
            .catch(error => {
              console.error('Lỗi thay ảnh đại diện', error);
              toast.error('Lỗi thay ảnh đại diện');
            });
        }
      };

      const handleLogout = () => {
        localStorage.removeItem('customerUser');
        setCustomerData(null);
    };

    return (
        <div className="h-100 bg-white p-4">
            <div className="profile-top-left">
                <div className="img-profile text-center">
                    <div className="avatar-upload">
                        <div className="avatar-edit">
                            <input onChange={(e) => handleFileUpload(e.target.files[0])} name="file" type="file" accept="image/*" id="imageUpload"/>
                            <label onClick={handleUploadClick}>Sửa</label>
                        </div>
                        <div className="avatar-preview">
                            <div style={{backgroundImage: `url(${customerData && customerData.customer_image ? customerData.customer_image : 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'})`}}></div>
                        </div>
                    </div>
                </div>
                <div className="name-profile">
                    {customerData && customerData.full_name}
                </div>
            </div>
            <div className="member-categories-section">
                <div className="fw-bold my-3">Tài khoản của tôi</div>
                <div className={location.pathname === "/accountManager" ? "active" : ""} >
                    <a href="/accountManager" >
                        <i className="fa-solid fa-user me-2"></i>
                        Thông tin cá nhân
                    </a>
                </div>
                <div className={location.pathname === "/accountAddress" ? "active" : ""} >
                    <a href="/accountAddress">
                        <i className="fa-solid fa-map-location-dot me-2"></i>
                        Địa chỉ nhận hàng
                    </a>
                </div>
                <div>
                    <a href="#">
                        <i className="fa-solid fa-clipboard-list me-2"></i>
                        Đơn hàng
                    </a>
                </div>
                {/* <div>
                    <a href="/cart">
                        <i class="fa-solid fa-cart-shopping me-2"></i>
                        Giỏ hàng
                    </a>
                </div> */}
                <a onClick={(handleLogout)} href="/" className="btn-submit d-block mt-4 text-white rounded-0">Đăng xuất</a>
            </div>
        </div>
    )
}

export default AccoutSidebar