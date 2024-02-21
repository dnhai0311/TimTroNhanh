import React, { useEffect, useState } from 'react';
import { UserBox } from '../../../../components';
import ChatBox from './ChatBox';
import { useParams } from 'react-router-dom';
import { useSocketContext } from '../../../../context/SocketContext';
import { apiGetMessages } from '../../../../services/message';
import { apiGetUser } from '../../../../services/user';
import icons from '../../../../utils/icons';

const ChatContainer = ({ fetchAllMessages }) => {
    const { BiMessageRoundedDetail } = icons;
    const { userId } = useParams();
    const [user, setUser] = useState();
    const [messages, setMessages] = useState('');
    const { onlineUsers, socket } = useSocketContext();

    useEffect(() => {
        const handleMessage = (newMessage) => {
            if (newMessage.sender === +userId) {
                setMessages((prevMessages) => {
                    const messagesArray = Array.isArray(prevMessages) ? prevMessages : [];

                    return [
                        ...messagesArray,
                        {
                            id: newMessage.value + Math.random().toString(36).substr(2, 9),
                            value: newMessage.value,
                            isCurrentUserSender: false,
                        },
                    ];
                });
            }
            fetchAllMessages();
        };

        if (socket) {
            socket.on('message', (newMessage) => {
                handleMessage(newMessage);
            });

            return () => {
                socket.off('message');
            };
        }
    }, [socket, userId, fetchAllMessages]);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await apiGetMessages(userId);
            if (response.status === 200) {
                setMessages(response.data[0]?.messages);
            }
            const user = await apiGetUser(userId);
            if (user.status === 200) {
                setUser(user.data.response);
            }
        };
        setMessages('');
        userId && fetchMessages();
    }, [userId]);

    return (
        <>
            {userId ? (
                <>
                    <UserBox isSelected={true} user={user} isOnline={onlineUsers.includes(userId)} />
                    <ChatBox
                        user={user}
                        messages={messages}
                        setMessages={setMessages}
                        fetchAllMessages={fetchAllMessages}
                    />
                </>
            ) : (
                <div className=" h-100 d-flex align-items-center justify-content-center flex-column">
                    <BiMessageRoundedDetail fontSize={'50px'} />
                    <h5 className="fw-bold">Hãy chọn một người nào đó để nhắn tin</h5>
                </div>
            )}
        </>
    );
};

export default ChatContainer;
