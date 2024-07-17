import React, { useEffect, useState } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { format } from 'date-fns'; // Thư viện để xử lý ngày tháng
import MyHeader from '../../components/Header/MyHeader'
import MyBreadCrumbs from '../../components/BreadCrumbs/MyBreadCrumbs'
import MyFooter from "../../components/Footer/MyFooter";
import MyCopyright from "../../components/Copyright/MyCopyright";
import './Introduce.css';

const IntroduceDetail = () => {
    const { id } = useParams();
    const [introduction, setIntroduction] = useState(null);
    const [otherIntroductions, setOtherIntroductions] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/introductions/${id}?limit=7`)
            .then(response => {
                setIntroduction(response.data.introduction);
                setOtherIntroductions(response.data.otherIntroductions);
            })
            .catch(error => {
                console.error('Đã xảy ra lỗi khi tìm nạp dữ liệu!', error);
            });
    }, [id]);

    return (
        <div className='introduceDetail'>
            <MyHeader/>
            <MyBreadCrumbs introduction={introduction} />
            <div>
                <Container>
                    <Row>
                        <Col className="px-4 col-md-12 col-12">
                            {introduction && (
                                <div className='mb-lg-6 mb-5'>
                                    <div className='article-detail'>
                                        <h1 className='mb-4 title-article-detail'>{introduction.title}</h1>
                                        <div className='mb-3'>
                                            Tác giả
                                            <span className='fw-600 mx-2 pr-2 border-right border-gray'>
                                                {introduction.author}&nbsp; 
                                            </span>
                                            <span className='post-date'>
                                                {format(new Date(introduction.created_at), 'dd/MM/yyyy')}
                                            </span>
                                        </div>
                                        {introduction.title === "Nội thất đẹp" && 
                                            <div className='mb-3'>
                                                <div className='ratio-3-2'>
                                                    <img className='img-fluid' src="https://cdn1872.cdn-template-4s.com/media/articles/gioi-thieu-1.jpg" alt={introduction.title}/>
                                                </div>
                                            </div>
                                        }
                                        <div className='mb-5' dangerouslySetInnerHTML={{ __html: introduction.details }} />
                                        <div className='social-share d-flex align-items-center flex-wrap mb-3'>
                                            <span className='share-title'>
                                                <label className='mb-0'>Chia sẻ: </label>
                                            </span>
                                            <div className='list-social'>
                                                <div className='btn-social'>
                                                    <a href=''>
                                                        <i className="fa-brands fa-facebook-f"></i>
                                                    </a>
                                                </div>
                                                <div className='btn-social'>
                                                    <a href=''>
                                                        <i className="fa-brands fa-twitter"></i>
                                                    </a>
                                                </div>
                                                <div className='btn-social'>
                                                    <a href=''>
                                                        <i className="fa-brands fa-google-plus-g"></i>
                                                    </a>
                                                </div>
                                                <div className='btn-social'>
                                                    <a href=''>
                                                        <i className="fa-brands fa-pinterest-p"></i>
                                                    </a>
                                                </div>
                                                <div className='btn-social'>
                                                    <a href=''>
                                                        <i className="fa-brands fa-linkedin-in"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
            <div>
                <Container>
                    <Row>
                        <Col className='px-4 col-md-12 col-12'>
                            <div className='mb-lg-6 mb-5'>
                                <h3 className='title-section text-center'>
                                    Bài viết cùng loại
                                </h3>
                                <Swiper
                                    modules={[Pagination]}
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    loop={false}
                                    pagination={{ clickable: true }}
                                    breakpoints={{
                                        320: { slidesPerView: 1, spaceBetween: 10 },
                                        768: { slidesPerView: 2, spaceBetween: 10 },
                                        992: { slidesPerView: 3, spaceBetween: 30 },
                                        1200: { slidesPerView: 3, spaceBetween: 30 },
                                    }}
                                >
                                    {otherIntroductions.map(intro => (
                                        <SwiperSlide key={intro.id}>
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
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
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

export default IntroduceDetail;
