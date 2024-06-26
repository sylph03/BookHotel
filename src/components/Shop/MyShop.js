import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";
import MyProducts from '../../components/Products/MyProducts';
import './MyShop.css';

const MyShop = () => {
    const [dataRooms, setDataRooms] = useState([]);
    const [sortBy, setSortBy] = useState(''); // State để lưu trữ thông tin sắp xếp
    const [itemsPerPage, setItemsPerPage] = useState(12); // State để lưu trữ số lượng phần tử trên mỗi trang
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        fetchRooms();
    }, [sortBy, itemsPerPage]); // Gọi fetchRooms khi sortBy hoặc itemsPerPage thay đổi

    const fetchRooms = () => {
        axios.get(`http://localhost:3000/api/rooms?sortBy=${sortBy}&limit=${itemsPerPage}`)
        .then(response => {
            setDataRooms(response.data);
        })
        .catch(error => {
            console.error('Đã xảy ra lỗi khi tìm nạp dữ liệu!', error);
        });
    };

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

    return (
        <div className="shop">
            <Container>
                <Row>
                    <Col className="col-md-12 col-12">
                        <div className="view-sort-box">
                            <div className="view-sort">
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
                                            <span className="dropdown-itemz" onClick={() => handleItemClick('name')}>Sắp xếp theo tên</span>
                                            <span className="dropdown-itemz" onClick={() => handleItemClick('priceAsc')}>Giá từ thấp đến cao</span>
                                            <span className="dropdown-itemz" onClick={() => handleItemClick('priceDesc')}>Giá từ cao đến thấp</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Row>
                                {dataRooms.map(room => (
                                    <Col className="px-4 col-xl-4 col-md-6 col-12 mb-5" key={room.room_id}>
                                        <MyProducts room={room}/>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default MyShop;
