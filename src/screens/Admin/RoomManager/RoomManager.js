import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Modal, Table } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopbarAdmin from '../../../components/TopbarAdmin/TopbarAdmin';
import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import './RoomManager.css';
import '../../Admin/Admin.css';

const RoomManager = () => {
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [roomType, setRoomType] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [currentImage, setCurrentImage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [errors, setErrors] = useState({
        roomName: "",
        roomType: "",
        price: "",
        description: "",
        selectedFile: ""
    });

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = () => {
        axios.get(`http://localhost:3000/api/rooms?limit=100`)
            .then(response => {
                setRooms(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the rooms!", error);
                toast.error('Lỗi khi lấy danh sách phòng!');
            });
    };

    const handleDelete = (roomId) => {
        const confirmDelete = () => {
            axios.delete(`http://localhost:3000/api/rooms/delete/${roomId}`)
                .then(response => {
                    console.log('Đã xóa phòng', response.data);
                    toast.success('Phòng đã được xóa thành công');
                    fetchRooms();
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
                    <button className="btn-danger btn-sm" onClick={() => toast.dismiss()}>Hủy</button>
                </div>
            </div>,
            {
                autoClose: false
            }
        );
    };

    const handleEdit = (room) => {
        setRoomName(room.room_name);
        setRoomType(room.type);
        setPrice(room.price.toString());
        setDescription(room.description);
        setSelectedRoomId(room.room_id);
        setCurrentImage(room.image_url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateRoomName();
        validateDescription();
        validateRoomType();
        validatePrice();
    
        if (
            errors.roomName === '' &&
            errors.roomType === '' &&
            errors.description === '' &&
            errors.price === '' &&
            roomName !== '' &&
            roomType !== '' &&
            description !== '' &&
            price !== ''
        ) {
            const formData = new FormData();
            formData.append('roomId', selectedRoomId);
            formData.append('roomName', roomName);
            formData.append('roomType', roomType);
            formData.append('price', price);
            formData.append('description', description);
            
            if (selectedFile) {
                formData.append('image', selectedFile);
            } else {
                formData.append('image', currentImage);
            }
            
            if (selectedRoomId !== null) {
                axios.put('http://localhost:3000/api/rooms/edit', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        console.log('Sửa phòng thành công', response.data);
                        toast.success("Sửa phòng thành công!");
                        setSelectedRoomId(null);
                        fetchRooms();
                    })
                    .catch(error => {
                        console.error('Lỗi Sửa phòng', error);
                    });
            } else {
                toast.error('ID phòng không hợp lệ');
            }
        }
    };

    const validateRoomName = () => {
        if (roomName.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                roomName: "Vui lòng nhập tên phòng"
            }));
        } else if (roomName.trim().length < 6) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                roomName: "Thông tin nhập quá ngắn"
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                roomName: ""
            }));
        }
    };

    const validateDescription = () => {
        if (description.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                description: "Vui lòng nhập mô tả"
            }));
        } else if (description.trim().length < 20) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                description: "Thông tin nhập quá ngắn"
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                description: ""
            }));
        }
    };

    const validateRoomType = () => {
        if (roomType.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                roomType: "Vui lòng chọn loại phòng"
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                roomType: ""
            }));
        }
    };

    const validatePrice = () => {
        const priceValue = parseInt(price.trim());
        if (price.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                price: "Vui lòng nhập giá"
            }));
        } else if (priceValue <= 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                price: "Giá không hợp lệ"
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                price: ""
            }));
        }
    };

    const handleUploadClick = () => {
        const fileInput = document.getElementById('editFileInput');
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileUpload = (file) => {
        setSelectedFile(file);
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
                                            <th>Mô tả</th>
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
                                                    <a className="action-icon" onClick={() => handleEdit(room)}>
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
            <Modal className="custom-modal" show={selectedRoomId !== null} onHide={() => setSelectedRoomId(null)}>
                <Modal.Header className="p-4" closeButton>
                    <Modal.Title>Sửa thông tin phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <h4 className="card-title mb-3">
                                Tên Phòng
                                <span className="text-danger">*</span>
                            </h4>
                            <input className="form-control mb-2" type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                            {errors.roomName && <label style={{ display: "inline-block" }} className="error invalid-feedback">{errors.roomName}</label>}
                        </div>
                        <div className="mb-4">
                            <h4 className="card-title mb-4">
                                Mô tả
                                <span className="text-danger">*</span>
                            </h4>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} className="required form-control" cols={45} rows={5} />
                            {errors.description && <label style={{ display: "inline-block" }} className="error invalid-feedback">{errors.description}</label>}
                        </div>
                        <div className="email-repeater mb-4">
                            <h4 className="card-title mb-3">
                                Loại phòng
                                <span className="text-danger">*</span>
                            </h4>
                            <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="form-control form-control-sm selectpicker">
                                <option value="">-- Loại --</option>
                                <option value="Standard">Standard</option>
                                <option value="Superior">Superior</option>
                                <option value="Deluxe">Deluxe</option>
                                <option value="Ensuite">Ensuite</option>
                            </select>
                            {errors.roomType && <label style={{ display: "inline-block" }} className="error invalid-feedback">{errors.roomType}</label>}
                        </div>
                        <div className="mb-7">
                            <h4 className="card-title mb-3">
                                Giá cơ bản
                                <span className="text-danger">*</span>
                            </h4>
                            <input value={price} onChange={e => setPrice(e.target.value)} type="number" className="form-control" />
                            {errors.price && <label style={{ display: "inline-block" }} className="error invalid-feedback">{errors.price}</label>}
                        </div>
                        <h4 className="card-title mb-3">
                                Hình ảnh
                                <span className="text-danger">*</span>
                            </h4>
                        <div className="dropzone dz-clickable mb-2">
                            <div className="dz-default dz-message">
                                <button onClick={handleUploadClick} className="dz-button" type="button">Thả tệp để chỉnh sửa hình ảnh</button>
                                <ul className="comment-images">
                                    {selectedFile && (
                                        <li>
                                            <img className="img-comment" src={URL.createObjectURL(selectedFile)} alt={`Uploaded`} />
                                            <i onClick={() => setSelectedFile(null)} className="close-image">
                                                <i className="fa-solid fa-xmark"></i>
                                            </i>
                                        </li>
                                    )}
                                </ul>
                                <input onChange={(e) => handleFileUpload(e.target.files[0])} id="editFileInput" name="file" type="file" accept="image/*" className="d-none" />
                            </div>
                        </div>
                        {errors.selectedFile && <label style={{ display: "inline-block" }} className="error invalid-feedback">{errors.selectedFile}</label>}
                        <div className="modal-footer mt-5 p-0 border-0">
                            <button type="button" onClick={() => setSelectedRoomId(null)} className="btn-submit">Hủy</button>
                            <button type="submit" className="btn-submit">Lưu thay đổi</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default RoomManager;
