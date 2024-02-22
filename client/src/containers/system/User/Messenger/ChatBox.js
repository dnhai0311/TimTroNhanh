import React, { memo, useState, useRef, useEffect } from 'react';
import { Message } from '../../../../components';
import ChatInput from '../../../../components/ChatInput';
import { useSelector } from 'react-redux';
import { apiSendMessage } from '../../../../services/message';
import InfiniteScroll from 'react-infinite-scroll-component';
import { apiGetMessages } from '../../../../services/message';

const ChatBox = ({ user, messages, setMessages, fetchAllMessages }) => {
    const chatBoxRef = useRef(null);
    const [message, setMessage] = useState('');
    const { userData } = useSelector((state) => state.user);
    const [page, setPage] = useState(0);

    const sendMessage = async () => {
        if (message === '') return;
        const payload = {
            message,
            receiver: user?.id,
        };
        const response = await apiSendMessage(payload);

        if (response.status === 200) {
            setMessages((prevMessages) => {
                const messagesArray = Array.isArray(prevMessages) ? prevMessages : [];

                return [
                    ...messagesArray,
                    {
                        id: message + Math.random().toString(36).substr(2, 9),
                        value: message,
                        isCurrentUserSender: true,
                    },
                ];
            });

            fetchAllMessages();
            setMessage('');
        }
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [userData?.id]);

    useEffect(() => {
        const fetchOldMessages = async () => {
            const response = await apiGetMessages(user?.id, page, messages?.length);
            if (response.status === 200) {
                const newMessages = response.data[0]?.messages || [];
                setMessages((prevMessages) => {
                    const messagesArray = Array.isArray(prevMessages) ? prevMessages : [];
                    return [...newMessages, ...messagesArray];
                });
            }
        };

        page > 0 && fetchOldMessages();
    }, [messages?.length, page, setMessages, user?.id]);

    return (
        <>
            <div className="conversation mb-2" ref={chatBoxRef} id="conversation">
                {messages && Array.isArray(messages) && (
                    <InfiniteScroll
                        dataLength={messages.length}
                        next={() => {
                            setPage(page + 1);
                        }}
                        hasMore={true}
                        inverse={true}
                        scrollableTarget="conversation"
                    >
                        {messages.map((message) => (
                            <Message
                                key={message.id}
                                message={message.value}
                                isLeft={!message.isCurrentUserSender}
                                user={user}
                            />
                        ))}
                    </InfiniteScroll>
                )}
            </div>
            <ChatInput setMessage={setMessage} sendMessage={sendMessage} />
        </>
    );
};

export default memo(ChatBox);
