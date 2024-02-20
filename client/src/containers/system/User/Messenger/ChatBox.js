import React, { memo, useState, useRef, useEffect } from 'react';
import { Message } from '../../../../components';
import ChatInput from '../../../../components/ChatInput';
import { useSelector } from 'react-redux';
import { apiSendMessage } from '../../../../services/message';
const ChatBox = ({ user, messages, isSendMessage, setIsSendMessage }) => {
    const chatBoxRef = useRef(null);
    const [message, setMessage] = useState('');
    const { userData } = useSelector((state) => state.user);
    const sendMessage = async () => {
        if (message === '') return;
        const payload = {
            message,
            sender: userData.id,
            receiver: user?.id,
        };
        const response = await apiSendMessage(payload);
        if (response.status === 200) {
            setIsSendMessage(!isSendMessage);
            setMessage('');
        }
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <div className="overflow-auto mb-2" style={{ height: '62vh' }} ref={chatBoxRef}>
                {messages &&
                    Array.isArray(messages) &&
                    messages.map((message) => (
                        <Message
                            key={message.id}
                            message={message.value}
                            isLeft={!message.isCurrentUserSender}
                            user={user}
                        />
                    ))}
            </div>
            <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </>
    );
};

export default memo(ChatBox);
