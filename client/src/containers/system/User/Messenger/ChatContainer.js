import React, { useEffect, useState, useCallback } from 'react';
import { UserBox } from '../../../../components';
import ChatBox from './ChatBox';
import { useParams } from 'react-router-dom';
import { useSocketContext } from '../../../../context/SocketContext';
import { apiGetMessages } from '../../../../services/message';
import { apiGetUser } from '../../../../services/user';
import icons from '../../../../utils/icons';

const ChatContainer = ({ isSendMessage, setIsSendMessage }) => {
    const { BiMessageRoundedDetail } = icons;
    const { userId } = useParams();
    const [user, setUser] = useState();
    const [messages, setMessages] = useState({});
    const { onlineUsers, socket } = useSocketContext();

    const fetchMessages = useCallback(
        async (userId) => {
            const response = await apiGetMessages(userId);
            if (response.status === 200) {
                setMessages(response.data[0]?.messages);
            }
            const user = await apiGetUser(userId);
            if (user.status === 200) {
                setUser(user.data.response);
            }
        },
        [setUser, setMessages],
    );

    useEffect(() => {
        const handleMessage = () => {
            userId && fetchMessages(userId);
        };

        if (socket) {
            socket.on('message', handleMessage);

            return () => {
                socket.off('message', handleMessage);
            };
        }
    }, [socket, userId, fetchMessages]);

    useEffect(() => {
        userId && fetchMessages(userId);
    }, [isSendMessage, userId, fetchMessages]);

    return (
        <>
            {userId ? (
                <>
                    <UserBox isSelected={true} user={user} isOnline={onlineUsers.includes(userId)} />
                    <ChatBox
                        user={user}
                        messages={messages}
                        isSendMessage={isSendMessage}
                        setIsSendMessage={setIsSendMessage}
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
