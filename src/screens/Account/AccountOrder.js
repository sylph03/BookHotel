import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import MyHeader from '../../components/Header/MyHeader';
import MyBreadCrumbs from '../../components/BreadCrumbs/MyBreadCrumbs';
import MyFooter from '../../components/Footer/MyFooter';
import MyCoppyright from '../../components/Copyright/MyCopyright';
import AccoutSidebar from "./AccoutSidebar";
import { parse, format, isValid } from 'date-fns'; // Thư viện để xử lý ngày tháng
// import '../../components/Cart/MyCart.css';
import './Account.css';

const AccountOrder = () => {
    const [customerData, setCustomerData] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const customerUserData = localStorage.getItem('customerUser');
        if (customerUserData) {
            setCustomerData(JSON.parse(customerUserData));
        }
    }, []);

    useEffect(() => {
        if (customerData) {
            axios.get(`http://localhost:3000/api/bookings/customer/${customerData.customer_id}`)
                .then(response => {
                    setOrders(response.data);
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                    toast.error('Có lỗi xảy ra khi lấy dữ liệu đơn hàng');
                });
        }
    }, [customerData]);

    return (
        <div>
            <MyHeader />
            <MyBreadCrumbs mb="mb-0" />
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
                            <AccoutSidebar customerData={customerData} setCustomerData={setCustomerData} />
                        </Col>
                        <Col className="col-12 col-md-9 col-lg-9 px-2">
                            <div className="h-100 bg-white p-4">
                                <form className="h-100">
                                    <div className="list-order-element h-100">
                                        <table className="table responsive-table mb-30">
                                            <thead>
                                                <tr>
                                                    <th>Mã đơn hàng</th>
                                                    <th>Tiền</th>
                                                    <th>Ngày đặt hàng</th>
                                                    <th>Trạng thái</th>
                                                    <th style={{ width: "75px" }}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders.map(order => (
                                                    <tr key={order.booking_id}>
                                                        <th scope="row">
                                                            <a href={`/accountOrderDetail/${order.booking_id}`}>{order.booking_id}</a>
                                                        </th>
                                                        <td>{order.total_price} VND</td>
                                                        <td>{format(new Date(order.created_at), 'dd/MM/yyyy')}</td>
                                                        <td>
                                                            <span className={`fw-normal badge ${
                                                                order.status === 'Đang chờ xử lý' ? 'badge-primary' :
                                                                order.status === 'Đã xác nhận' ? 'badge-success' :
                                                                order.status === 'Đã hủy' ? 'badge-danger' :
                                                                'badge-secondary'
                                                            }`}>{order.status}</span>
                                                        </td>
                                                        <td className="text-left">
                                                            &nbsp;
                                                            <div className="d-inline-block" style={{ width: "22px" }}></div>
                                                            <div className="d-inline-block" style={{ width: "22px" }}>
                                                                <a href="" className="text-dark">
                                                                    <i className="fa-solid fa-xmark"></i>
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <MyFooter />
            <MyCoppyright />
        </div>
    );
}

export default AccountOrder;
