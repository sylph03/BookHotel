import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import './MyFormBookingHome.css';

const MyFormBookingHome = () => {
    return (
        <div className='formBookingHome'>
            <Container>
                <Row>
                    <Col className="col-12 col-md-12">
                        <div className='formBookingHome-box'>
                            <form className='space-block-5'>
                                <Row className="justify-content-center">
                                    <Col className='px-4 col-lg-4 col-sm-4 col-12'>
                                        <div className='form-group mb-lg-0 mb-sm-0'>
                                            <input className='form-control' type='text' name='full-name' data-msg="Vui lòng nhập thông tin" placeholder="Họ và tên"/>
                                        </div>
                                    </Col>
                                    <Col className='px-4 col-lg-4 col-sm-4 col-12'>
                                        <div className='form-group mb-lg-0 mb-sm-0'>
                                            <input className='form-control' type='text' name='phone' data-msg="Vui lòng nhập thông tin" data-msg-phonevn="Số điện thoại chưa chính xác" placeholder="Số điện thoại"/>
                                        </div>
                                    </Col>
                                    <Col className='px-4 col-2 col-sm-3 col-12'>
                                        <div className='form-group mb-0'>
                                            <span nh-btn-action="submit" className="w-100">Đặt phòng</span>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MyFormBookingHome