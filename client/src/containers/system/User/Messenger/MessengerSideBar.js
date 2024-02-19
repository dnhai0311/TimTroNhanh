import React, { useEffect, useState } from 'react';
import { UserBox } from '../../../../components/';
import { Link } from 'react-router-dom';

const MessengerSideBar = ({ data }) => {
    const [userList, setUserList] = useState();

    useEffect(() => {
        data && setUserList(data);
    }, [data]);
    // console.log(userList);
    return (
        <div className="messenger-sidebar">
            {userList &&
                userList.map((item) => {
                    return (
                        <Link
                            className="text-decoration-none text-dark"
                            key={item?.user.id}
                            to={'/quan-ly/tin-nhan/' + item?.user?.id}
                        >
                            <UserBox
                                user={item?.user}
                                latestMessage={
                                    item?.messages.length > 0 ? item.messages[item.messages.length - 1].value : ''
                                }
                            />
                        </Link>
                    );
                })}
        </div>
    );
};

export default MessengerSideBar;
