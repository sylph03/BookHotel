import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './MyIntroduce.css';

const MyIntroduce = () => {
    return (
        <div className='introduce'>
            <Row>
                <Col className='col-12'>
                    <div className='introduce-item'>
                        <Row className='align-items-center'>
                            <Col className='px-0 col-lg-6 col-sm-6 col-12'>
                                <div className='introduce-item-content'>
                                    <h3>Về chúng tôi</h3>
                                    <p>Khách sạn gồm 311 phòng được chia thành các hạng phòng từ tiêu chuẩn đến cao cấp. Mang cảm hứng từ hình ảnh hoa sen - biểu tượng văn hóa Việt Nam, với quy mô 36 tầng, khách sạn đã trở thành công trình ấn tượng ở địa phương.</p>
                                    <a href='/introduce/1'>Xem thêm</a>
                                </div>
                            </Col>
                            <Col className='px-0 col-lg-6 col-sm-6 col-12'>
                                <div className='introduce-item-image'>
                                    <div className='ratio-3-2'>
                                        <a href='/introduce/1'>
                                            <img src='https://i.pinimg.com/originals/0c/93/aa/0c93aa65f4526f66acbb61d4455a3667.jpg' alt='Về chúng tôi'/>
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col className='col-12'>
                <div className='introduce-item'>
                        <Row className='introduce-item-direction align-items-center'>
                            <Col className='px-0 col-lg-6 col-sm-6 col-12'>
                                <div className='introduce-item-content'>
                                    <h3>Kinh nghiệm khi đặt phòng khách sạn</h3>
                                    <p>Trước khi đặt phòng khách sạn thì bạn nên suy xét và đề ra một ngân sách phù hợp cho mình. Điều này là vô cùng quan trọng vì nó sẽ giúp bạn xác lập ra được một con số nhất định và không bị chi tiêu quá tay&nbsp;</p>
                                    <a href='introduce/2'>Xem thêm</a>
                                </div>
                            </Col>
                            <Col className='px-0 col-lg-6 col-sm-6 col-12'>
                                <div className='introduce-item-image'>
                                    <div className='ratio-3-2'>
                                        <a href='introduce/2'>
                                            <img src='https://i.pinimg.com/564x/0f/39/c2/0f39c2a53ececc1631e2d98daf50eb85.jpg' alt='Kinh nghiệm khi đặt phòng khách sạn'/>
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default MyIntroduce