import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './MyWelcome.css';

const MyWelcome = () => {
    return (
        <div className="welcome">
            <Container>
                <Row>
                    <Col>
                        <div className="welcome-content">
                            <h1>Chào mừng bạn đến với Five Star Hotel</h1>
                            <p> Khách sạn gồm 311 phòng được chia thành các hạng phòng từ tiêu chuẩn đến cao cấp. Mang cảm hứng từ hình ảnh hoa sen - biểu tượng văn hóa Việt Nam, với quy mô 36 tầng, khách sạn đã trở thành công trình ấn tượng ở địa phương. </p>
                            <a href="#">Xem thêm</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MyWelcome