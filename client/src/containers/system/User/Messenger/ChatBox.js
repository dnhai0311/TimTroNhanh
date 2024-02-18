import React from 'react';
import { Message } from '../../../../components';
import { Form } from 'react-bootstrap';
import icons from '../../../../utils/icons';
import { useSelector } from 'react-redux';
const ChatBox = ({ messages, otherUser }) => {
    const { IoSend } = icons;
    const { userData } = useSelector((state) => state.user);

    return (
        <>
            <div className="overflow-auto mb-2" style={{ height: '62vh' }}>
                <Message />
                <Message isLeft={true} />
            </div>
            <div className="position-relative mb-2">
                <Form.Control className="p-2" />
                <div className="position-absolute top-50 end-0 translate-middle">
                    <IoSend className="text-primary" />
                </div>
            </div>
        </>
    );
};

export default ChatBox;
