import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './MyFooter.css'

const MyFooter = () => {
    return (
        <div className="myFooter">
            <Container>
                <Row>
                    <Col className="px-4 col-md-4 col-12">
                        <h5 className="footer-title">Theo dõi tôi</h5>
                        <p className="footer-text">Và luôn cập nhật với chúng tôi</p>
                        <ul className="footer-list mb-0">
                            <li>
                                <a className="footer-link">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a className="footer-link">
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a className="footer-link">
                                    <i className="fa-brands fa-google-plus-g"></i>
                                </a>
                            </li>
                            <li>
                                <a className="footer-link">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                            </li>
                            <li>
                                <a className="footer-link">
                                    <i className="fa-brands fa-youtube"></i>
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col className="px-4 col-md-4 col-12">
                        <h5 className="footer-title">Liên hệ</h5>
                        <p className="footer-lienhe">
                            <i className="fa-solid fa-location-dot"></i>
                            Tầng A, Tòa nhà số B Hà Nội
                        </p>
                        <p className="footer-lienhe">
                            <i className="fa-solid fa-phone"></i>
                            1900 121234 - 0989662289
                        </p>
                        <p className="footer-lienhe">
                            <i className="fa-solid fa-envelope"></i>
                            email@gmail.com
                        </p>
                    </Col>
                    <Col className="px-4 col-md-4 col-12">
                        <h5 className="footer-title">Đăng ký nhận tin</h5>
                        <p className="footer-text">Đăng ký nhận bản tin của chúng tôi để nhận được ưu đãi độc quyền.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MyFooter

