import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopbarAdmin from '../../../components/TopbarAdmin/TopbarAdmin';
import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import './AddRoom.css';
import '../../Admin/Admin.css';

const AddRoom = () => {

    const [roomName, setRoomName] = useState('');
    const [roomType, setRoomType] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState({
        roomName: "",
        roomType: "",
        price: "",
        description: "",
        selectedFile: ""
    });

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

    const validateImage = () => {
        if (!selectedFile) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                selectedFile: "Vui lòng chọn hình ảnh"
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                selectedFile: ""
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

    const handleSubmit = (e) => {
        e.preventDefault();
        validateRoomName();
        validateDescription();
        validateRoomType();
        validateImage();
        validatePrice();

        if (
            errors.roomName === '' &&
            errors.roomType === '' &&
            errors.description === '' &&
            errors.selectedFile === '' &&
            errors.price === '' &&
            roomName !== '' &&
            roomType !== '' &&
            description !== '' &&
            selectedFile &&
            price !== ''
        ) {
            const formData = new FormData();
            formData.append('roomName', roomName);
            formData.append('roomType', roomType);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('image', selectedFile);

            axios.post('http://localhost:3000/api/rooms/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log('Thêm phòng thành công', response.data);
                    toast.success("Thêm phòng thành công!");
                    setRoomName('');
                    setRoomType('');
                    setPrice('');
                    setDescription('');
                    setSelectedFile(null);
                })
                .catch(error => {
                    console.error('Lỗi thêm phòng', error);
                });
        }
    };

    const handleUploadClick = () => {
        const fileInput = document.getElementById('fileInput');
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
            {/* Sidebar */}
            <SidebarAdmin />

            {/* Page Wrapper */}
            <div className="page-wrapper">
                {/* Topbar */}
                <TopbarAdmin />

                {/* Body Wrapper */}
                <div className="body-wrapper addRoom">
                    <div className="container-fluid">
                      {/* AddRoom */}
                      <div className="font-weight-medium shadow-none position-relative overflow-hidden mb-7">
                          <div className="card-body px-0">
                              <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                      <h4 className="font-weight-medium fs-14 mb-0">Thêm phòng</h4>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-7">
                                    <h4 className="card-title">Tổng quan</h4>
                                </div>
                                <div className="form-horizontal">
                                    <div className="mb-4">
                                        <label className="form-label">
                                            Tên sản phẩm
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input onBlur={validateRoomName} value={roomName} onChange={e => setRoomName(e.target.value)} placeholder="Tên phòng" type="text" className="form-control mb-2" />
                                        {errors.roomName && <label style={{ display: "inline-block" }} className="error invalid-feedback">{errors.roomName}</label>}
                                    </div>
                                    <div>
                                        <label className="form-label">Mô tả</label>
                                        <span className="text-danger">*</span>
                                        <textarea onBlur={validateDescription} value={description} onChange={e => setDescription(e.target.value)} placeholder="Mô tả về phòng này" className="required form-control" cols={45} rows={8}></textarea>
                                        {errors.description && <label style={{ display: "inline-block" }} className="error invalid-feedback">{errors.description}</label>}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card>
                          <Card.Body>
                            <h4 className="card-title mb-7">
                                Hình ảnh
                                <span className="text-danger">*</span>
                            </h4>
                              <div className="dropzone dz-clickable mb-2">
                                  <div className="dz-default dz-message">
                                      <button onClick={handleUploadClick} className="dz-button" type="button">Thả tệp vào đây</button>
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
                                      <input onChange={(e) => handleFileUpload(e.target.files[0])} id="fileInput" name="file" type="file" accept="image/*" className="d-none" />
                                  </div>
                              </div>
                              {errors.selectedFile && <label style={{ display: "inline-block" }} className="error invalid-feedback">{errors.selectedFile}</label>}
                          </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <h4 className="card-title mb-7">
                                    Loại phòng
                                </h4>
                                <div>
                                    <label className="form-label">Chọn loại phòng</label>
                                    <span className="text-danger">*</span>
                                    <div className="email-repeater mb-3">
                                        <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="form-control form-control-sm selectpicker">
                                            <option value="">-- Loại --</option>
                                            <option value="Standard">Standard</option>
                                            <option value="Superior">Superior</option>
                                            <option value="Deluxe">Deluxe</option>
                                            <option value="Ensuite">Ensuite</option>
                                        </select>
                                    </div>
                                </div>
                                {errors.roomType && <label style={{ display: "inline-block" }} className="error invalid-feedback">{errors.roomType}</label>}
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <h4 className="card-title mb-7">
                                    Giá (VND)
                                </h4>
                                <div>
                                    <div className="mb-7">
                                        <label className="form-label">
                                            Giá cơ bản
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input onBlur={validatePrice} value={price} onChange={e => setPrice(e.target.value)} type="number" className="form-control" />
                                        {errors.price && <label style={{ display: "inline-block" }} className="error invalid-feedback">{errors.price}</label>}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <div className="form-action mb-5">
                            <button type="submit" className="btn-submit rounded-1">Thêm</button>
                        </div>
                      </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddRoom;
