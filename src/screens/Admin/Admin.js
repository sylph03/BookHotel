import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css';

const Admin = () => {

    const [rooms, setRooms] = useState([]);
    const [toggle, setToggle] = useState(false);
    const dropdownRef = useRef(null);
    const [customerData, setCustomerData] = useState(null);

    useEffect(() => {
        // Lấy thông tin người dùng từ sessionStorage khi component được tải lần đầu
        const customerUserData = localStorage.getItem('customerUser');
        if (customerUserData) {
            setCustomerData(JSON.parse(customerUserData));
        }
        console.log(localStorage);
    }, []);

    useEffect(() => {
        // Giả sử bạn có API để lấy danh sách phòng
        axios.get('http://localhost:3000/api/rooms')
            .then(response => {
                setRooms(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the rooms!", error);
                toast.error('Lỗi khi lấy danh sách phòng!');
            });
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
        <div id="main-wrapper">
            {/* Sidebar */}
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
                            <a className="sidebar-link" href="#">
                                <i className="fa-regular fa-square-plus"></i>
                                <span className="hide-menu">Thêm phòng</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link active" href="#">
                                <i className="fa-regular fa-clipboard"></i>
                                <span className="hide-menu">Danh sách phòng</span>
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
                                <span className="hide-menu">Email</span>
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

            {/* Page Wrapper */}
            <div className="page-wrapper">
                {/* Topbar */}
                <div className="topbar rounded-0 border-0" style={{background: "#fff"}}>
                    <div className="with-verical">
                        <div className="navbar navbar-expand-lg px-lg-0 px-3 py-0">
                            <div className="d-none d-lg-block">
                                <div className="brand-logo d-flex align-items-center justify-content-between">
                                    <a href="/admin" className="text-nowrap logo-img d-flex align-items-center gap-2">
                                        <span className="logo-text">
                                            <img width={"228px"} src="https://cdn1872.cdn-template-4s.com/media/logo/logo_1.png" alt="" className="dark-logo ps-2"/>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                                <div className="d-flex align-items-center justify-content-between py-2 py-lg-0">
                                    <ul className="navbar-nav gap-2 flex-row ms-auto align-items-center justify-content-center">
                                        <li className="nav-item hover-dd dropdown nav-icon-hover-bg rounded-circle d-none d-lg-block">
                                            <a className="nav-lik nav-icon-hover waves-effect waves-dark" href="#">
                                                <i className="fa-regular fa-bell"></i>
                                                <div className="notify">
                                                    <span className="heartbit"></span>
                                                    <span className="point"></span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="nav-item hover-dd dropdown">
                                            <a className="nav-lik nav-icon-hover" href="#">
                                                <img src="https://fagopet.vn/storage/in/r5/inr5f4qalj068szn2bs34qmv28r2_phoi-giong-meo-munchkin.webp" alt="user" className="profile-pic rounded-circle round-30"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body Wrapper */}
                <div className="body-wrapper">
                    <div className="container-fluid">
                        <div className="font-weight-medium shadow-none position-relative overflow-hidden mb-7">
                            <div className="card-body px-0">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 className="font-weight-medium fs-14 mb-0">Danh sách phòng</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Card>
                            <Card.Body>
                                <Table className="room-table">
                                    <thead>
                                        <tr>
                                            <th>Mã phòng</th>
                                            <th>Hình ảnh</th>
                                            <th>Tên phòng</th>
                                            <th>Giá</th>
                                            <th>Loại phòng</th>
                                            <th>Miêu tả</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rooms.map(room => (
                                            <tr key={room.room_id}>
                                                <td>{room.room_id}</td>
                                                <td>
                                                    <img src={room.image_url} alt={room.room_name} className="room-image" />
                                                </td>
                                                <td style={{fontWeight: 600, color: "#3A4752"}}>{room.room_name}</td>
                                                <td>
                                                    <span className="price-amount">
                                                        <span>{room.price}</span>
                                                        <span className="currency-symbol"> VND</span>
                                                    </span>
                                                </td>
                                                <td>
                                                    {room.type}
                                                </td>
                                                <td>{room.description}</td>
                                                <td>
                                                    <a href="#" className="action-icon">
                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                    </a>
                                                    <a href="#" className="action-icon">
                                                        <i className="fa-regular fa-trash-can"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Admin;
