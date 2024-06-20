import { Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import './MyHeader.css';

const MyHeader = () => {

    const location = useLocation();

    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 650) {
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

    return (
        <div className='header'>
            <div className='header-top'>
                <Container>
                    <Row>
                        <Col className='col-md-12 col-12'>
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
                                        <a href='/register'>
                                            <i className="fa-solid fa-user"></i>
                                            Tài khoản
                                        </a>
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
                        <Col className='col-md-12 col-12'>
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