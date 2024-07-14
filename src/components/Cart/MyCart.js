import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MyCart.css';

const MyCart = () => {
    const [customerData, setCustomerData] = useState(null);
    const [cartData, setCartData] = useState([]);
    const [quantities, setQuantities] = useState({});

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
                    const initialQuantities = response.data.reduce((acc, item) => {
                        acc[item.cart_id] = item.quantity || 1; 
                        return acc;
                    }, {});
                    setQuantities(initialQuantities);
                })
                .catch(error => {
                    console.error('Đã có lỗi xảy ra!', error);
                });
        }
    }, [customerData]);

    const handleAdd = (cart_id) => {
        setQuantities({
            ...quantities,
            [cart_id]: (quantities[cart_id] || 1) + 1
        });
    };

    const handleSubtract = (cart_id) => {
        setQuantities({
            ...quantities,
            [cart_id]: quantities[cart_id] > 1 ? quantities[cart_id] - 1 : 1
        });
    };

    const handleInputChange = (cart_id, value) => {
        const number = Number(value);
        if (!isNaN(number) && number > 0) {
            setQuantities({
                ...quantities,
                [cart_id]: number
            });
        }
    };

    const handleDelete = (roomId) => {
        const confirmDelete = () => {
            axios.delete(`http://localhost:3000/api/carts/${customerData.customer_id}/${roomId}`)
                .then(response => {
                    console.log('Đã xóa khỏi giỏ hàng', response.data);
                    // Cập nhật giỏ hàng sau khi xóa
                    return axios.get(`http://localhost:3000/api/carts/${customerData.customer_id}`);
                })
                .then(response => {
                    setCartData(response.data);
                })
                .catch(error => {
                    console.error('Lỗi xóa khỏi giỏ hàng:', error);
                });
        };
    
        toast.warn(
            <div>
                <p>Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?</p>
                <div className="toast-buttons">
                    <button className="btn-success btn-sm" onClick={confirmDelete}>Đồng ý</button>
                    <button className="btn-danger btn-sm" onClick={() => toast.dismiss('confirm-delete-toast')}>Hủy</button>
                </div>
            </div>,
            {
                autoClose: false
            }
        );
    };

    const handleConfirmCart = () => {
        const updateCartData = cartData.map(item => ({
            room_id: item.room_id,
            quantity: quantities[item.cart_id] || 1,
        }));

        Promise.all(updateCartData.map(item => 
            axios.put(`http://localhost:3000/api/carts/${customerData.customer_id}/${item.room_id}`, item)
        ))
        .then(responses => {
            console.log('Đã cập nhật số lượng giỏ hàng', responses);
            // toast.success('Giỏ hàng đã được cập nhật!');
        })
        .catch(error => {
            console.error('Lỗi cập nhật giỏ hàng:', error);
            toast.error('Lỗi cập nhật giỏ hàng. Vui lòng thử lại sau!');
        });
    };

    return (
        <div className="cart pt-5 pb-3">
            <Container>
            <ToastContainer 
                position="top-right"
                autoClose={2000}
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
                {cartData.length === 0 ? <div className="empty text-center my-5">
                    <i className="fa-solid fa-basket-shopping"></i>
                    <div className="empty-cart mb-4">
                        Bạn cần thêm một số sản phẩm vào giỏ hàng của mình.
                        <br/>
                        Vui lòng truy cập "Trang Chủ" và tìm sản phẩm của bạn.
                    </div>
                    <a href="/" className="btn-submit">Trang chủ</a>
                </div>
                :
                <div>
                    <div className="bg-white p-4">
                        <div className="cart-title">
                            Thông tin sản phẩm&nbsp;
                            <small>({cartData.length} Sản phẩm)</small>
                        </div>
                        <table className="cart-table cart-info-section responsive-table mb-0">
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th className="text-right">Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData.map((cartItem) => (
                                    <tr className="cart-item" key={cartItem.cart_id}>
                                        <th scope="row">
                                            <Row className="mx-n2">
                                                <Col className="col-lg-2 col-3 px-2">
                                                    <div className="rounded overflow-hidden ratio-1-1">
                                                        <a href="">
                                                            <img className="img-fluid" src={cartItem.image_url} alt={cartItem.room_name} />
                                                        </a>
                                                    </div>
                                                </Col>
                                                <Col className="col-lg-10 col-9 px-2">
                                                    <div className="flex-column d-flex">
                                                        <a href="">
                                                            <div className="name-cart">{cartItem.room_name}</div>
                                                        </a>
                                                        <div className="remove-cart mt-2">
                                                            <a onClick={() => handleDelete(cartItem.room_id)} className="fw-normal color-highlight cursor-pointer">Xóa</a>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </th>
                                        <td data-title="Giá">
                                            <span>{cartItem.price}</span>
                                            <span className="currency-symbol">VND</span>
                                        </td>
                                        <td data-title="Số lượng" className="item-quantity">
                                            <div className="product-quantity">
                                                <span onClick={() => handleSubtract(cartItem.cart_id)} className="btn-quantity quantity-subtract">
                                                    <i className="fa-solid fa-minus"></i>
                                                </span>
                                                <input
                                                    className="text-center number-input"
                                                    value={quantities[cartItem.cart_id] || 1}
                                                    maxLength={3}
                                                    inputMode="decimal"
                                                    onChange={(e) => handleInputChange(cartItem.cart_id, e.target.value)}
                                                />
                                                <span onClick={() => handleAdd(cartItem.cart_id)} className="btn-quantity quantity-add">
                                                    <i className="fa-solid fa-plus"></i>
                                                </span>
                                            </div>
                                        </td>
                                        <td data-title="Tiền" className="text-right">
                                            <span>{cartItem.price * (quantities[cartItem.cart_id] || 1)}</span>
                                            <span className="currency-symbol">VND</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Row>
                            <Col className="col-lg-6 ms-auto">
                                <div className="entire-cart-totals mt-4">
                                    <table className="cart-totals">
                                        <tbody>
                                            <tr className="order-total">
                                                <th>Tổng tiền</th>
                                                <td>
                                                    <b>
                                                        <span className="price-amount">
                                                            <span>{cartData.reduce((total, cartItem) => total + (cartItem.price * (quantities[cartItem.cart_id] || 1)), 0)}</span>
                                                            <span className="currency-symbol">VND</span>
                                                        </span>
                                                    </b>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="proceed-to-checkout">
                                        <a href="/payment" onClick={handleConfirmCart} className="btn-submit w-100">Xác nhận giỏ hàng</a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>}
            </Container>
        </div>
    )
}

export default MyCart;
