import React, { useEffect, useState } from 'react';
import { UserBox } from '../../../../components';
import ChatBox from './ChatBox';

const ChatContainer = ({ selectedUser }) => {
    const [messages, setMessages] = useState({});
    const [otherUser, setOtherUser] = useState('');
    useEffect(() => {
        // call api
    }, [selectedUser]);
    return (
        <>
            <UserBox isSelected={true} avatar={otherUser?.avatar} />
            <ChatBox messages={messages} otherUser={otherUser} />
        </>
    );
};

export default ChatContainer;
