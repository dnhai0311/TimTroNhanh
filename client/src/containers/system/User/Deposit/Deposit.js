import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DepositContainer from './DepositContainer';
import DepositSideBar from './DepositSideBar';

const Deposit = () => {
    return (
        <>
            <h3 className="py-3 px-5 border-bottom">Nạp tiền</h3>
            <Container className="px-5 py-3">
                <Row>
                    <Col sm={9}>
                        <DepositContainer />
                    </Col>
                    <Col sm={3}>
                        <DepositSideBar />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Deposit;
