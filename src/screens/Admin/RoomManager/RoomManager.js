import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopbarAdmin from '../../../components/TopbarAdmin/TopbarAdmin';
import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import './RoomManager.css';
import '../../Admin/Admin.css';

const RoomManager = () => {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // Giả sử bạn có API để lấy danh sách phòng
        axios.get(`http://localhost:3000/api/rooms?limit=${100}`)
            .then(response => {
                setRooms(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the rooms!", error);
                toast.error('Lỗi khi lấy danh sách phòng!');
            });
    }, []);

    const handleDelete = (roomId) => {
        const confirmDelete = () => {
            axios.delete(`http://localhost:3000/api/rooms/delete/${roomId}`)
                .then(response => {
                    console.log('Đã xóa phòng', response.data);
                    toast.success('Phòng đã được xóa thành công');
    
                    // Cập nhật lại danh sách phòng sau khi xóa
                    axios.get(`http://localhost:3000/api/rooms?limit=100`)
                        .then(response => {
                            setRooms(response.data);
                        })
                        .catch(error => {
                            console.error('Lỗi cập nhật danh sách phòng:', error);
                        });
                })
                .catch(error => {
                    console.error('Lỗi xóa phòng:', error);
                    if (error.response && error.response.status === 500) {
                        toast.error('Không thể xóa phòng vì đã có khách hàng đang đặt phòng');
                    }
                });
        };
    
        toast.warn(
            <div>
                <p>Bạn có muốn xóa phòng này không?</p>
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
            {/* Sidebar */}
            <SidebarAdmin/>

            {/* Page Wrapper */}
            <div className="page-wrapper">
                {/* Topbar */}
                <TopbarAdmin />

                {/* Body Wrapper */}
                <div className="body-wrapper">
                    <div className="container-fluid">
                        {/* RoomManager */}
                        <div className="font-weight-medium shadow-none position-relative overflow-hidden mb-7">
                            <div className="card-body px-0">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 className="font-weight-medium fs-14 mb-0">Danh sách phòng</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Card>
                            <Card.Body>
                                <Table className="room-table">
                                    <thead>
                                        <tr>
                                            <th>Mã phòng</th>
                                            <th>Hình ảnh</th>
                                            <th>Tên phòng</th>
                                            <th>Giá</th>
                                            <th>Loại phòng</th>
                                            <th>Miêu tả</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rooms.map(room => (
                                            <tr key={room.room_id}>
                                                <td>{room.room_id}</td>
                                                <td>
                                                    <img src={room.image_url} alt={room.room_name} className="room-image" />
                                                </td>
                                                <td style={{fontWeight: 600, color: "#3A4752"}}>{room.room_name}</td>
                                                <td>
                                                    <span className="price-amount">
                                                        <span>{room.price}</span>
                                                        <span className="currency-symbol"> VND</span>
                                                    </span>
                                                </td>
                                                <td>
                                                    {room.type}
                                                </td>
                                                <td>{room.description}</td>
                                                <td>
                                                    <a href="#" className="action-icon">
                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                    </a>
                                                    <a onClick={() => handleDelete(room.room_id)} className="action-icon">
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
        </div>
    );
};

export default RoomManager;
