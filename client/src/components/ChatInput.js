import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';
import icons from '../utils/icons';
import debounce from 'lodash.debounce';

const ChatInput = ({ setMessage, sendMessage }) => {
    const { IoSend } = icons;
    const latestMessage = useRef('');

    const handleMessageChange = (event) => {
        latestMessage.current = event.target.value;
        setMessage(event.target.value);
    };

    const debouncedMessage = debounce(() => {
        setMessage(latestMessage.current);
    }, 200);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            debouncedMessage.flush();
            sendMessage();
            e.target.value = '';
        }
    };

    return (
        <div className="position-relative mb-2">
            <Form.Control className="p-2" onChange={handleMessageChange} onKeyDown={handleKeyPress} />
            <div className="position-absolute top-50 end-0 translate-middle">
                <IoSend className="text-primary" onClick={sendMessage} />
            </div>
        </div>
    );
};

export default ChatInput;
