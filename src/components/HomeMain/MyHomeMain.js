import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './MyHomeMain.css';

const MyHomeMain = () => {
    return (
        <div className='homeMain'>
            <Row className='no-gutter'>
                <Col className='col-md-12 col-12'>
                    <div className='homeMain-box'>
                        <Swiper
                            modules={[Navigation, Pagination]}
                            slidesPerView={1}
                            spaceBetween={0}
                            loop = {true}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            pagination={{ 
                                clickable: true,
                                el: '.swiper-pagination',
                             }}
                        >
                            <SwiperSlide>
                                <div className='homeMain-item'>
                                    <img src='https://khachsan02.web4s.com.vn/templates/fashion03/assets/media/slider/slide2.jpg' alt='Trải nghiệm khách sạn sang trọng'/>
                                    <div className='homeMain-item-content'>
                                        <h2>Trải nghiệm khách sạn sang trọng</h2>
                                        <p>Khách sạn gồm 311 phòng được chia thành các hạng phòng từ tiêu chuẩn đến cao cấp. Mang cảm hứng từ hình ảnh hoa sen - biểu tượng văn hóa Việt Nam, với quy mô 36 tầng, khách sạn đã trở thành công trình ấn tượng ở địa phương.</p>
                                        <a className='btn' href='#'>Xem chi tiết</a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='homeMain-item'>
                                    <img src='https://khachsan02.web4s.com.vn/templates/fashion03/assets/media/slider/slide1.jpg' alt='Vị trí thuận tiện'/>
                                    <div className='homeMain-item-content'>
                                        <h2>Vị trí thuận tiện</h2>
                                        <p>Khách sạn Five Star tọa lạc trên đường Láng Hạ, Hà Nội,. Khách sạn cách sân bay quốc tế Nội bài khoảng 20 km, cách trung tâm thành phố 5km, rất thuận tiện cho việc di chuyển.</p>
                                        <a href='#'>Xem chi tiết</a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <div className="swiper-pagination position-absolute mt-0"></div>

                            <div className="swiper-button-next">
                                <i className="fa-solid fa-angle-right"></i>
                            </div>
                            <div className="swiper-button-prev">
                                <i className="fa-solid fa-angle-left"></i>
                            </div>
                        </Swiper>
                    </div>
                </Col>
            </Row>
        </div>
            
    )
}

export default MyHomeMain