import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import MyHeader from '../../../components/Header/MyHeader'
import MyFooter from '../../../components/Footer/MyFooter'
import MyCopyright from '../../../components/Copyright/MyCopyright'
import MyBreadCrumbs from '../../../components/BreadCrumbs/MyBreadCrumbs'

import './LogIn.css'

const LogIn = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({
        userName: "",
        password: "",
        check: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const customerUserData = localStorage.getItem('customerUser');  
        if (customerUserData) {
            navigate('/'); 
        }
    }, []);
    
    const validateUserName = () => {
        if (userName.trim() === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            userName: "Vui lòng nhập tài khoản"
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            userName: ""
          }));
        }
      };
    
      const validatePassword = () => {
        if (password.trim() === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Vui lòng nhập mật khẩu"
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: ""
          }));
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateUserName();
        validatePassword();

        if (errors.userName === "" && errors.password === "" && userName !== '' && password !== '') {
            try {
                const response = await axios.get(`http://localhost:3000/api/customers/${userName}`);
                const customerData = response.data;

                if (!customerData || customerData.password !== password.trim()) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        check: true
                    }));
                } else {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        check: false
                    }));
                    localStorage.setItem('customerUser', JSON.stringify(customerData));
                    toast.success('Đăng nhập thành công!');
                    setTimeout(() => {
                        if (customerData.user_name === 'admin') {
                            window.location.href = '/admin'; // Điều hướng đến trang admin nếu người dùng là admin
                        } else {
                            window.location.href = '/'; // Điều hướng đến trang chủ nếu không phải là admin
                        }
                    }, 1000); // Chờ 1 giây trước khi điều hướng
                }
            } catch (error) {
                console.error('Error logging in:', error);
                setErrors(prevErrors => ({
                    ...prevErrors,
                    check: true
                }));
            }
        };
    }
    return (
        <div>
            <MyHeader/>
            <MyBreadCrumbs mb="m-0"/>
            <div className="login">
                <ToastContainer 
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    toastClassName="custom-toast"
                />
                <Container>
                    <Row className="justify-content-center">
                        <Col className="p-4 col-xl-5 col-lg-6 col-md-8 col-12">
                            <div className="rounded shadow bg-white">
                                <div className="login-title">Đăng nhập</div>
                                <form onSubmit={handleSubmit} id="member-login">
                                    <div className="p-5">
                                        {/* <Row className="mx-n2">
                                            <Col className="px-2 col-md-6 col-12">
                                                <span className="fs-4 btn-submit d-flex align-items-center justify-content-center text-center mb-3 rounded">
                                                    <i className="fa-2x  fa-brands fa-google me-3"></i>
                                                    &nbsp;Đăng Nhập Google
                                                </span>
                                            </Col>
                                            <Col className="px-2 col-md-6 col-12">
                                                <span className="fs-4 btn-submit d-flex align-items-center justify-content-center text-center mb-3 rounded">
                                                    <i className="fa-2x  fa-brands fa-facebook me-3"></i>
                                                    Đăng Nhập Facebook
                                                </span>
                                            </Col>
                                        </Row>
                                        <div className="orAccount">
                                            <span>Hoặc tài khoản</span>
                                        </div> */}
                                        <div className="form-group mb-4">
                                            <input value={userName} onChange={e => setUserName(e.target.value)} type="text" className="form-control required" placeholder="Tài khoản"/>
                                            {errors.userName && <label style={{display: "inline-block"}} className="error invalid-feedback">{errors.userName}</label>}
                                        </div>
                                        <div className="form-group mb-4">
                                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control required" placeholder="Mật khẩu"/>
                                            {errors.password && <label style={{display: "inline-block"}} className="error invalid-feedback">{errors.password}</label>}
                                        </div>
                                        <a className="forgot-password" href="#">Quên mật khẩu ?</a>
                                        <button type="submit" className="btn-submit w-100 mb-3">
                                            Đăng nhập
                                        </button>
                                        {errors.check && <label style={{display: "inline-block"}} className="error invalid-feedback">Tài khoản hoặc mật khẩu không đúng</label>}
                                        <Link to="/register" className="register-now">
                                            Đăng ký ngay
                                        </Link>
                                    </div>
                                </form>
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

export default LogIn