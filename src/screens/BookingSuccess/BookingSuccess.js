import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MyHeader from '../../components/Header/MyHeader';
import MyBreadCrumbs from '../../components/BreadCrumbs/MyBreadCrumbs';
import MyFooter from '../../components/Footer/MyFooter';
import MyCopyright from '../../components/Copyright/MyCopyright';
import { useLocation } from 'react-router-dom';
import axios from "axios";

import './BookingSuccess.css';

const BookingSuccess = () => {

    const location = useLocation();
    const { bookingId, cartData, customerData, totalPrice } = location.state;

    return (
        <div className="bg-light">
            <MyHeader/>
            <MyBreadCrumbs mb="mb-5"/>
            <Container>
                <div className="order-section mb-5">
                    <div className="alert alert-success text-center mb-3">
                        Chúc mừng quý khách đã đặt hàng thành công.
                        <strong> Mã đơn hàng: {bookingId}</strong>
                    </div>
                    <div className="order-info mb-3 bg-white p-4">
                        <div className="order-item">
                            <div className="checkout-section-title fw-bold mb-4">
                                Địa chỉ giao hàng
                            </div>
                            <div className="mb-2">
                                <b>Họ và tên: </b>
                                {customerData.full_name}
                            </div>
                            <div className="mb-2">
                                <b>Số điện thoại: </b>
                                {customerData.phone}
                            </div>
                            <div className="mb-2">
                                <b>Email: </b>
                                {customerData.email}
                            </div>
                            <div className="mb-2">
                                <b>Địa chỉ: </b>
                                {customerData.address}
                            </div>
                        </div>
                    </div>
                    <Row className="mx-n2">
                        <Col className="col-lg-7 col-md-6 px-2">
                            <div className="bg-white p-4 mb-3">
                                <div className="checkout-section-title fw-bold mb-4">
                                    Thông tin đặt hàng
                                </div>
                                <div className="scrollbar" style={{maxHeight: "34rem", overflow: "hidden"}}>
                                    {cartData.map((cartItem, index) => (
                                        <Row key={cartItem.cart_id} className={`mx-n2 ${index !== cartData.length - 1 ? 'mb-4' : ''}`}>
                                            <Col className="col-2 px-2">
                                                <div className="ratio-1-1">
                                                    <a href="">
                                                        <img className="img-fluid object-contain" src={cartItem.image_url} alt={cartItem.room_name}/>
                                                    </a>
                                                </div>
                                            </Col>
                                            <Col className="col-10 px-2">
                                                <div className="top-name-right">
                                                    <div className="name-element font-weight-bold">
                                                        <a className="color-main" href="">
                                                            {cartItem.room_name}
                                                        </a>
                                                    </div>
                                                    <div>
                                                        Số lượng:&nbsp;
                                                        <span>
                                                            {cartItem.quantity}
                                                        </span>
                                                    </div>
                                                    <div className="price-quantity">
                                                        <span className="price-amount">
                                                            {cartItem.total_price}
                                                            <span className="currency-symbol">
                                                            VND 
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    ))}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-lg-5 col-md-6 px-2">
                            <div className="p-4 bg-white">
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Đơn giá</span>
                                    <span className="text-right">
                                        <strong>
                                            <span className="price-amount">
                                                {totalPrice}
                                                <span className="currency-symbol">VND</span>
                                            </span>
                                        </strong>
                                    </span>
                                </div>
                                <div className="separation-dash mb-3"></div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Thành tiền</span>
                                    <span className="color-hover text-right">
                                        <strong>
                                            <span className="price-amount">
                                                {totalPrice}
                                                <span className="currency-symbol">VND</span>
                                            </span>
                                        </strong>
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            <MyFooter/>
            <MyCopyright/>
        </div>
    )
}

export default BookingSuccess;