import React, { memo, useEffect, useState } from 'react';
import { UserBox } from '../../../../components/';
import { Link } from 'react-router-dom';
import { useSocketContext } from '../../../../context/SocketContext';
import { useSelector } from 'react-redux';

const MessengerSideBar = ({ data, setIsChatting }) => {
    const [userList, setUserList] = useState();
    const { onlineUsers } = useSocketContext();
    const { isDarkMode } = useSelector((state) => state.theme);

    useEffect(() => {
        data && setUserList(data);
    }, [data]);

    return (
        <div className="messenger-sidebar">
            {userList &&
                userList.map((item) => {
                    return (
                        <Link
                            className={`text-decoration-none ${isDarkMode ? 'text-light' : 'text-dark'}`}
                            key={item?.user.id}
                            to={'/quan-ly/tin-nhan/' + item?.user?.id}
                            onClick={() => {
                                setIsChatting(true);
                            }}
                        >
                            <UserBox
                                user={item?.user}
                                latestMessage={item.messages[item.messages.length - 1].value}
                                isOnline={onlineUsers.includes(String(item?.user?.id))}
                                isSeen={item.messages[0].isCurrentUserSender}
                            />
                        </Link>
                    );
                })}
        </div>
    );
};

export default memo(MessengerSideBar);
