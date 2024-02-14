import React from 'react';

const ShowUser = ({ detailPost }) => {
    return (
        <>
            <img
                src={detailPost?.user?.avatar}
                alt="avatar"
                className=" border rounded-circle mt-3 mb-2"
                style={{ width: '110px', height: '110px' }}
            />
            <h5 className="fw-bold text-light m-0">{detailPost?.user?.name}</h5>
            <div className="text-light mb-1">Đang hoạt động</div>
            <div className="w-75 text-center py-1 bg-white text-success fw-bold border rounded mb-2">
                {detailPost.user?.phone}
            </div>
            <div className="w-75 text-center py-1 bg-white  text-success fw-bold  border rounded mb-3">Nhắn tin</div>
        </>
    );
};

export default ShowUser;
