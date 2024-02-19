import React, { useEffect, useState } from 'react';
import MessengerSideBar from './MessengerSideBar';
import ChatContainer from './ChatContainer';
import { Row, Col, Container } from 'react-bootstrap';
import { apiGetAllMessagesCurrent } from '../../../../services/message';

const Messenger = () => {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchMessage = async () => {
            const response = await apiGetAllMessagesCurrent();
            if (response.status === 200) {
                setData(response.data);
            }
        };
        fetchMessage();
    }, []);
    return (
        <>
            <h3 className="py-3 px-5 border-bottom">Tin nhắn</h3>
            <Container fluid>
                <Row>
                    <Col sm={4}>
                        <MessengerSideBar data={data} />
                    </Col>
                    <Col sm={8}>
                        <ChatContainer data={data} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Messenger;
