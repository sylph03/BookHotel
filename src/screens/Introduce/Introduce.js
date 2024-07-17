import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";
import MyHeader from '../../components/Header/MyHeader';
import MyBreadCrumbs from '../../components/BreadCrumbs/MyBreadCrumbs';
import MyFooter from '../../components/Footer/MyFooter';
import MyCopyright from '../../components/Copyright/MyCopyright';
import { parse, format, isValid } from 'date-fns'; // Thư viện để xử lý ngày tháng

import './Introduce.css';

const Introduce = () => {
    const [dataIntroductions, setDataIntroductions] = useState([]);
    const [sortBy, setSortBy] = useState(''); // State để lưu trữ thông tin sắp xếp
    const [itemsPerPage, setItemsPerPage] = useState(12); // State để lưu trữ số lượng phần tử trên mỗi trang
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleItemClick = (sortBy) => {
        setSortBy(sortBy); // Cập nhật trạng thái sắp xếp
        setIsDropdownOpen(false);  // Đóng dropdown sau khi nhấp vào mục
    };

    const handleItemsPerPageChange = (numItems) => {
        setItemsPerPage(numItems); // Cập nhật số lượng phần tử trên mỗi trang
    };

    useEffect(() => {
        fetchIntroductions();
    }, [sortBy, itemsPerPage]); 

    const fetchIntroductions = () => {
        axios.get(`http://localhost:3000/api/introductions?sortBy=${sortBy}&limit=${itemsPerPage}`)
        .then(response => {
            setDataIntroductions(response.data);
        })
        .catch(error => {
            console.error('Đã xảy ra lỗi khi tìm nạp dữ liệu!', error);
        });
    };

    return (
        <div>
            <MyHeader/>
            <MyBreadCrumbs/>
            <div className="introduce">
                <Container>
                    <Row>
                        <Col className="col-md-12 col-12">
                            <div>
                                <div className="products-cat pb-5">
                                    <h1 className="mb-5 title-section fs-35 text-center">
                                        Giới thiệu
                                    </h1>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex flex-wrap justify-content-between bg-light p-3 mb-4">
                                    <div className="page-section">
                                        <span className="page-title">Hiển thị:</span>
                                        <span className={`page-variation ${itemsPerPage === 12 ? 'active' : ''}`} onClick={() => handleItemsPerPageChange(12)}>
                                            12
                                        </span>
                                        <span>/</span>
                                        <span className={`page-variation ${itemsPerPage === 24 ? 'active' : ''}`} onClick={() => handleItemsPerPageChange(24)}>
                                            24
                                        </span>
                                        <span>/</span>  
                                        <span className={`page-variation ${itemsPerPage === 36 ? 'active' : ''}`} onClick={() => handleItemsPerPageChange(36)}>
                                            36
                                        </span>
                                    </div>
                                    <div className="orderby-section">
                                        <div className="dropdown" ref={dropdownRef}>
                                            <span className="orderby-title" onClick={toggleDropdown}>
                                                Sắp xếp
                                                <i className={`fa-solid ${isDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                            </span>
                                            <div className={`dropdown-menus dropdown-menus-right ${isDropdownOpen ? 'show' : ''}`}>
                                                <span className="dropdown-itemz" onClick={() => handleItemClick('name')}>Theo tên</span>
                                                <span className="dropdown-itemz" onClick={() => handleItemClick('view')}>Theo lượt xem</span>   
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-lg-5 mb-4">
                                    <Row>
                                        {dataIntroductions.map(intro => (
                                            <Col className="px-4 col-lg-6 col-sm-6 col-12 mb-5" key={intro.id}>
                                                <div className="article-item swiper-slide bg-white hover">
                                                    <div className="inner-image hover-img">
                                                        <div className="ratio-3-2">
                                                            <a href={`/introduce/${intro.id}`} title={intro.title}>
                                                                <img className="img-fluid" alt={intro.title} src={intro.image_intro}/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="inner-content p-4">
                                                    <div className="post-date mb-3">{format(new Date(intro.created_at), 'dd/MM/yyyy')}</div>
                                                        <h4 className="article-title mb-3">
                                                            <a href={`/introduce/${intro.id}`} title={intro.title}>{intro.title}</a>
                                                        </h4>
                                                        <div className="article-description mb-3">
                                                            {intro.description}
                                                        </div>
                                                        <a className="color-highlight font-italic text-underline" href={`/introduce/${intro.id}`}>Xem thêm</a>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <MyFooter/>
            <MyCopyright/>
        </div>
    )
}

export default Introduce;
