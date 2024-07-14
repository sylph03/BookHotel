import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MyHeader from '../../components/Header/MyHeader';
import MyBreadCrumbs from '../../components/BreadCrumbs/MyBreadCrumbs';
import MyFooter from '../../components/Footer/MyFooter';
import MyCopyright from '../../components/Copyright/MyCopyright';
import { useNavigate } from "react-router-dom";
import BookingSuccess from '../BookingSuccess/BookingSuccess'
import axios from "axios";

import './Payment.css';

const Payment = () => {

    const [customerData, setCustomerData] = useState(null);
    const [cartData, setCartData] = useState([]);
    const [note, setNote] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    // const [cartData1, setCartData1] = useState([])
    // const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    // const [bookingId, setBookingId] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const customerUserData = localStorage.getItem('customerUser');
        if (customerUserData) {
            setCustomerData(JSON.parse(customerUserData));
        }
    }, []);

    useEffect(() => {
        if (customerData && customerData.customer_id) {
            axios.get(`http://localhost:3000/api/carts/${customerData.customer_id}`)
                .then(response => {
                    setCartData(response.data);
                    const total = response.data.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
                    setTotalPrice(total);
                })
                .catch(error => {
                    console.error('Đã có lỗi xảy ra!', error);
                });
        }
    }, [customerData]);


    const handlePayment = () => {
        const bookingData = {
            customer_id: customerData.customer_id,
            start_date: null,
            end_date: null,
            total_price: cartData.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0),
            note: note,
            cartData: cartData,
            status: 'Đang chờ xử lý' // Thêm trạng thái vào dữ liệu đơn đặt hàng
        };
    
        axios.post('http://localhost:3000/api/payments', bookingData)
            .then(response => {
                console.log('Đơn đặt hàng đã được tạo:', response.data);

                // setBookingId(response.data.bookingId);
                // setIsPaymentSuccessful(true);
                // setCartData1(cartData);
                navigate('/success', {
                    state: {
                        bookingId: response.data.bookingId,
                        cartData: cartData,
                        customerData: customerData,
                        totalPrice: totalPrice,
                    }
                });
                // Lặp qua từng phần tử trong cartData để xóa từng phòng khỏi giỏ hàng
                const deletePromises = cartData.map(cartItem => {
                    return axios.delete(`http://localhost:3000/api/carts/${customerData.customer_id}/${cartItem.room_id}`);
                });
    
                // Chờ tất cả các yêu cầu xóa hoàn thành
                Promise.all(deletePromises)
                    .then(deleteResponses => {
                        console.log('Đã xóa khỏi giỏ hàng', deleteResponses);
    
                        // Sau khi xóa thành công, cập nhật lại danh sách giỏ hàng mới
                        axios.get(`http://localhost:3000/api/carts/${customerData.customer_id}`)
                            .then(response => {
                                setCartData(response.data);
                            })
                            .catch(error => {
                                console.error('Lỗi khi lấy lại giỏ hàng sau khi xóa:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Lỗi xóa khỏi giỏ hàng:', error);
                    });
            })
            .catch(error => {
                console.error('Lỗi khi tạo đơn đặt hàng:', error);
                // Xử lý lỗi khi thanh toán không thành công
            });
    };    

    return (
        <div className="bg-light">
            <MyHeader/>
            <MyBreadCrumbs mb="mb-5"/>
            <Container>
                {cartData.length === 0 ? 
                <div className="empty text-center my-5">
                    <i className="fa-solid fa-basket-shopping"></i>
                    <div className="empty-cart mb-4">
                        Bạn cần thêm một số sản phẩm vào giỏ hàng của mình.
                        <br/>
                        Vui lòng truy cập "Trang Chủ" và tìm sản phẩm của bạn.
                    </div>
                    <a href="/" className="btn-submit">Trang chủ</a>
                </div> :
                <div className="checkout-section mb-5">
                    <form id="order-info">
                        <Row className="mx-n2">
                            <Col id="order-info-left" className="col-lg-7 col-md-6 px-2">
                                <div className="bg-white p-4 mb-3">
                                    <div className="checkout-section-title fw-bold mb-4">
                                        Thông tin đặt hàng
                                    </div>
                                    <div className="srollbar" style={{maxHeight: "34rem", overflowX: "hidden"}}>
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
                                                        <div className="name-element fw-bold">
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
                                                                <span className="currency-symbol">VND</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        ))}
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
                                                <span className="inner-full-name">{customerData && customerData.full_name}</span>
                                            </p>
                                            <p className="mb-0">
                                                <span className="inner-phone">{customerData && customerData.phone}</span>
                                            </p>
                                            <p className="mb-0">
                                                <span className="inner-full-address">{customerData && customerData.address}</span>
                                            </p>
                                            <input type="hidden" name="callback"/>
                                        </div>
                                        <div className="inner-col-2 mb-5">
                                            <label>Ghi chú</label>
                                            <textarea onChange={(e) => {setNote(e.target.value)}} value={note} className="form-control border-gray" rows={2} cols={5}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col id="order-info-right" className="col-lg-5 col-md-6 px-2">
                                <div className="order-review">
                                    <div className="entry-order-review">
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
                                                    <span className="price-amount">
                                                        {totalPrice}
                                                        <span className="currency-symbol">VND</span>
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="checkout-payment bg-white p-4">
                                            <span onClick={handlePayment} className="btn-submit w-100 mb-3">Thanh toán</span>
                                            <a className="order-back fs-14 d-flex align-items-center color-main mt-14" href="/cart" >
                                                <i className="fa-solid fa-arrow-left me-2"></i>
                                                Quay lại giỏ hàng
                                            </a>
                                        </div>
                                    </div>
                                </div>  
                            </Col>
                        </Row>
                    </form>
                </div>
                }
            </Container>
            <MyFooter/>
            <MyCopyright/>
        </div>
    )
}

export default Payment;