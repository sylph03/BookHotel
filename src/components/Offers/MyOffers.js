import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { parse, format, isValid } from 'date-fns'; // Thư viện để xử lý ngày tháng

import 'swiper/css';
import 'swiper/css/pagination';
import './MyOffers.css';

const MyOffers = () => {
    const [dataIntroductions, setDataIntroductions] = useState([]);
    useEffect(() => {
        fetchIntroductions();
    }); 

    const fetchIntroductions = () => {
        axios.get(`http://localhost:3000/api/introductions`)
        .then(response => {
            setDataIntroductions(response.data);
        })
        .catch(error => {
            console.error('Đã xảy ra lỗi khi tìm nạp dữ liệu!', error);
        });
    };
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
                                {dataIntroductions.map((intro, index) => (
                                    intro.role === "news" &&
                                    <SwiperSlide key={index}>
                                        <div className="article-item">
                                            <div className="article-image">
                                                <div className="ratio-3-2">
                                                    <a href={`/news/${intro.id}`} title={intro.title}>
                                                        <img src={intro.image_intro} alt={intro.title} />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="article-content p-4">
                                                <div className="article-content-date">{format(new Date(intro.created_at), 'dd/MM/yyyy')}</div>
                                                <h4 className="article-content-title">
                                                    <a href={`/news/${intro.id}`} title={intro.title}>{intro.title}</a>
                                                </h4>
                                                <p>{intro.description}</p>
                                                <a href={`/news/${intro.id}`}>Xem thêm</a>
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
