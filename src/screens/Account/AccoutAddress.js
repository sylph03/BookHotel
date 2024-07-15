import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import MyHeader from '../../components/Header/MyHeader';
import MyBreadCrumbs from '../../components/BreadCrumbs/MyBreadCrumbs';
import MyFooter from '../../components/Footer/MyFooter';
import MyCoppyright from '../../components/Copyright/MyCopyright';
import AccoutSidebar from "./AccoutSidebar";

const AccountAddress = () => {

    const [customerData, setCustomerData] = useState(null);
    const [newAddress, setNewAddress] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const customerUserData = localStorage.getItem('customerUser');
        if (customerUserData) {
            setCustomerData(JSON.parse(customerUserData));
        }
    }, []);

    const validateAddress = () => {
        if (newAddress.trim() === "") {
            setError("Vui lòng nhập thông tin");
            return false;
        }
        setError("");
        return true;
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn submit mặc định của form

        if (!validateAddress()) {
            return;
        }

        axios.put(`http://localhost:3000/api/customers/${customerData.customer_id}/changeAddress`, { address: newAddress })
            .then(response => {
                toast.success("Địa chỉ đã được cập nhật");
                const updatedCustomerData = {
                    ...customerData,
                    address: newAddress,
                };
                localStorage.setItem('customerUser', JSON.stringify(updatedCustomerData));
                setCustomerData(updatedCustomerData);
                setNewAddress("");
            })
            .catch(error => {
                toast.error("Lỗi khi cập nhật địa chỉ");
                console.error("Lỗi khi cập nhật địa chỉ:", error);
            });
    };

    return (
        <div>
            <MyHeader/>
            <MyBreadCrumbs mb="mb-0"/>
            <div className="account bg-light pb-5 pt-5">
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
                            <AccoutSidebar customerData={customerData} setCustomerData={setCustomerData}/>
                        </Col>
                        <Col className="col-12 col-md-9 col-lg-9 px-2">
                            <div className="h-100 bg-white p-4">
                                <div className="address-member">
                                    <div className="item-address-member border-bottom pb-4 mb-3">
                                        <div className="name-address-member fw-bold">Mặc định</div>
                                        <div className="phone-address-member mb-1">
                                            {customerData && customerData.phone}
                                        </div>
                                        <div className="full-address mb-1">
                                            {customerData && customerData.address}
                                        </div>
                                        <div className="d-flex justify-content-betweenn">
                                            <div className="color-hover d-flex align-items-center">
                                                <i className="fa-solid fa-location-dot"></i>
                                                <span className="ms-2">Địa chỉ mặc định</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="fw-bold">Chỉnh sửa địa chỉ</div>
                                    <form onSubmit={handleAddressSubmit}>
                                        <label className="form-label">Địa chỉ mới</label>
                                        <input value={newAddress} onChange={(e) => setNewAddress(e.target.value)} type="text" className="form-control mb-3" placeholder="Nhập địa chỉ mới"/>
                                        {error && <label style={{display: "inline-block"}} id="full_name-error" className="error invalid-feedback">{error}</label>}
                                        <button type="submit" className="btn-submit">Cập nhật</button>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <MyFooter/>
            <MyCoppyright/>
        </div>
    );
}

export default AccountAddress;
