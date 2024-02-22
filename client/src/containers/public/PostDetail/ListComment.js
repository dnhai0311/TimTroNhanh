import React from 'react';
import { Comment, CommentInput } from '../../../components/';
import { useSelector } from 'react-redux';
const ListComment = () => {
    const { isDarkMode } = useSelector((state) => state.theme);
    return (
        <div className={`w-100 mt-2 border p-2 ${isDarkMode ? '' : 'bg-light'}`}>
            <h6 className="fw-bold border-bottom py-1 m-0">Đánh giá</h6>
            <CommentInput />
            <Comment />
            <Comment />
            <Comment />
        </div>
    );
};

export default ListComment;
