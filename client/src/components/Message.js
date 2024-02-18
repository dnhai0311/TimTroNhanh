import React from 'react';
import UserBox from './UserBox';

const Message = ({ isLeft, avatar, message }) => {
    return (
        <div className={`d-flex align-items-center ${isLeft ? 'justify-content-start' : 'justify-content-end'}`}>
            {isLeft && <UserBox isInMessage={true} isSelected={true} />}
            <div className={`my-1 p-2 border rounded ${isLeft ? 'bg-light text-dark' : 'bg-primary text-light'}`}>
                Xin chào cả nhà
            </div>
        </div>
    );
};

export default Message;
