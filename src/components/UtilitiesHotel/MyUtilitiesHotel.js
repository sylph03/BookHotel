import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './MyUtilitiesHotel.css'

const MyUtilitiesHotel = () => {
    return (
        <div className="utilitiesHotel">
            <Container>
                <Row>
                    <Col className="col-md-12 col-12">
                        <div className="utilitiesHotel-box">
                            <h3>Tiện ích khách sạn</h3>
                            <Row>
                                <Col className="px-4 col-lg-6 col-sm-6 col-12">
                                    <div className="utilitiesHotel-box_item d-flex pb-lg-6">
                                        <img src="/thanh_pho.png" alt="Trung tâm thành phố"/>
                                        <div className="box_item-content">
                                            <h4>Trung tâm thành phố</h4>
                                            <p>Thuộc phường Láng Hạ, quận Đống Đa, thành phố Hà Nội,cách trung tâm thành phố 5km</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col className="px-4 col-lg-6 col-sm-6 col-12">
                                    <div className="utilitiesHotel-box_item d-flex pb-lg-6">
                                        <img src='/ho_boi.png' alt='Hồ bơi'/>
                                        <div className="box_item-content">
                                            <h4>Hồ bơi</h4>
                                            <p>Khách sạn có hồ bơi bốn mùa với hệ thống nước ấm nằm tại tầng 6. Trẻ em có thể bơi nhưng phải có sự giám sát của người lớn</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col className="px-4 col-lg-6 col-sm-6 col-12">
                                    <div className="utilitiesHotel-box_item d-flex pb-lg-6">
                                        <img src='/huong_nam.png' alt='Hướng Nam'/>
                                        <div className="box_item-content">
                                            <h4>Hướng Nam</h4>
                                            <p>Phía Đông Nam giáp phường Thịnh Quang-Đống Đa; Phía Tây Nam giáp quận Thanh Xuân</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col className="px-4 col-lg-6 col-sm-6 col-12">
                                    <div className="utilitiesHotel-box_item d-flex pb-lg-6">
                                        <img src='/tau_dien.png' alt='Tàu điện lân cận'/>
                                        <div className="box_item-content">
                                            <h4>Tàu điện lân cận</h4>
                                            <p>Các ga Thái Hà, Láng là những điểm thuộc Tuyến đường sắt đô thị Cát Linh - Hà Đông</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MyUtilitiesHotel