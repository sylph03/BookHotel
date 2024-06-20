import React, { useState } from 'react';
import './MyOverView.css';
import { Container, Row, Col } from 'react-bootstrap';

const MyOverView = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleView = (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="overView">
            <Container>
                <Row>
                    <Col className='px-4'>
                        <div className="overView-box">
                            <h1>{props.title}</h1>
                            <div className={`overView-content-box ${isExpanded ? 'transform-active' : ''}`}>
                                <div className="overView-content">
                                    {props.content.map((content, index) => (
                                        <p key={index}>{content}</p>
                                    ))}
                                </div>
                                <div className="overView-content-load">
                                    <button onClick={toggleView} className="btn-view-all rounded">
                                        {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                                        <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MyOverView;
