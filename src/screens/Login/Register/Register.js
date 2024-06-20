import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import './Register.css'

const Register = () => {
    return (
        <div className="register bg-light vh-100 d-flex justify-content-center align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col className="px-4 col-xl-6 col-lg-8 col-md-10 col-12">
                        <div className="rounded shadow bg-white">
                            <div className="register-title">Đăng Ký</div>
                            <form id="member-register">
                                <div className="p-5">
                                    <Row>
                                        <Col className="px-4 col-md-6 col-12">
                                            <div className="form-group mb-5">
                                                <input name="full_name" type="text" className="form-control required" placeholder="Họ và tên *"/>
                                            </div>
                                        </Col>
                                        <Col className="px-4 col-md-6 col-12">
                                            <div className="form-group mb-5">
                                                <input name="username" type="text" className="form-control required" placeholder="Tài khoản *"/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="px-4 col-md-6 col-12">
                                            <div className="form-group mb-5">
                                                <input name="password" id="password-register" type="password" className="form-control required" placeholder="Mật khẩu *"/>
                                            </div>
                                        </Col>
                                        <Col className="px-4 col-md-6 col-12">
                                            <div className="form-group mb-5">
                                                <input name="verify_password" type="password" className="form-control required" placeholder="Xác nhận mật khẩu *"/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="px-4 col-md-6 col-12">
                                            <div className="form-group mb-5">
                                                <input name="email" type="text" className="form-control required" placeholder="Email *"/>
                                            </div>
                                        </Col>
                                        <Col className="px-4 col-md-6 col-12">
                                            <div className="form-group mb-5">
                                                <input name="phone" type="text" className="form-control required" placeholder="Số điện thoại *"/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-12">
                                            <div className="form-group mb-5">
                                                <input name="address" type="text" className="form-control required" placeholder="Địa chỉ *"/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <button className="btn btn-submit w-100 mb-4">Đăng ký</button>
                                    <div className="swap-login">
                                        Bạn đã có tài khoản?&nbsp;
                                        <a href="#">Đăng nhập</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register
