import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Modal, Table, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import TopbarAdmin from '../../../components/TopbarAdmin/TopbarAdmin';
import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import './OrderManager.css';
import '../../Admin/Admin.css';

const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [errors, setErrors] = useState({ orderDetails: "" });
    const [editOrder, setEditOrder] = useState({ start_date: '', end_date: '', status: '' });
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/bookings`);
            setOrders(response.data);
        } catch (error) {
            console.error("There was an error fetching the orders!", error);
            toast.error('Lỗi khi lấy danh sách đơn hàng!');
        }
    };

    const handleDelete = (orderId) => {
        const confirmDelete = () => {
            axios.delete(`http://localhost:3000/api/bookings/delete/${orderId}`)
                .then(response => {
                    console.log('Đã xóa đơn hàng', response.data);
                    toast.success('Đơn hàng đã được xóa thành công');
                    fetchOrders();
                })
                .catch(error => {
                    console.error('Lỗi xóa đơn hàng:', error);
                    toast.error('Không thể xóa đơn hàng');
                });
        };

        toast.warn(
            <div>
                <p>Bạn có muốn xóa đơn hàng này không?</p>
                <div className="toast-buttons">
                    <button className="btn-success btn-sm" onClick={confirmDelete}>Đồng ý</button>
                    <button className="btn-danger btn-sm" onClick={() => toast.dismiss()}>Hủy</button>
                </div>
            </div>,
            {
                autoClose: false
            }
        );
    };

    const handleViewDetails = (order) => {
        setSelectedOrderId(order.booking_id);  // Chắc chắn rằng tên trường đúng
        setShowDetailModal(true);
        setEditOrder({ start_date: order.start_date, end_date: order.end_date, status: order.status });
    };

    const handleEditOrder = (order) => {
        setEditOrder({ start_date: order.start_date, end_date: order.end_date, status: order.status });
        setSelectedOrderId(order.booking_id);
        setShowEditModal(true);
    };

    useEffect(() => {
        if (selectedOrderId) {
            fetchOrderDetails(selectedOrderId);
        }
    }, [selectedOrderId]);

    const fetchOrderDetails = async (bookingId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/bookingRooms/${bookingId}`);
            setOrderDetails(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
            setErrors({ ...errors, orderDetails: 'Không thể tải chi tiết đơn hàng.' });
        }
    };

    const handleCloseDetailModal = () => {
        setSelectedOrderId(null);
        setOrderDetails([]);
        setShowDetailModal(false);
    };

    const handleCloseEditModal = () => {
        setSelectedOrderId(null);
        setEditOrder({ start_date: '', end_date: '', status: '' });
        setShowEditModal(false);
    };

    const handleSaveChanges = async () => {
        // Kiểm tra các trường bắt buộc
        if (!editOrder.start_date || !editOrder.end_date || !editOrder.status) {
            toast.error('Các trường bắt buộc phải được cung cấp.');
            return;
        }
    
        // Chuyển đổi định dạng ngày tháng
        const formatDate = (date) => {
            const d = new Date(date);
            return d.toISOString().split('T')[0]; // Lấy phần ngày tháng từ định dạng ISO
        };
    
        const updatedStartDate = formatDate(editOrder.start_date);
        const updatedEndDate = formatDate(editOrder.end_date);
    
        // Chuyển đổi giá trị status
        const statusMap = {
            'pending': 'Đang chờ xử lý',
            'confirmed': 'Đã xác nhận',
            'completed': 'Đã hoàn thành',
            'cancelled': 'Đã hủy'
        };
    
        const updatedStatus = statusMap[editOrder.status];
    
        if (!updatedStatus) {
            toast.error('Trạng thái không hợp lệ.');
            return;
        }
    
        try {
            await axios.put(`http://localhost:3000/api/bookings/${selectedOrderId}`, {
                ...editOrder,
                start_date: updatedStartDate,
                end_date: updatedEndDate,
                status: updatedStatus
            });
            toast.success('Cập nhật đơn hàng thành công!');
            fetchOrders();  // Cập nhật danh sách đơn hàng
            handleCloseEditModal();  // Đóng modal
        } catch (error) {
            if (error.response) {
                console.error('Error status:', error.response.status);
                console.error('Error data:', error.response.data);
                toast.error(`Lỗi: ${error.response.data.message || 'Không thể cập nhật đơn hàng'}`);
            } else if (error.request) {
                console.error('Error request:', error.request);
                toast.error('Lỗi khi gửi yêu cầu');
            } else {
                console.error('Error message:', error.message);
                toast.error('Lỗi xảy ra');
            }
        }
    };
    

    return (
        <div className="main-wrapper">
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
            <SidebarAdmin/>

            <div className="page-wrapper">
                <TopbarAdmin />

                <div className="body-wrapper">
                    <div className="container-fluid">
                        <div className="font-weight-medium shadow-none position-relative overflow-hidden mb-7">
                            <div className="card-body px-0">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 className="font-weight-medium fs-14 mb-0">Danh sách đơn hàng</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Card>
                            <Card.Body>
                                <Table className="order-table">
                                    <thead>
                                        <tr>
                                            <th>Mã đơn hàng</th>
                                            <th>Mã khách hàng</th>
                                            <th>Ngày đặt</th>
                                            <th>Ngày trả</th>
                                            <th>Tổng tiền</th>
                                            <th>Trạng thái</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.booking_id}> 
                                                <td>{order.booking_id}</td>
                                                <td>{order.customer_id}</td>
                                                <td>{order.start_date ? format(new Date(order.start_date), 'dd/MM/yyyy') : 'N/A'}</td>
                                                <td>{order.end_date ? format(new Date(order.end_date), 'dd/MM/yyyy') : 'N/A'}</td>
                                                <td>{order.total_price} VND</td>
                                                <td>{order.status}</td>
                                                <td>
                                                    <a className="action-icon" onClick={() => handleViewDetails(order)}>
                                                        <i className="fa-regular fa-eye"></i>
                                                    </a>
                                                    <a onClick={() => handleEditOrder(order)} className="action-icon">
                                                        <i className="fa-regular fa-edit"></i>
                                                    </a>
                                                    <a onClick={() => handleDelete(order.booking_id)} className="action-icon">
                                                        <i className="fa-regular fa-trash-can"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Modal Xem Chi Tiết Đơn Hàng */}
            <Modal className="custom-modal" show={showDetailModal} onHide={handleCloseDetailModal}>
                <Modal.Header className="p-4" closeButton>
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {orderDetails.length > 0 ? (
                        <>
                            <p>Mã đơn hàng: {orderDetails[0].booking_id}</p>
                            <p>Khách hàng: {orderDetails[0].full_name}</p>
                            <p>Điện thoại: {orderDetails[0].phone}</p>
                            <p>Email: {orderDetails[0].email}</p>
                            <p>Địa chỉ: {orderDetails[0].address}</p>
                            <p>Trạng thái: {orderDetails[0].status}</p>
                            <p>Tổng tiền: {orderDetails[0].total_price} VND</p>
                            <br />
                            {orderDetails.map((detail, index) => (
                                <div key={index}>
                                    <p>Tên phòng: {detail.room_name}</p>
                                    <p>Số lượng: {detail.quantity}</p>
                                    <p>Giá: {detail.price} VND</p>
                                    <img src={detail.image_url} alt={detail.room_name} style={{ width: '100%', height: 'auto' }} />
                                    <hr />
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>Đang tải chi tiết đơn hàng...</p>
                    )}
                </Modal.Body>
            </Modal>

            {/* Modal Cập Nhật Đơn Hàng */}
            <Modal className="custom-modal" show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header className="p-4" closeButton>
                    <Modal.Title>Cập nhật đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formStartDate">
                            <Form.Label>Ngày đặt</Form.Label>
                            <Form.Control
                                type="date"
                                value={editOrder.start_date ? format(new Date(editOrder.start_date), 'yyyy-MM-dd') : ''}
                                onChange={(e) => setEditOrder({ ...editOrder, start_date: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEndDate">
                            <Form.Label>Ngày trả</Form.Label>
                            <Form.Control
                                type="date"
                                value={editOrder.end_date ? format(new Date(editOrder.end_date), 'yyyy-MM-dd') : ''}
                                onChange={(e) => setEditOrder({ ...editOrder, end_date: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Control
                                as="select"
                                value={editOrder.status || ''}
                                onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}
                            >
                                <option value="pending">Đang chờ xử lý</option>
                                <option value="confirmed">Đã xác nhận</option>
                                <option value="completed">Đã hoàn thành</option>
                                <option value="cancelled">Đã hủy</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" onClick={handleSaveChanges}>Lưu thay đổi</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default OrderManager;
