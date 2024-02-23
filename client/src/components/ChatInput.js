import React, { useRef, useEffect, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import icons from '../utils/icons';

const ChatInput = ({ setMessage, sendMessage }) => {
    const { IoSend } = icons;

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
            inputRef.current.value = '';
        }
    };

    const handleFocusLoss = useCallback((e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className="position-relative mb-2" onBlur={handleFocusLoss}>
            <Form.Control className="p-2" onChange={handleMessageChange} onKeyDown={handleKeyPress} ref={inputRef} />
            <div className="position-absolute top-50 end-0 translate-middle">
                <IoSend
                    className="text-primary"
                    onClick={() => {
                        sendMessage();
                        inputRef.current.value = '';
                    }}
                />
            </div>
        </div>
    );
};

export default ChatInput;
