import React, { useEffect, useState } from 'react';
import MessengerSideBar from './MessengerSideBar';
import ChatContainer from './ChatContainer';
import { Row, Col, Container } from 'react-bootstrap';
import { apiGetAllMessagesCurrent } from '../../../../services/message';
import { useSocketContext } from '../../../../context/SocketContext';

const Messenger = () => {
    const [data, setData] = useState();
    const [isSendMessage, setIsSendMessage] = useState(false);
    const { socket } = useSocketContext();
    const fetchMessages = async () => {
        const response = await apiGetAllMessagesCurrent();
        if (response.status === 200) {
            setData(response.data);
        }
    };
    useEffect(() => {
        fetchMessages();
    }, [isSendMessage]);

    useEffect(() => {
        if (socket) {
            const handleMessage = () => {
                fetchMessages();
            };

            socket.on('message', handleMessage);

            return () => {
                socket.off('message', handleMessage);
            };
        }
    }, [socket]);
    return (
        <>
            <h3 className="py-3 px-5 border-bottom">Tin nhắn</h3>
            <Container fluid>
                <Row>
                    <Col sm={4}>
                        <MessengerSideBar data={data} />
                    </Col>
                    <Col sm={8}>
                        <ChatContainer isSendMessage={isSendMessage} setIsSendMessage={setIsSendMessage} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Messenger;
