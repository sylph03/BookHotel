import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './MyBanner.css'


const MyBanner = () => {
    return (
        <div className="banner">
            <div className="banner-box">
                <div className="banner-content">
                    <img src="https://i.pinimg.com/originals/1c/ee/19/1cee1958f5db10dd60a695b8177cf3ed.jpg" alt="Đặt trực tuyến ngay hôm nay và mong chờ một kỳ nghỉ thư giãn với chúng tôi"/>
                    <div className="banner-content_info">
                        <Container className="px-4">
                            <h3>Đặt trực tuyến ngay hôm nay và mong chờ một kỳ nghỉ thư giãn với chúng tôi</h3>
                            <p>Hãy xem các loại phòng của chúng tôi ngay bây giờ và tưởng tượng chính bạn ở đây</p>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBanner