import React from 'react';
import { Link } from 'react-router-dom';
import { useSocketContext } from '../../../context/SocketContext';

const ShowUser = ({ detailPost }) => {
    const { onlineUsers } = useSocketContext();
    return (
        <>
            <img
                src={detailPost?.user?.avatar}
                alt="avatar"
                className=" border rounded-circle mt-3 mb-2"
                style={{ width: '110px', height: '110px' }}
            />
            <h5 className="fw-bold text-light m-0 text-center">{detailPost?.user?.name}</h5>
            <div className="text-light mb-1">
                {onlineUsers.includes(String(detailPost?.user?.id)) ? 'Đang hoạt động' : 'Đã ngoại tuyến'}
            </div>
            <div className="w-75 text-center py-1 bg-white text-success fw-bold border rounded mb-2">
                {detailPost.user?.phone}
            </div>
            <Link
                to={'/quan-ly/tin-nhan/' + detailPost?.user?.id}
                className="w-75 text-center py-1 bg-white  text-success fw-bold  border rounded mb-3 text-decoration-none"
            >
                Nhắn tin
            </Link>
        </>
    );
};

export default ShowUser;
