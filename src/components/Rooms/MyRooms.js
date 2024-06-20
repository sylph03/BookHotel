import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import MyProducts from '../../components/Products/MyProducts'

import './MyRooms.css';



const MyRooms = (props) => {
    return (
        <div className={`rooms ${props.bg_white} ${props.pt_0}`}>
            <Container >
                <Row>
                    <Col className="px-4 col-md-12 col-12">
                        <div className="rooms-box">
                            <div className="rooms-box-text">
                                <h3>{props.title}</h3>
                                <p>{props.text}</p>
                            </div>
                            <Swiper
                                modules={[Pagination]}
                                slidesPerView={2}
                                spaceBetween={30}
                                loop={false}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    320: { slidesPerView: 1, spaceBetween: 10 },
                                    768: { slidesPerView: 2, spaceBetween: 10 },
                                    992: { slidesPerView: 2, spaceBetween: 30 },
                                    1200: { slidesPerView: 2, spaceBetween: 30 },
                                }}
                            >
                                {props.room.map(room => (
                                    <SwiperSlide key={room.room_id}>
                                        <MyProducts room={room}/>
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

export default MyRooms;
