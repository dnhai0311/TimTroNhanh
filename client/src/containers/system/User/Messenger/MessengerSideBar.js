import React, { useEffect, useState } from 'react';
import { UserBox } from '../../../../components/';
const MessengerSideBar = ({ setSelectedUser }) => {
    const [userList, setUserList] = useState([1, 2, 3, 4, 6, 7, 8, 9, 10]);

    useEffect(() => {
        ///call api & set userList
    }, []);

    const handleSelectUser = (item) => {
        setSelectedUser(item);
    };

    return (
        <div className="messenger-sidebar">
            {userList &&
                userList.map((item) => {
                    return (
                        <div key={item} onClick={() => handleSelectUser(item)}>
                            <UserBox />
                        </div>
                    );
                })}
        </div>
    );
};

export default MessengerSideBar;
