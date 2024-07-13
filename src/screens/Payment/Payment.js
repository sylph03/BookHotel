import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MyHeader from '../../components/Header/MyHeader';
import MyBreadCrumbs from '../../components/BreadCrumbs/MyBreadCrumbs';
import MyFooter from '../../components/Footer/MyFooter';
import MyCopyright from '../../components/Copyright/MyCopyright';

import './Payment.css';

const Payment = () => {
    return (
        <div>
            <MyHeader/>
            <MyBreadCrumbs/>
            <Container>
                <div className="checkout-section mb-5">
                    <from id="order-info">
                        <Row className="mx-n2">
                            <Col id="order-info-left" className="col-lg-7 col-md-6 px-2">
                                <div className="bg-white p-4 mb-3">
                                    <div className="checkout-section-title fw-bold mb-4">
                                        Thông tin đặt hàng
                                    </div>
                                    <div className="srollbar" style={{maxHeight: "34rem", overflowX: "hidden"}}>
                                        <Row className="mx-n2">
                                            <Col className="col-2 px-2">
                                                <div className="ratio-1-1">
                                                    <a href="">
                                                        <img className="img-fluid object-contain" src="https://cdn1872.cdn-template-4s.com/thumbs/products/san-pham-1_thumb_350.jpg" alt=""/>
                                                    </a>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className="bg-white p-4 mb-3">
                                    <div className="billing-details mt-4">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div className="checkout-section-title fw-bold mb-0">
                                                Địa chỉ nhận hàng
                                            </div>
                                            <a href="" className="color-main">Thay đổi</a>
                                        </div>
                                        <div className="entry-account-detail mb-5">
                                            <p className="mb-0">
                                                <span className="inner-full-name">testName</span>
                                            </p>
                                            <p className="mb-0">
                                                <span className="inner-phone">0123456688</span>
                                            </p>
                                            <p className="mb-0">
                                                <span className="inner-full-address">Hà Nội</span>
                                            </p>
                                            <input type="hidden" name="callback"/>
                                        </div>
                                        <div className="inner-col-2 mb-5">
                                            <label>Ghi chú</label>
                                            <textarea className="form-control border-gray" rows={2} cols={5}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </from>
                </div>
            </Container>
            <MyFooter/>
            <MyCopyright/>
        </div>
    )
}

export default Payment;