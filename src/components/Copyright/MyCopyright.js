import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './MyCopyright.css'

const MyCopyright = () => {
    return (
        <div className='copyright'>
            <Container>
                <Row>
                    <Col className='px-4 col-md-12 col-12'>
                        Copyright © 2002 Web4s. All rights reserved.
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MyCopyright