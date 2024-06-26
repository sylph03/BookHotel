import React, { useState, useEffect } from "react";
import { Container, Row, Col, ToggleButton } from "react-bootstrap";
import MyStar from '../Star/MyStar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MyRating.css';
import axios from "axios";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const MyRating = (props) => {
    
    const [ratingData, setRatingData] = useState({
        existingRating: false,
        ratingCount: 0,
        ratingDistribution: {},
        averageRating: 0,
        customerRatings: []
    });

    const [customerData, setCustomerData] = useState(null);
    const [toogle, setToogle] = useState(false);
    const [ratingStar, setRatingStar] = useState(0);
    const [comment, setComment] = useState('');
    const [errorComment, setErrorComment] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        // Lấy thông tin người dùng từ sessionStorage khi component được tải lần đầu
        const customerUserData = localStorage.getItem('customerUser');
        if (customerUserData) {
            setCustomerData(JSON.parse(customerUserData));
        }
    }, []);

    useEffect(() => {
        // Chỉ gọi API khi customerData đã có giá trị
        if (customerData) {
            axios.get(`http://localhost:3000/api/rooms/${props.room.room_id}/ratings?customerId=${customerData.customer_id}`)
            .then(response => {
                setRatingData(response.data);
            })
            .catch(error => {
                console.error('Đã xảy ra lỗi khi tìm nạp dữ liệu!', error);
            });
        }
    }, [props.room.room_id, customerData]);

    const validateRatingStar = () => {
        if(ratingStar === 0) {
            toast.error('Vui lòng chọn số sao đánh giá');
        }
    }

    const validateDescription = () => {
        if(comment.trim() === '') {
            setErrorComment("Vui lòng nhập thông tin");
        } else if (comment.trim().length < 10) {
            setErrorComment("Thông tin nhập quá ngắn");
        } else {
            setErrorComment("");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        validateDescription();
        validateRatingStar();
      
        if (errorComment === '' && ratingStar !== 0 && comment !== '') {
          const formData = new FormData();
          formData.append('customerId', customerData.customer_id);
          formData.append('roomId', props.room.room_id);
          formData.append('rating', ratingStar);
          formData.append('comment', comment);
          selectedFiles.forEach(file => {
            formData.append('images', file);
          });
      
          axios.post('http://localhost:3000/api/ratings', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(response => {
              console.log('Rating submitted successfully', response.data);
              toast.success("Đánh giá thành công!");
      
              // Cập nhật lại danh sách đánh giá sau khi thêm đánh giá mới
              axios.get(`http://localhost:3000/api/rooms/${props.room.room_id}/ratings`)
                .then(response => {
                  setRatingData(response.data);
                  setRatingStar(0);
                  setComment('');
                  setToogle(false);
                })
                .catch(error => {
                  console.error('Đã xảy ra lỗi khi tìm nạp dữ liệu!', error);
                });
            })
            .catch(error => {
              validateRatingStar();
              console.error('Error submitting rating', error);
            });
        }
    };      
        
    const handleButtonToggle = () => {
        setToogle(!toogle);
    }

    const handleRatingChange = (rate) => {
        setRatingStar(rate);
    };

    const handleClick = () => {
        if (customerData) {
            if (ratingData.existingRating) {
                toast.info("Bạn đã đánh giá sản phẩm này rồi");
            } else {
                handleButtonToggle();
            }
        } else {
            toast.info("Đăng nhập để đánh giá");
        }
    };

    const handleUploadClick = () => {
        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.click(); // Khi click vào biểu tượng camera, kích hoạt input file
        }
    };

    const handleFileUpload = (files) => {
        const selectedFilesArray = Array.from(files);
        setSelectedFiles(selectedFilesArray);
    };

    const handleRemoveImage = (indexToRemove) => {
        const updatedFiles = selectedFiles.filter((file, index) => index !== indexToRemove);
        setSelectedFiles(updatedFiles);
    };

    console.log(selectedFiles);

    // Tính phần trăm cho từng rating từ 1 đến 5
    const getRatingPercentage = (rating) => {
        if (ratingData.ratingCount === 0) return 0;
        const ratingCount = ratingData.ratingDistribution[rating.toString()] || 0;
        const percentage = (ratingCount / ratingData.ratingCount) * 100;
        return Math.floor(percentage);
    };

    // Lấy giá trị phần trăm cho mỗi rating từ 1 đến 5
    const percent1 = getRatingPercentage(1);
    const percent2 = getRatingPercentage(2);
    const percent3 = getRatingPercentage(3);
    const percent4 = getRatingPercentage(4);
    const percent5 = getRatingPercentage(5);

    return (
        <div className="rating">
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
            <Container>
                <Row>
                    <Col className="px-4 col-md-12 col-12">
                        <div className="mb-5">
                            <div className="rating-title">Khách hàng đánh giá</div>
                            <div className="overall-rating">
                                <Row>
                                    <Col className="px-4 rating-average col-lg-3 col-5">
                                        <div className="point-comment">
                                            <span>{ratingData.averageRating ? ratingData.averageRating : 0}</span>
                                        </div>
                                        <div>
                                            <span className="start-lg">
                                                <MyStar rating={5} readonly={true} size="18px"/>
                                            </span>
                                        </div>
                                    </Col>
                                    <Col className="px-4 col-lg-6 col-7">
                                        <div className="percent-bar">
                                            <div className="rating-num">
                                                5&nbsp;
                                                <i className="fa-solid fa-star" />
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar progress-bar-warning" style={{ width: `${percent5}%`}}></div>
                                            </div>
                                            <div className="star-percent">
                                                <span>{percent5}</span>%
                                            </div>
                                        </div>
                                        <div className="percent-bar">
                                            <div className="rating-num">
                                                4&nbsp;
                                                <i className="fa-solid fa-star" />
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar progress-bar-warning" style={{ width: `${percent4}%`}}></div>
                                            </div>
                                            <div className="star-percent">
                                                <span>{percent4}</span>%
                                            </div>
                                        </div>
                                        <div className="percent-bar">
                                            <div className="rating-num">
                                                3&nbsp;
                                                <i className="fa-solid fa-star" />
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar progress-bar-warning" style={{ width: `${percent3}%`}}></div>
                                            </div>
                                            <div className="star-percent">
                                                <span>{percent3}</span>%
                                            </div>
                                        </div>
                                        <div className="percent-bar">
                                            <div className="rating-num">
                                                2&nbsp;
                                                <i className="fa-solid fa-star" />
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar progress-bar-warning" style={{ width: `${percent2}%`}}></div>
                                            </div>
                                            <div className="star-percent">
                                                <span>{percent2}</span>%
                                            </div>
                                        </div>
                                        <div className="percent-bar">
                                            <div className="rating-num">
                                                1&nbsp;
                                                <i className="fa-solid fa-star" />
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar progress-bar-warning" style={{ width: `${percent1}%`}}></div>
                                            </div>
                                            <div className="star-percent">
                                                <span>{percent1}</span>%
                                            </div>
                                        </div>
                                    </Col>  
                                    <Col className="px-4 col-lg-3 col-12">
                                        <p className="d-none d-lg-block mb-0" style={{fontSize:"1.5rem", fontWeight:"400", lineHeight:"1.5", color:"#181b20"}}>Chia sẻ nhận xét về sản phẩm</p>
                                        <div onClick={handleClick} className="btn-submit mt-3 w-100">
                                            Đánh giá và nhận xét
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            {toogle && <form onSubmit={handleSubmit} id="rating-form" className="rating-form collapse  show">
                                <div className="form-group">
                                    <h3><b>Gửi nhận xét của bạn</b></h3>
                                    <label>1. Đánh giá của bạn về sản phẩm này:</label>
                                    <div className="review-star">
                                        <MyStar onChange={handleRatingChange} rating={ratingStar} size='20px' emptySymbol='fa-regular fa-star custom-star' fullSymbol='fa-regular fa-star custom-star' colorEmptySymbol='#181b20' />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>2. Viết nhận xét của bạn vào bên dưới:</label>
                                    <textarea onChange={e => setComment(e.target.value)} value={comment} name="content" cols='45' rows='8' placeholder="Nhận xét của bạn về sản phẩm này" className="required form-control"></textarea>
                                    {errorComment && <label style={{display: "inline-block"}} id="address-error" className="error invalid-feedback">{errorComment}</label>}
                                </div>
                                <ul className="comment-images">
                                    {selectedFiles.map((file, index) => (
                                        <li key={index}>
                                            <img className="img-comment" src={URL.createObjectURL(file)} alt={`Uploaded ${index}`} />
                                            <i onClick={() => handleRemoveImage(index)} className="close-image">
                                                <i className="fa-solid fa-xmark"></i>
                                            </i>
                                        </li>
                                    ))}
                                </ul>
                                <input onChange={(e) => handleFileUpload(e.target.files)} id="file-input" name="files[]" type="file" accept="image/*" multiple='multiple' className="d-none"/>
                                <span onClick={handleUploadClick} className="mb-0 btn-submit">
                                    <i className="fa-solid fa-camera"></i>
                                </span>
                                <button type="submit" className="btn-submit ms-3">Gửi đánh giá</button>
                            </form>}
                            <ul className="rating-list">
                                {ratingData.customerRatings.map((rating, index) => (
                                    <li key={index} className="item">
                                        <div className="box-rating">
                                            <div className="author-info">
                                                <img src={rating.customer_image || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'} className="letter-first"/>
                                                <div>
                                                    <span className="post-author">{rating.full_name}</span>
                                                    <br/>
                                                    <span className="post-date">{formatDistanceToNow(new Date(rating.created_at), { addSuffix: true, locale: vi })}</span>
                                                </div>
                                            </div>
                                            <div className="rating-content">
                                                <div className="star-rating">
                                                    <MyStar rating={rating.rating} readonly={true} />
                                                </div>
                                                <div className="description">
                                                    {rating.comment}
                                                </div>
                                                <div className="album-images">
                                                    {rating.images && JSON.parse(rating.images).map((image, index) => (
                                                        <img key={index} src={`http://localhost:3000${image}`} alt={`Ảnh ${index}`} className="image-comment" />
                                                    ))}
                                                </div>
                                                <div className="btn-action">
                                                    <div className="inner-reply">
                                                        <i className="fa-solid fa-reply"></i>
                                                        <span className="number-reply">
                                                            Trả lời
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const renderImages = (imagesStr) => {
    try {
      const images = JSON.parse(imagesStr);
      return images.map((image, index) => (
        <img key={index} src={image} alt={`Ảnh ${index}`} className="image-comment" />
      ));
    } catch (error) {
      console.error('Error parsing images:', error);
      return <p>Lỗi khi hiển thị ảnh</p>;
    }
  };
  

export default MyRating;
