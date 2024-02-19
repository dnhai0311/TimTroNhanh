import React, { memo } from 'react';
import avt from '../assets/avt/avt1.jpg';
import '../containers/system/User/Messenger/Messenger.scss';
const UserBox = ({ isSelected, isInMessage, user, latestMessage }) => {
    return (
        <div className={`d-flex rounded ${isSelected ? (isInMessage ? '' : 'border-bottom') : 'user-box '}`}>
            <div className="p-2 avatar-user-box">
                <img
                    src={user?.avatar || avt}
                    alt="avatar"
                    className={`border rounded-circle ${isInMessage ? 'small-avatar' : 'large-avatar'}`}
                    style={{
                        width: isInMessage ? '40px' : '60px',
                        height: isInMessage ? '40px' : '60px',
                    }}
                />
            </div>
            {isInMessage ? (
                ''
            ) : (
                <div className="d-flex flex-column justify-content-center w-100 fw-bold">
                    <div>{user?.name || 'None'}</div>
                    {isSelected ? (
                        <div className="text-success fw-normal">Đang hoạt động</div>
                    ) : (
                        <div className="text-truncate w-75">{latestMessage}</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(UserBox);
