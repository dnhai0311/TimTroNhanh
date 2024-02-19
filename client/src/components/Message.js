import React from 'react';
import UserBox from './UserBox';

const Message = ({ isLeft, user, message }) => {
    return (
        <div className={`d-flex align-items-center ${isLeft ? 'justify-content-start' : 'justify-content-end'}`}>
            {isLeft && <UserBox isInMessage={true} isSelected={true} user={user} />}
            <div className={`my-1 p-2 border rounded ${isLeft ? 'bg-light text-dark' : 'bg-primary text-light'}`}>
                {message}
            </div>
        </div>
    );
};

export default Message;
