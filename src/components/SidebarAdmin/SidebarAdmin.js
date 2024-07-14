import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SidebarAdmin.css'

const SidebarAdmin = () => {

    const location = useLocation();
    const [toggle, setToggle] = useState(false);
    const dropdownRef = useRef(null);
    const [customerData, setCustomerData] = useState(null);
    const [activeLink, setActiveLink] = useState(window.location.pathname); 

    useEffect(() => {
        // Lấy thông tin người dùng từ sessionStorage khi component được tải lần đầu
        const customerUserData = localStorage.getItem('customerUser');
        if (customerUserData) {
            setCustomerData(JSON.parse(customerUserData));
        }
        console.log(localStorage);
    }, []);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setToggle(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('customerUser');
        setCustomerData(null);
        window.location.href = "/";
    };


    return (
        <div className="left-sidebar with-vertical">
            <div className="simplebar-content">
                <div className="user-profile position-relative">
                    <div className="profile-img">
                        <img src={`${customerData && customerData.customer_image ? customerData.customer_image : 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'}`} alt="user" className="w-100 rounded-circle overflow-hidden"/>
                    </div>
                    <div className="profile-text hide-menu pt-1 dropdown" ref={dropdownRef}>
                        <a onClick={handleToggle} className="dropdown-toggle u-dropdown w-100 text-white d-block position-relative cursor-pointer" id="dropdownMenuLink">
                            {customerData && customerData.full_name}
                        </a>
                        <div className={`dropdown-menu animated flipInY ${toggle && "show"}`} style={{position: "absolute", inset: "0px auto auto 0px", margin: 0, transform: "translate(0px, 41px)"}}>
                            <a className="dropdown-item d-flex gap-2">
                                <i className="fa-regular fa-user" ></i>
                                Thông tin của tôi
                            </a>
                            <a className="dropdown-item d-flex gap-2">
                                <i className="fa-regular fa-envelope"></i>
                                Hộp thư đến
                            </a>
                            <div className="dropdown-divider"></div>
                            <a onClick={handleLogout} className="dropdown-item d-flex gap-2">
                                <i className="fa-solid fa-arrow-right-to-bracket" ></i>
                                Đăng xuất
                            </a>
                            <div className="dropdown-divider"></div>
                            <div className="px-3 py-2">
                                <a href="" className="btn-submit d-block w-100 btn-info rounded-pill">
                                    Xem thông tin
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <ul id="sidebarnav">
                    <li className="nav-small-cap">
                        <span className="hide-menu">Quản lý phòng</span>
                    </li>
                    <li className="sidebar-item">
                        <a className={`sidebar-link ${location.pathname === '/roomManager' ? 'active' : ''}`} href="/roomManager">
                            <i className="fa-regular fa-clipboard"></i>
                            <span className="hide-menu">Danh sách phòng</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a className={`sidebar-link ${location.pathname === '/addRoom' ? 'active' : ''}`} href="/addRoom">
                            <i className="fa-regular fa-square-plus"></i>
                            <span className="hide-menu">Thêm phòng</span>
                        </a>
                    </li>
                    {/*  */}
                    <li className="nav-small-cap">
                        <span className="hide-menu">Đơn hàng</span>
                    </li>
                    <li className="sidebar-item">
                        <a className="sidebar-link" href="#">
                            <i className="fa-regular fa-clipboard"></i>
                            <span className="hide-menu">Danh sách đơn hàng</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a className="sidebar-link" href="#">
                            <i className="fa-regular fa-credit-card"></i>
                            <span className="hide-menu">Thanh toán</span>
                        </a>
                    </li>
                    {/*  */}
                    <li className="nav-small-cap">
                        <span className="hide-menu">Thông báo</span>
                    </li>
                    <li className="sidebar-item">
                        <a className="sidebar-link" href="#">
                            <i className="fa-regular fa-envelope"></i>
                            <span className="hide-menu">Hộp thư đến</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a className="sidebar-link" href="#">
                            <i className="fa-regular fa-comment"></i>
                            <span className="hide-menu">Tin nhắn</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SidebarAdmin