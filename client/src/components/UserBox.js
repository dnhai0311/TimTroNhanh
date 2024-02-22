import React, { memo } from 'react';
import avt from '../assets/avt/user.png';
import '../containers/system/User/Messenger/Messenger.scss';
const UserBox = ({ isSelected, isInMessage, user, latestMessage, isOnline, isSeen }) => {
    return (
        <div className={`d-flex rounded ${isSelected ? (isInMessage ? '' : 'border-bottom') : 'user-box'}`}>
            <div className={`p-2 ${isOnline ? 'online' : ''}`}>
                <img
                    src={user?.avatar || avt}
                    alt="avatar"
                    className={`border rounded-circle ${isInMessage ? 'small-avatar' : 'large-avatar'}`}
                />
            </div>
            {isInMessage ? (
                ''
            ) : (
                <div className="d-flex flex-column justify-content-center w-100 fw-bold">
                    <div>{user?.name || 'None'}</div>
                    {isSelected ? (
                        <div className="text-success fw-normal">{isOnline ? 'Đang hoạt động' : 'Đã ngoại tuyến'}</div>
                    ) : (
                        <div className={`text-truncate w-75 ${isSeen ? 'fw-normal' : ''}`}>{latestMessage}</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(UserBox);
