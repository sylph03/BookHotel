import { Container, Row, Col } from 'react-bootstrap';
import { Link, NavLink, useLocation, useNavigate  } from 'react-router-dom';
import React, { useEffect, useState, useRef  } from 'react';

import './MyHeader.css';

const MyHeader = () => {

    const location = useLocation();

    const [customerData, setCustomerData] = useState(null);
    const [isFixed, setIsFixed] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    useEffect(() => {
        // Lấy thông tin người dùng từ sessionStorage khi component được tải lần đầu
        const customerUserData = localStorage.getItem('customerUser');
        if (customerUserData) {
            setCustomerData(JSON.parse(customerUserData));
        }
        console.log(localStorage);
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 550) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleDropdown = (e) => {
        if (customerData) {
            e.preventDefault();
            setIsDropdownOpen(!isDropdownOpen);
        } 
    };

    const handleLogout = (e) => {
        localStorage.removeItem('customerUser');
        setCustomerData(null);
    };

    return (
        <div className='header'>
            <div className='header-top'>
                <Container>
                    <Row>
                        <Col className='px-0 col-md-12 col-12'>
                            <div className='header-top-left'>
                                <div className='header-top-left-box'>
                                    <div className='header-top-left-item'>
                                        <i className="fa-solid fa-phone"></i>
                                        <a href='#'>Hotline: 1900 6680</a>
                                    </div>
                                    <div className='header-top-left-item ps-5'>
                                    <i className="fa-solid fa-envelope"></i>
                                        <a href='#'>Email: contact@sm4s.vn</a>
                                    </div>
                                </div>
                            </div>
                            <div className='header-top-right'>
                                <div className='header-top-right-box'>
                                    <div className='header-top-right-user'>
                                        <div className='dropdown' ref={dropdownRef}>
                                            <a className={`color-main ${customerData ? 'd-flex align-items-center' : ''}`} onClick={toggleDropdown} href='/login'>
                                                {customerData? <img className='rounded-circle object-cover me-3' with="18" height="18" src={`${customerData.customer_image ? customerData.customer_image : 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'}`} alt={customerData.full_name}/>
                                                :<i className="fa-solid fa-user"></i> }
                                                {customerData ? customerData.full_name : "Tài khoản"}
                                            </a>
                                            <div className={`dropdown-menu dropdown-menu-righ ${isDropdownOpen ? 'show' : ''}`} style={{position: "absolute", transform: "translate3d(-97px, 23px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>
                                                <a href='#' className='dropdown-item py-3'>
                                                    <i className="fa-solid fa-user"></i>
                                                    Thông tin cá nhân
                                                </a>
                                                <a href='#' className='dropdown-item py-3'>
                                                    <i className="fa-solid fa-clipboard"></i>
                                                    Quản lý đơn hàng
                                                </a>
                                                <a href='#' className='dropdown-item py-3'>
                                                    <i className="fa-solid fa-lock"></i>
                                                    Thay đổi mật khẩu
                                                </a>
                                                <a onClick={handleLogout} href='/login' className='dropdown-item py-3'>
                                                    <i className="fa-solid fa-right-from-bracket"></i>
                                                    Thoát
                                                </a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className='btn-booking'>
                                        <a href='#'>
                                            <i className="fa-solid fa-bell-concierge"></i>
                                            Đặt phòng
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={`header-bottom ${isFixed ? 'fixed' : ''}`}>
                <Container>
                    <Row>
                        <Col className='px-0 col-md-12 col-12'>
                            <div className='header-bottom-left'>
                                <div className='header-bottom-left-box'>
                                    <div className='header-bottom-left-logo'>
                                        <a href='/'>
                                            <img src='https://cdn1872.cdn-template-4s.com/media/logo/logo_1.png' alt='CÔNG TY TNHH PHẦN MỀM NHÂN HÒA'/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='header-bottom-right'>
                                <div className='header-bottom-right-box'>
                                    <div className='header-bottom-right-menu'>
                                        <ul>
                                            <li>
                                                <a className={location.pathname === '/' ? 'active' : ''} href='/'>Trang chủ</a>
                                            </li>
                                            <li>
                                                <a href='#'>Giới thiệu</a>
                                            </li>
                                            <li>
                                                <a className={location.pathname === '/rooms' ? 'active' : ''} href='/rooms'>Phòng</a>
                                            </li>
                                            <li className='position-relative has-child'> 
                                                <a href='#'>
                                                    Thư viện
                                                    <i className="fa-solid fa-chevron-down"></i>
                                                </a>
                                                <ul className='entry-menu dropdown'>
                                                    <li>
                                                        <a className='menu-link' href='#'>Video</a>
                                                    </li>
                                                    <li>
                                                        <a className='menu-link' href='#'>Ảnh</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href='#'>Tin tức</a>
                                            </li>
                                            <li>
                                                <a href='#'>Liên hệ</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default MyHeader