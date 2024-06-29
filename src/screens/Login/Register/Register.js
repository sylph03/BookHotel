import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import MyHeader from '../../../components/Header/MyHeader'
import MyFooter from '../../../components/Footer/MyFooter'
import MyCopyright from '../../../components/Copyright/MyCopyright'

import './Register.css'
import MyBreadCrumbs from "../../../components/BreadCrumbs/MyBreadCrumbs";

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
  
    const [errors, setErrors] = useState({
      fullName: "",
      userName: "",
      password: "",
      verifyPassword: "",
      email: "",
      phone: "",
      address: ""
    });
  
    const validateFullName = () => {
      if (fullName.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullName: "Vui lòng nhập họ và tên"
        }));
      } else if (fullName.trim().length < 6) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullName: "Thông tin nhập quá ngắn"
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullName: ""
        }));
      }
    };
  
    const validateUserName = () => {
      if (userName.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          userName: "Vui lòng nhập tên đăng nhập"
        }));
      } else if (userName.trim().length < 6) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          userName: "Tài khoản nhập quá ngắn"
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
      } else if (password.trim().length < 6) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Mật khẩu nhập quá ngắn"
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: ""
        }));
      }
    };
  
    const validateVerifyPassword = () => {
      if (verifyPassword.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          verifyPassword: "Vui lòng nhập xác nhận mật khẩu"
        }));
      } else if (verifyPassword.trim() !== password.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          verifyPassword: "Xác nhận mật khẩu chưa chính xác"
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          verifyPassword: ""
        }));
      }
    };
  
    const validateEmail = () => {
      if (email.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Vui lòng nhập email"
        }));
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email không hợp lệ"
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: ""
        }));
      }
    };
  
    const validatePhone = () => {
      if (phone.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Vui lòng nhập số điện thoại"
        }));
      } else if (phone.trim().length < 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Số điện thoại không hợp lệ"
        }));
      } else if (!phone.trim().startsWith("0")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Số điện thoại chưa đúng định dạng"
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: ""
        }));
      }
    };
  
    const validateAddress = () => {
      if (address.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: "Vui lòng nhập thông tin"
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: ""
        }));
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault(); // Ngăn chặn reload trang mặc định của form
    
      // Validate từng trường dữ liệu
      validateFullName();
      validateUserName();
      validatePassword();
      validateVerifyPassword();
      validateEmail();
      validatePhone();
      validateAddress();
    
      // Nếu không có lỗi, tiến hành gửi dữ liệu lên server
      if (
        errors.fullName === "" &&
        errors.userName === "" &&
        errors.password === "" &&
        errors.verifyPassword === "" &&
        errors.email === "" &&
        errors.phone === "" &&
        errors.address === "" &&
        fullName !== '' &&
        userName !== '' &&
        password !== '' &&
        verifyPassword !== '' &&
        email !== '' &&
        phone !== '' &&
        address !== ''
      ) {
        // Tạo object chứa dữ liệu cần gửi lên server
        const customerData = {
          full_name: fullName.trim(),
          user_name: userName.trim(),
          password: password.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim()
        };
    
        // Gửi request POST lên server
        axios.post('http://localhost:3000/api/customers', customerData)
          .then(response => {
            console.log(response.data); // Log kết quả từ server (nếu cần)
            localStorage.setItem('customerUser', JSON.stringify(customerData));
            toast.success('Đăng ký thành công!');
            setTimeout(() => {
              window.location.href='/'; // Điều hướng đến trang chủ sau khi hiển thị toast
            }, 1500); // Chờ 1 giây trước khi điều hướng
          })
          .catch(error => {
            console.error('There was an error!', error);
            if (error.response && error.response.status === 400) {
              const errorMessage = error.response.data.message;
              if (errorMessage === 'Username already exists') {
                toast.error('Tài khoản đã được đăng ký');
              } else if (errorMessage === 'Email already exists') {
                toast.error('Email đã được đăng ký');
              } else if (errorMessage === 'Phone number already exists') {
                toast.error('Phone đã được đăng ký');
              } else {
                toast.error('Đăng ký thất bại!');
              }
            }
          });
      }
    };
    
    return (
      <div>
        <MyHeader/>
        <MyBreadCrumbs mb="m-0"/>
        <div className="register login">
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
                  <Col className="p-4 col-xl-6 col-lg-8 col-md-10 col-12">
                      <div className="rounded shadow bg-white">
                          <div className="login-title">Đăng Ký</div>
                          <form onSubmit={handleSubmit} id="member-register">
                              <div className="p-5">   
                                  <Row>
                                      <Col className="px-4 col-md-6 col-12">
                                          <div className="form-group mb-5">
                                              <input value={fullName} onChange={e => setFullName(e.target.value)}  onBlur={validateFullName} name="full_name" type="text" className="form-control required" placeholder="Họ và tên *"/>
                                              {errors.fullName && <label style={{display: "inline-block"}} id="full_name-error" className="error invalid-feedback">{errors.fullName}</label>}
                                          </div>
                                      </Col>
                                      <Col className="px-4 col-md-6 col-12">
                                          <div className="form-group mb-5">
                                              <input value={userName} onChange={e => setUserName(e.target.value)} onBlur={validateUserName} name="username" type="text" className="form-control required" placeholder="Tài khoản *"/>
                                              {errors.userName && <label style={{display: "inline-block"}} id="username-error" className="error invalid-feedback">{errors.userName}</label>}
                                          </div>
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col className="px-4 col-md-6 col-12">
                                          <div className="form-group mb-5">
                                              <input value={password} onChange={e => setPassword(e.target.value)}  onBlur={validatePassword} name="password" id="password-register" type="password" className="form-control required" placeholder="Mật khẩu *"/>
                                              {errors.password && <label style={{display: "inline-block"}} id="password-register-error" className="error invalid-feedback">{errors.password}</label>}
                                          </div>
                                      </Col>
                                      <Col className="px-4 col-md-6 col-12">
                                          <div className="form-group mb-5">
                                              <input value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} onBlur={validateVerifyPassword} name="verify_password" type="password" className="form-control required" placeholder="Xác nhận mật khẩu *"/>
                                              {errors.verifyPassword && <label style={{display: "inline-block"}} id="verify_password-error" className="error invalid-feedback">{errors.verifyPassword}</label>}
                                          </div>
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col className="px-4 col-md-6 col-12">
                                          <div className="form-group mb-5">
                                              <input value={email} onChange={e => setEmail(e.target.value)}  onBlur={validateEmail} name="email" type="text" className="form-control required" placeholder="Email *"/>
                                              {errors.email && <label style={{display: "inline-block"}} id="email-error" className="error invalid-feedback">{errors.email}</label>}
                                          </div>
                                      </Col>
                                      <Col className="px-4 col-md-6 col-12">
                                          <div className="form-group mb-5">
                                              <input value={phone} onChange={e => setPhone(e.target.value)}  onBlur={validatePhone} name="phone" type="text" className="form-control required" placeholder="Số điện thoại *"/>
                                              {errors.phone && <label style={{display: "inline-block"}} id="phone-error" className="error invalid-feedback">{errors.phone}</label>}
                                          </div>
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col className="col-12">
                                          <div className="form-group mb-5">
                                              <input value={address} onChange={e => setAddress(e.target.value)}  onBlur={validateAddress} name="address" type="text" className="form-control required" placeholder="Địa chỉ *"/>
                                              {errors.address && <label style={{display: "inline-block"}} id="address-error" className="error invalid-feedback">{errors.address}</label>}
                                          </div>
                                      </Col>
                                  </Row>
                                  <button type="submit" className="btn-submit w-100 mb-4">Đăng ký</button>
                                  <div className="swap-login">
                                      Bạn đã có tài khoản?&nbsp;
                                      <Link to="/login">Đăng nhập</Link>
                                  </div>
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

export default Register
