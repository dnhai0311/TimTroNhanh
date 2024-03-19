import React, { useEffect, useState } from 'react';
import MessengerSideBar from './MessengerSideBar';
import ChatContainer from './ChatContainer';
import { Row, Col, Container } from 'react-bootstrap';
import { apiGetAllMessagesCurrent } from '../../../../services/message';
import { UseViewport } from '../../../../components/index';

const Messenger = () => {
    const [data, setData] = useState();
    const [isChatting, setIsChatting] = useState(false);

    const viewPort = UseViewport();
    const showBothComponents = viewPort > 768;
    console.log(viewPort);
    const fetchAllMessages = async () => {
        const response = await apiGetAllMessagesCurrent();
        if (response.status === 200) {
            setData(response.data);
        }
    };

    useEffect(() => {
        fetchAllMessages();
    }, []);

    return (
        <>
            <h3 className="py-3 px-5 border-bottom">Tin nhắn</h3>
            <Container fluid>
                {showBothComponents ? (
                    <>
                        <Row>
                            <Col sm={4}>
                                <MessengerSideBar data={data} setIsChatting={setIsChatting} />
                            </Col>
                            <Col sm={8}>
                                <ChatContainer fetchAllMessages={fetchAllMessages} setIsChatting={setIsChatting} />
                            </Col>
                        </Row>
                    </>
                ) : (
                    <>
                        <Row>
                            {!isChatting && (
                                <Col>
                                    {!isChatting && <MessengerSideBar data={data} setIsChatting={setIsChatting} />}
                                </Col>
                            )}
                            <Col>
                                {isChatting && (
                                    <ChatContainer fetchAllMessages={fetchAllMessages} setIsChatting={setIsChatting} />
                                )}
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </>
    );
};

export default Messenger;
