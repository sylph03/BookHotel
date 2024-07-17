import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import axios from "axios";
import MyHeader from '../../components/Header/MyHeader';
import MyBreadCrumbs from '../../components/BreadCrumbs/MyBreadCrumbs';
import MyFooter from '../../components/Footer/MyFooter';
import MyCoppyright from '../../components/Copyright/MyCopyright';
import AccoutSidebar from "./AccoutSidebar";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns'; // Không cần parse và isValid nếu không sử dụng
import './Account.css';

const AccountOrderDetail = () => {
    const [customerData, setCustomerData] = useState(null);
    const [orderRooms, setOrderRooms] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        // Function to fetch order details based on booking_id
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/bookingRooms/${id}`);
                setOrderRooms(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        // Fetch customer data from localStorage (assuming it's stored there)
        const customerUserData = localStorage.getItem('customerUser');
        if (customerUserData) {
            setCustomerData(JSON.parse(customerUserData));
        }

        // Call fetchOrderDetails when component mounts
        fetchOrderDetails();
    }, [id]);

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
                            <div className="bg-white p-4 mb-4">
                                <h4>Thông tin cá nhân</h4>
                                <Row>
                                    <div className="col-12 col-sm-6">
                                        <p className="mb-2">Mã đơn hàng: {orderRooms.length > 0 && orderRooms[0].booking_id}</p>
                                        <p className="mb-2">Họ và tên: {customerData && customerData.full_name}</p>
                                        <p className="mb-2">Số điện thoại: {customerData && customerData.phone}</p>
                                        <p className="mb-2">Email: {customerData && customerData.email}</p>
                                        <p className="mb-2">Địa chỉ: {customerData && customerData.address}</p>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <p className="mb-2">
                                            Trạng thái:
                                            <span> {orderRooms.length > 0 && orderRooms[0].status}</span>
                                        </p>
                                    </div>
                                </Row>
                            </div>
                            <div className="bg-white p-4">
                                <h4 className="my-4">Thông tin sản phẩm</h4>
                                <table className="table responsive-table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>Giá</th>
                                            <th>Số lượng</th>
                                            <th className="text-right">Tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderRooms.map((orderRoom, index) => (
                                            <tr key={index} className="cart_item">
                                                <th scope="row">
                                                    <a href="">
                                                        <img className="img-fluid me-2" width={50} src={orderRoom.image_url} alt="Room"/>
                                                        {orderRoom.room_name}
                                                    </a>
                                                </th>
                                                <td>
                                                    <span className="price-amount">
                                                        <span>{orderRoom.price}</span>
                                                        <span className="currency-symbol">VND</span>
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>{orderRoom.quantity}</span>
                                                </td>
                                                <td className="text-right">
                                                    <span className="price-amount">
                                                        <span>{orderRoom.quantity * orderRoom.price}</span>
                                                        <span className="currency-symbol">VND</span>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="color-hover fs-14 bg-gray">
                                            <td>
                                                <b>Tổng tiền</b>
                                            </td>
                                            <td className="text-right">
                                                <b>
                                                    <span className="price-amount">
                                                        <span>{orderRooms.length > 0 && orderRooms[0].total_price}</span>
                                                        <span className="currency-symbol">VND</span>
                                                    </span>
                                                </b>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
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

export default AccountOrderDetail;
