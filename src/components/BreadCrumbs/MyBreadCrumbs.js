import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';

import './MyBreadCrumbs.css';

const MyBreadCrumbs = (props) => {
    const location = useLocation();
    const paths = location.pathname.split('/').filter(x => x);

    // Đối tượng ánh xạ đường dẫn và nhãn tương ứng
    const pathLabels = {
        '/': 'Trang chủ',
        '/rooms': 'Phòng',
        '/login': 'Đăng nhập',
        '/register': 'Đăng ký tài khoản',
        '/accountManager': "Quản lý tài khoản",
        '/accountManager/changePassword' : "Thay đổi mật khẩu",
        '/cart' : "Giỏ hàng",
        '/payment' : "Thông tin đơn hàng",
        ...(props.room && { [`/rooms/${props.room.room_id}`]: props.room.room_name })
        // Thêm các đường dẫn và nhãn tương ứng khác nếu cần

    };
    

    return (
        <div className="breadCrumbs">
            <Row className="mx-0">
                <Col className="px-0 col-md-12 col-12">
                    <div className="breadCrumbs-box">
                        <div className={`breadCrumbs-section-bg ${props.mb ? props.mb : "mb-lg-6"}`}>
                            <Container>
                                <div className="breadCrumbs-section">
                                    <a href="/">
                                        Trang chủ
                                        {paths.length > 0 && <i className="fa-solid fa-chevron-right"></i>}
                                    </a>
                                    {paths.map((path, index) => {
                                        const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
                                        const isLast = index === paths.length - 1;

                                        return (
                                            <React.Fragment key={index}>
                                                <a href={routeTo}>
                                                    {pathLabels[routeTo] ? pathLabels[routeTo] : path.charAt(0).toUpperCase() + path.slice(1)}
                                                    {!isLast && <i className="fa-solid fa-chevron-right"></i>}
                                                </a>
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </Container>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default MyBreadCrumbs;
