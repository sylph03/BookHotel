import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './MyOffers.css';

const hotelRooms = [
    {
        title: 'Chi nhánh khách sạn Miami Beach mới của chúng tôi đã mở cửa!',
        image: 'https://cdn1872.cdn-template-4s.com/thumbs/articles/tin-tuc-4_thumb_500.jpg',
        date: '01 tháng 07, 2022',
        text: 'Khách sạn gồm 311 phòng được chia thành các hạng phòng từ tiêu chuẩn đến cao cấp. Mang cảm hứng từ hình ảnh hoa sen - biểu tượng văn hóa ...'    
    },
    {
        title: 'Tiệc Cocktail Cho Tất Cả Khách Hàng Thứ Bảy Tuần Này',
        image: 'https://cdn1872.cdn-template-4s.com/thumbs/articles/tin-tuc-3_thumb_500.jpg',
        date: '02 tháng 07, 2022',
        text: ' Khách sạn gồm 311 phòng được chia thành các hạng phòng từ tiêu chuẩn đến cao cấp. Mang cảm hứng từ hình ảnh hoa sen - biểu tượng văn hóa ...'    
    },
    {
        title: 'Tháng này chỉ giảm giá 10% vào thứ Sáu',
        image: 'https://cdn1872.cdn-template-4s.com/thumbs/articles/tin-tuc-2_thumb_500.jpg',
        date: '03 tháng 07, 2022',
        text: ' Khách sạn gồm 311 phòng được chia thành các hạng phòng từ tiêu chuẩn đến cao cấp. Mang cảm hứng từ hình ảnh hoa sen - biểu tượng văn hóa ...'    
    },
    {
        title: 'Kỷ niệm 20 năm thành lập khách sạn',
        image: 'https://cdn1872.cdn-template-4s.com/thumbs/articles/tin-tuc-1_thumb_500.jpg',
        date: ' tháng 07, 2022',
        text: ' Khách sạn Five Star Hà Nội kỷ niệm 20 năm thành lập, đánh dấu hai thập kỷ cung cấp dịch vụ đẳng cấp quốc tế, cam kết không ngừng cải thiện chất lượng dịch vụ'    
    },
];

const MyOffers = () => {
    return (
        <div className="offers">
            <Container>
                <Row>
                    <Col className="px-4 col-md-12 col-12">
                        <div className="offers-box">
                            <h3>Ưu đãi đặc biệt</h3>
                            <Swiper
                                modules={[Pagination]}
                                slidesPerView={3}
                                spaceBetween={30}
                                loop={false}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    320: { slidesPerView: 1, spaceBetween: 10 },
                                    480: { slidesPerView: 1, spaceBetween: 10 },
                                    768: { slidesPerView: 2, spaceBetween: 10 },
                                    992: { slidesPerView: 3, spaceBetween: 10 },
                                    1200: { slidesPerView: 3, spaceBetween: 30 },
                                }}
                            >
                                {hotelRooms.map((room, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="article-item">
                                            <div className="article-image">
                                                <div className="ratio-3-2">
                                                    <a href="#" title={room.title}>
                                                        <img src={room.image} alt={room.title} />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="article-content p-4">
                                                <div className="article-content-date">{room.date}</div>
                                                <h4 className="article-content-title">
                                                    <a href='#' title={room.title}>{room.title}</a>
                                                </h4>
                                                <p>{room.text}</p>
                                                <a href="#">Xem thêm</a>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MyOffers;
