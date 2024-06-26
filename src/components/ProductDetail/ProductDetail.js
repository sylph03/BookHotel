import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";
import MyStar from '../Star/MyStar'

import './ProductDetail.css'

const ProductDetail = (props) => {

    const [count, setCount] = useState(1);
    const [ratingData, setRatingData] = useState({
        ratingCount: 0,
        ratingDistribution: {},
        averageRating: 0,
        customerRatings: []
    });

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/rooms/${props.room.room_id}/ratings`)
        .then(response => {
            setRatingData(response.data);
        })
        .catch(error => {
            console.error('Đã xảy ra lỗi khi tìm nạp dữ liệu!', error);
        })
    }, [props.room.room_id]);
    
    const countAdd = () => {
        setCount(count + 1);
    }; 
    const countSubtract = () => {
        setCount(count > 1 ? count - 1 : 1); // Đảm bảo count không dưới 1
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        const number = Number(value);

        // Chỉ cập nhật trạng thái nếu giá trị là số và lớn hơn 0
        if (!isNaN(number) && number > 0) {
            setCount(number);
        }
    };

    return (
        <div className="product-detail">
            <Container>
                <Row>
                    <Col className="px-4 col-md-12 col-12">
                        <div className="product-detail-head">
                            <Row>
                                <Col className="px-4 col-lg-6 col-12">
                                    <div className="product-detail-image mb-4">
                                        <div className="product-detail-image-top">
                                            <div className="position-relative">
                                                <img className="img-fluid" src={props.room.image_url}/>
                                            </div>
                                            <div className="additional-action">
                                                <div>
                                                    <a className="btn-additional-action btn-expand" href="#">
                                                        <img className="d-none" src={props.room.image_url} alt={props.room.room_name}/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col className="px-4 col-lg-6 col-12">
                                    <div className="product-content-detail">
                                        <h1 className="product-detail-title mb-3">{props.room.room_name}</h1>
                                        <div className="product-rating">
                                            <div className="star-rating me-1">
                                                    <MyStar readonly={true} rating={Math.floor(ratingData.averageRating)}/>
                                            </div>
                                            <span className="count">{`${ratingData.averageRating? `(${ratingData.ratingCount} Đánh giá)` : ''}`}</span>
                                            <div className="review-link ms-3"></div>
                                        </div>
                                        <div className="price mb-4">
                                            <span className="price-amount">Giá: {props.room.price}</span>
                                        </div>
                                        <div className="code mb-2">Mã sản phẩm:&nbsp; {props.room.room_id}</div>
                                        <div className="product-category mb-2">
                                            <label>Danh mục:&nbsp;</label>
                                            <a href="/rooms" target="_blank">Phòng</a>
                                        </div>
                                        <div className="d-flex flex-wrap mb-4">
                                            <div className="d-flex">
                                                <div className="product-quantity">
                                                    <span onClick={countSubtract} className="btn-quantity quantity-subtract">
                                                        <i className="fa-solid fa-minus"></i>
                                                    </span>
                                                    <input className="text-center number-input" value={count} maxLength={3} inputMode="decimal" onChange={handleInputChange}/>
                                                    <span onClick={countAdd} className="btn-quantity quantity-add">
                                                        <i className="fa-solid fa-plus"></i>
                                                    </span>
                                                </div>
                                                <div className="btn-cart-buy d-flex flex-wrap">
                                                    <a className="add-to-cart mx-3">Đặt phòng</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="social-share">
                                            <span className="share-title">
                                                <label className="mb-0">Chia sẻ: </label>
                                            </span>
                                            <div className="list-social">
                                                <div className="btn-social">
                                                    <a href="#">
                                                        <i className="fa-brands fa-facebook-f"></i>
                                                    </a>
                                                </div>
                                                <div className="btn-social">
                                                    <a href="#">
                                                        <i className="fa-brands fa-twitter"></i>
                                                    </a>
                                                </div>
                                                <div className="btn-social">
                                                    <a href="#">
                                                        <i className="fa-brands fa-google-plus-g"></i>
                                                    </a>
                                                </div>
                                                <div className="btn-social">
                                                    <a href="#">
                                                        <i className="fa-brands fa-pinterest-p"></i>
                                                    </a>
                                                </div>
                                                <div className="btn-social">
                                                    <a href="#">
                                                        <i className="fa-brands fa-linkedin-in"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="product-detail-footer my-5">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">Thông tin sản phẩm</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Đánh giá</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Bình luận</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="content">
                                    <div className="p-5 bg-light">
                                        <Row>
                                            <Col className="col-12">
                                                <main>
                                                    <section>
                                                        <div>
                                                            <p style={{lineHeight: 2}}>
                                                                <strong>Tiện nghi trong phòng bao gồm:</strong>
                                                            </p>
                                                            <p style={{lineHeight: 2}}>
                                                                * Tầm nhìn trực diện hướng biển
                                                                <br/>
                                                                * Giường Queen size (180 cm x 200 cm)
                                                                <br/>
                                                                * Tivi LED 42 inches công nghệ mới nhất có kết nối với HDMI và các thiết bị máy tính, USB… phục vụ nhu cầu giải trí cũng như làm việc của Quý khách.
                                                                <br/>
                                                                * Internet Wi-Fi và cáp tốc độ cao cùng bộ cổng kết nối đa năng.
                                                                <br/>
                                                                * Hệ thống điều hòa trung tâm điều chỉnh thay đổi nhiệt độ theo yêu cầu của khách.
                                                                <br/>
                                                                * Hệ thống chìa khóa phòng điện tử.
                                                                <br/>
                                                                * Điện thoại IDD cùng hệ thống thư thoại.
                                                                <br/>
                                                                * Tủ quần áo, áo choàng, dép đi trong phòng, máy sấy tóc, bàn là theo yêu cầu.
                                                                <br/>
                                                                * Ghế thư giãn, bàn làm việc/trang điểm, quạt trần trang trí.
                                                                <br/>
                                                                * Kệ hành lý, két sắt an toàn, mini bar, bộ pha trà / cà phê.
                                                                <br/>
                                                                * Cửa sổ mở trượt.
                                                                <br/>
                                                                * Khu vực bếp.
                                                                <br/>
                                                                * Tủ lạnh, bếp từ và lò vi sóng.
                                                                <br/>
                                                                Diện tích : 65 m2
                                                            </p>
                                                            <p style={{lineHeight: 2}}>
                                                                <strong>Sử dụng miễn phí:</strong>
                                                            </p>
                                                            <p style={{lineHeight: 2}}>
                                                                * Internet Wi-Fi miễn phí tại tất cả các phòng và khu vực công cộng trong khách sạn.
                                                                <br/>
                                                                * Miễn phí trà, cà phê cùng các dụng cụ pha chế và 2 chai nước suối mỗi ngày.
                                                                <br/>
                                                                * Dịch vụ dọn phòng theo yêu cầu mỗi ngày.
                                                                <br/>
                                                                * Sử dụng hồ bơi hướng biển, phòng thể hình, bồn sục thủy lực, xông hơi nước, hơi khô, khu vực dịch vụ văn phòng 24/7, bãi biển riêng, đường hầm ngầm dưới lòng đường Trần Phú nối ra biển.
                                                                <br/>
                                                                * Hầu hết tất cả các phòng đều không hút thuốc, được kết nối bằng hệ thống cửa hai lớp tiện dụng.
                                                                <br/>
                                                                <br/>
                                                                Phụ thu trẻ em hoặc người thứ 3 ở cùng phòng như sau:
                                                                <br/>
                                                                <br/>
                                                                VND 231,000nett/người/đêm (dành cho trẻ em từ 6 -11 tuổi)
                                                                <br/>
                                                                VND 462,000nett/người/đêm (dành cho trẻ em từ 12 tuổi trở lên hoặc người lớn)
                                                                <br/>
                                                                VND 693.000 nett/ giường phụ/ đêm
                                                                <br/>
                                                                Nếu quý khách có nhu cầu sử dụng phòng bếp, vui lòng liên hệ trước với chúng tôi theo địa chỉ email&nbsp;
                                                                <a href="#">contact@sm4s.vn</a>&nbsp;
                                                                ( để đảm bảo tiêu chuẩn khách sạn luôn được duy trì ), có thể có phí.  
                                                            </p>
                                                        </div>
                                                    </section>
                                                </main>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProductDetail