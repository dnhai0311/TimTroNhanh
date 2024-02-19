import React, { useEffect, useState } from 'react';
import { UserBox } from '../../../../components';
import ChatBox from './ChatBox';
import { useParams } from 'react-router-dom';

const ChatContainer = ({ data }) => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [messages, setMessages] = useState({});
    useEffect(() => {
        const foundItem = data && data.find((item) => item.user.id === +userId);
        foundItem && setUser(foundItem.user);
        foundItem && setMessages(foundItem.messages);
    }, [data, userId]);

    return (
        <>
            {userId ? (
                <>
                    <UserBox isSelected={true} user={user} />
                    <ChatBox user={user} messages={messages} />
                </>
            ) : (
                ''
            )}
        </>
    );
};

export default ChatContainer;
