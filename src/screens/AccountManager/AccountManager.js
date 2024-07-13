import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import { parse, format, isValid } from 'date-fns'; // Thư viện để xử lý ngày tháng

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AccountManager.css';
import MyHeader from '../../components/Header/MyHeader';
import MyBreadCrumbs from '../../components/BreadCrumbs/MyBreadCrumbs';
import MyFooter from '../../components/Footer/MyFooter';
import MyCoppyright from '../../components/Copyright/MyCopyright';

const AccountManager = () => {
    let { changePassword } = useParams();

    const [customerData, setCustomerData] = useState(null);
    const [page, setPage] = useState(changePassword ? 'changePassword' : 'personalInfo');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const customerUserData = localStorage.getItem('customerUser');
        if (customerUserData) {
            const parsedData = JSON.parse(customerUserData);
            setCustomerData(parsedData);
            setFullName(parsedData.full_name);
            setGender(parsedData.sex);

            // Chuyển đổi ngày sinh từ định dạng yyyy-MM-dd sang đối tượng Date
            if (parsedData.birthday) {
                const parsedDate = new Date(parsedData.birthday);
                if (isValid(parsedDate)) {
                    setStartDate(parsedDate);
                } else {
                    console.error('Ngày sinh không hợp lệ:', parsedData.birthday);
                }
            }
        }
    }, []);

    const formattedBirthday =  customerData && customerData.birthday ? format(new Date(customerData.birthday), 'dd/MM/yyyy') : '';

    const handleLogout = () => {
        localStorage.removeItem('customerUser');
        setCustomerData(null);
    };

    const validateOldPassword = () => {
        if (oldPassword.trim() === "") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              oldPassword: "Vui lòng nhập mật khẩu"
            }));
          } else if (oldPassword.trim().length < 6) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              oldPassword: "Mật khẩu nhập quá ngắn"
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              oldPassword: ""
            }));
          }
      };

    const validateNewPassword = () => {
        if (newPassword.trim() === "") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              newPassword: "Vui lòng nhập mật khẩu"
            }));
          } else if (newPassword.trim().length < 6) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              newPassword: "Mật khẩu nhập quá ngắn"
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              newPassword: ""
            }));
          }
      };

      const validateConfirmPassword = () => {
        if (confirmPassword.trim() === "") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              confirmPassword: "Vui lòng nhập xác nhận mật khẩu"
            }));
          } else if (confirmPassword.trim() !== newPassword.trim()) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              confirmPassword: "Xác nhận mật khẩu chưa chính xác"
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              confirmPassword: ""
            }));
          }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        validateOldPassword();
        validateNewPassword();
        validateConfirmPassword();
    
        if (errors.oldPassword === '' && oldPassword !== '' &&
            errors.newPassword === '' && newPassword !== '' &&
            errors.confirmPassword === '' && confirmPassword !== ''
        ) {
            if (customerData.password !== oldPassword) {
                toast.error("Mật khẩu cũ nhập không chính xác");
                return;
            }
            if (customerData.password === newPassword) {
                toast.error("Mật khẩu thay đổi không thể giống mật khẩu cũ");
                return;
            }
    
            try {
                // Call API to change password
                const response = await axios.put(`http://localhost:3000/api/customers/${customerData.customer_id}/changePassword`, { newPassword } );
    
                // Handle success response
                console.log(response.data); // Log response data or update UI accordingly
                
                setCustomerData(prevState => ({
                    ...prevState,
                    password: newPassword
                }));

                // Save updated customerData to localStorage
                localStorage.setItem('customerUser', JSON.stringify(customerData));

                // Clear form fields or reset state
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setErrors({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                toast.success('Password changed successfully!');
            } catch (error) {
                console.error('Error changing password:', error);
                toast.error('Failed to change password. Please try again.');
            }
        }
    };
    
    const handleCancel = () => {
        setErrors({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPage('personalInfo');
    };

    const handleUpdate = () => {
        if (!customerData || !customerData.customer_id) {
            console.error('Không tìm thấy thông tin khách hàng');
            return;
        }

        let birthday = null;
        if (startDate && isValid(startDate)) {
            // Chuyển đổi ngày từ đối tượng Date sang định dạng yyyy-MM-dd
            birthday = format(startDate, 'yyyy-MM-dd');
        }
    
        const infoCustomer = {
            full_name: fullName,
            birthday: birthday,
            sex: gender || null,
        };
    
        axios.put(`http://localhost:3000/api/customers/${customerData.customer_id}`, infoCustomer)
            .then(response => {
                console.log('Cập nhật thông tin khách hàng thành công', response.data);
                toast.success("Cập nhật thành công!");
    
                // Update customerData in localStorage
                const updatedCustomerData = {
                    ...customerData,
                    full_name: fullName,
                    birthday: birthday,
                    sex: gender
                };
                localStorage.setItem('customerUser', JSON.stringify(updatedCustomerData));
    
                setCustomerData(updatedCustomerData);
                setPage('personalInfo');
            })
            .catch(error => {
                console.error('Lỗi khi cập nhật thông tin khách hàng', error);
            });
    };
    

    
    return(
        <div>
            <MyHeader/>
            <MyBreadCrumbs mb="mb-0"/>
            <div className="accountManager bg-light pb-5 pt-5">
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
                <Container className="mt-3">
                    <Row className="mx-n2">
                        <Col className="col-12 col-md-3 col-lg-3 px-2">
                            <div className="h-100 bg-white p-4">
                                <div className="profile-top-left">
                                    <div className="img-profile text-center">
                                        <div className="avatar-upload">
                                            <div className="avatar-edit">
                                                <input type="file" id="imageUpload"/>
                                                <label>Sửa</label>
                                            </div>
                                            <div className="avatar-preview">
                                                <div style={{backgroundImage: `url(${customerData && customerData.customer_image ? customerData.customer_image : 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'})`}}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="name-profile">
                                        {customerData && customerData.full_name}
                                    </div>
                                </div>
                                <div className="member-categories-section">
                                    <div className="fw-bold my-3">Tài khoản của tôi</div>
                                    <div className="active" >
                                        <a href="#" className="active">
                                            <i className="fa-solid fa-user me-2"></i>
                                            Thông tin cá nhân
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <i className="fa-solid fa-map-location-dot me-2"></i>
                                            Địa chỉ nhận hàng
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <i className="fa-solid fa-clipboard-list me-2"></i>
                                            Đơn hàng
                                        </a>
                                    </div>
                                    {/* <div>
                                        <a href="/cart">
                                            <i class="fa-solid fa-cart-shopping me-2"></i>
                                            Giỏ hàng
                                        </a>
                                    </div> */}
                                    <a onClick={(handleLogout)} href="/" className="btn-submit d-block mt-4 text-white rounded-0">Đăng xuất</a>
                                </div>
                            </div>
                        </Col>
                        {page==='personalInfo' && <Col className="col-12 col-md-9 col-lg-9 px-2">
                            <div className="bg-white h-100 p-4">
                                <div className="title-profile">
                                    Hồ sơ của tôi
                                </div>
                                <p className="mb-5">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                                <ul className="member-categories-section list-unstyled mb-0 mt-3">
                                    <li className="d-flex justify-content-between pb-3 mb-3 border-bottom border-gray">
                                        <span>Tên</span>
                                        <span><strong>{customerData && customerData.full_name}</strong></span>
                                    </li>
                                    {(customerData && customerData.sex) && <li className="d-flex justify-content-between pb-3 mb-3 border-bottom border-gray">
                                        <span>Giới tính</span>
                                        <span><strong>{customerData && customerData.sex}</strong></span>
                                    </li>}
                                    {(customerData && customerData.birthday) && <li className="d-flex justify-content-between pb-3 mb-3 border-bottom border-gray">
                                        <span>Ngày sinh</span>
                                        <span><strong>{formattedBirthday}</strong></span>
                                    </li>}
                                    <li className="d-flex justify-content-between pb-3 mb-3 border-bottom border-gray">
                                        <span>Email</span>
                                        <span><strong>{customerData && customerData.email}</strong></span>
                                    </li>
                                    <li className="d-flex justify-content-between pb-3 mb-3 border-bottom border-gray">
                                        <span>Số điện thoại</span>
                                        <span><strong>{customerData && customerData.phone}</strong></span>
                                    </li>
                                    <li className="d-flex justify-content-between pb-3 mb-3 border-bottom border-gray">
                                        <span>Mã khách hàng</span>
                                        <span><strong>{customerData && customerData.customer_id}</strong></span>
                                    </li>
                                </ul>
                                <div className="btn-repair-info mt-5 justify-content-end">
                                    <Link to="/accountManager/changePassword" onClick={() => setPage('changePassword')} className="btn-submit">Thay đổi mật khẩu</Link>
                                    <a onClick={() => setPage('repairInfo')} className="btn-submit">Sửa thông tin</a>
                                </div>
                            </div>
                        </Col>}
                        {page==='changePassword' && <Col className="col-12 col-md-9 col-lg-9 px-2">
                            <div className="bg-white h-100 p-4">
                            <form onSubmit={handleSubmit}>
                            <Row>
                                <Col className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label>
                                            Mật khẩu
                                            <span className="required">*</span>
                                        </label>
                                        <input
                                            onBlur={validateOldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            value={oldPassword}
                                            id="old_password"
                                            className="form-control"
                                            type="password"
                                        />
                                        {errors.oldPassword && (
                                            <label style={{ display: "inline-block" }} className="error invalid-feedback">
                                                {errors.oldPassword}
                                            </label>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-md-6 col-12">
                                    <div onBlur={validateNewPassword} className="form-group">
                                        <label>
                                            Mật khẩu mới
                                            <span className="required">*</span>
                                        </label>
                                        <input
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            value={newPassword}
                                            id="new_password"
                                            className="form-control"
                                            type="password"
                                        />
                                        {errors.newPassword && (
                                            <label style={{ display: "inline-block" }} className="error invalid-feedback">
                                                {errors.newPassword}
                                            </label>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label>
                                            Nhập lại mật khẩu
                                            <span className="required">*</span>
                                        </label>
                                        <input
                                            onBlur={validateConfirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            value={confirmPassword}
                                            id="re_password"
                                            className="form-control"
                                            type="password"
                                        />
                                        {errors.confirmPassword && (
                                            <label style={{ display: "inline-block" }} className="error invalid-feedback">
                                                {errors.confirmPassword}
                                            </label>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                            <div className="form-group mt-3 btn-repair-info">
                                <button type="submit" className="btn-submit">
                                    Cập nhật
                                </button>
                                <Link to="/accountManager" onClick={handleCancel} className="btn-submit">
                                    Hủy
                                </Link>
                            </div>
                        </form>
                            </div>
                        </Col>}
                        {page==='repairInfo' && <Col className="col-12 col-md-9 col-lg-9 px2">
                            <div className="h-100 bg-white p-4">
                                <div className="title-profile">
                                    Sửa thông tin
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label>
                                            Họ và tên
                                            <span className="required">*</span>
                                        </label>
                                        <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-control" type="text"/>
                                    </div>
                                    <Row>
                                        <Col className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Ngày sinh:</label>
                                                <div>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                    placeholderText="dd/mm/yyyy"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Giới tính:</label>
                                                <select value={gender || ''} onChange={(e) => setGender(e.target.value)} className="form-control form-control-sm selectpicker">
                                                    <option value="">-- Giới tính --</option>
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                    <option value="Khác">Khác</option>
                                                </select>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="form-group btn-repair-info">
                                        <span onClick={handleUpdate} className="btn-submit">Cập nhật</span>
                                        <span onClick={()=> setPage('personalInfo')} className="btn-submit">Hủy</span>
                                    </div>
                                </form>
                            </div>
                        </Col>}
                    </Row>
                </Container>
            </div>
            <MyFooter/>
            <MyCoppyright/>
        </div>
    )
}

export default AccountManager