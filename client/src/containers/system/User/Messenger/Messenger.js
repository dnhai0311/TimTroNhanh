import React, { useState } from 'react';
import MessengerSideBar from './MessengerSideBar';
import ChatContainer from './ChatContainer';
import { Row, Col, Container } from 'react-bootstrap';
const Messenger = () => {
    const [selectedUser, setSelectedUser] = useState({});

    return (
        <>
            <h3 className="py-3 px-5 border-bottom">Tin nhắn</h3>
            <Container fluid>
                <Row>
                    <Col sm={4}>
                        <MessengerSideBar setSelectedUser={setSelectedUser} />
                    </Col>
                    <Col sm={8}>
                        <ChatContainer selectedUser={selectedUser} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Messenger;
