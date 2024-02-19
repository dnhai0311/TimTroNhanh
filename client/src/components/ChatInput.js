import React from 'react';
import { Form } from 'react-bootstrap';
import icons from '../utils/icons';
const ChatInput = ({ setMessage, sendMessage, message }) => {
    const { IoSend } = icons;
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };
    return (
        <div className="position-relative mb-2">
            <Form.Control
                className="p-2"
                onChange={handleMessageChange}
                onKeyDown={handleKeyPress}
                value={message || ''}
            />
            <div className="position-absolute top-50 end-0 translate-middle">
                <IoSend className="text-primary" onClick={sendMessage} />
            </div>
        </div>
    );
};

export default ChatInput;
