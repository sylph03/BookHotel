import React from "react";
import { Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './MyGutters.css';

const customers = [
    {
        name: 'Olivia Simons',
        img: 'https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/top-36-anh-dai-dien-dep-cho-nu/anh-dai-dien-dep-cho-nu-che-mat-anime.jpg?1708401649581',
        text: 'Chúng tôi rất thích kỳ nghỉ tại khách sạn, nhân viên rất thân thiện và chu đáo với mọi nhu cầu của chúng tôi. Chúng tôi rất thích kỳ nghỉ tại khách sạn, nhân viên rất thân thiện và chu đáo với mọi nhu cầu của chúng tôi'
    },
    {
        name: 'Olivia Simons',
        img: 'https://techcare.vn/image/hinh-dai-dien-zalo-ngau-cho-nam-om0mx2f.jpg',
        text: 'Chúng tôi rất thích kỳ nghỉ tại khách sạn, nhân viên rất thân thiện và chu đáo với mọi nhu cầu của chúng tôi. Chúng tôi rất thích kỳ nghỉ tại khách sạn, nhân viên rất thân thiện và chu đáo với mọi nhu cầu của chúng tôi'
    }
];

const MyGutters = () => {
    return (
        <div className="gutters">
            <Row className="align-items-center mx-0">
                <Col className="px-0 col-lg-6 col-12 d-none d-lg-block">
                    <div className="ratio-3-2">
                        <img src="https://i.pinimg.com/originals/cd/eb/5a/cdeb5ab1a49b196524bebdc4197831a7.png" alt="Ý kiến khách hàng"/>
                    </div>
                </Col>
                <Col className="px-0 col-lg-6 col-12">
                    <div className="swiper-box">
                        <Swiper
                            modules={[Navigation]}
                            slidesPerView={1}
                            spaceBetween={0}
                            loop={true}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                        >
                            {customers.map((customer, index) => (
                                <SwiperSlide key={index}>
                                    <div className="swiper-item">
                                        <img src={customer.img} alt="Olivia Simons"/>
                                        <h4>{customer.name}</h4>
                                        <div className="swiper-item-text">
                                            <i className="fa-solid fa-quote-left"></i>
                                            <span>{customer.text}</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
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
    );
};

export default MyGutters;
