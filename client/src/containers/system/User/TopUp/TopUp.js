import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TopUpSideBar from './TopUpSideBar';
import { Outlet } from 'react-router-dom';

const TopUp = () => {
    return (
        <>
            <h3 className="py-3 px-5 border-bottom">Nạp tiền</h3>
            <Container className="px-5 py-3">
                <Row>
                    <Col sm={9}>
                        <Outlet />
                    </Col>
                    <Col sm={3}>
                        <TopUpSideBar />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default TopUp;
