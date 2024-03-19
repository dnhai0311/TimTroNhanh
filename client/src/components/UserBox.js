import React, { memo } from 'react';
import avt from '../assets/avt/user.png';
import '../containers/system/User/Messenger/Messenger.scss';
import { useNavigate } from 'react-router-dom';
const UserBox = ({ isSelected, isInMessage, user, latestMessage, isOnline, isSeen, isBack, setIsChatting }) => {
    const navigate = useNavigate();
    return (
        <div
            className={`d-flex align-items-center justify-content-between rounded ${
                isSelected ? (isInMessage ? '' : 'border-bottom') : 'user-box'
            }`}
        >
            <div className="d-flex">
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
                    <div className="d-flex flex-column justify-content-center fw-bold">
                        <div>{user?.name || 'None'}</div>
                        {isSelected ? (
                            <div className="text-success fw-normal">
                                {isOnline ? 'Đang hoạt động' : 'Đã ngoại tuyến'}
                            </div>
                        ) : (
                            <div className={`text-truncate w-75 ${isSeen ? 'fw-normal' : ''}`}>{latestMessage}</div>
                        )}
                    </div>
                )}
            </div>
            <div
                className={` ${
                    isBack ? 'd-block' : 'd-none'
                } fw-bold border rounded-circle px-3 py-1 text-decoration-none show-more`}
                style={{ fontSize: '25px' }}
                onClick={() => {
                    setIsChatting(false);
                    navigate('/quan-ly/tin-nhan/');
                }}
            >
                {'<'}
            </div>
        </div>
    );
};

export default memo(UserBox);
