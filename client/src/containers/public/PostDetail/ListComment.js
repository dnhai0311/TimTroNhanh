import React, { useEffect, useState } from 'react';
import { Comment, CommentInput } from '../../../components/';
import { useSelector } from 'react-redux';
import { apiGetRated } from '../../../services/post';
import { useSocketContext } from '../../../context/SocketContext';

const ListComment = ({ userId, postId }) => {
    const { isDarkMode } = useSelector((state) => state.theme);
    const { socket } = useSocketContext();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchRated = async () => {
            const res = await apiGetRated(postId);
            setData(res.data.response);
        };
        postId && fetchRated();
    }, [postId]);

    useEffect(() => {
        const fetchRated = async () => {
            const res = await apiGetRated(postId);
            setData(res.data.response);
        };
        if (socket) {
            socket.on('new-rated', (id) => {
                if (id === postId) {
                    fetchRated();
                }
            });

            return () => {
                socket.off('new-rated');
            };
        }
    }, [postId, socket]);

    return (
        <div className={`w-100 mt-2 border p-2 ${isDarkMode ? '' : 'bg-light'}`}>
            <h6 className="fw-bold border-bottom py-1 m-0">Đánh giá</h6>
            <CommentInput userId={userId} postId={postId} />
            {data?.map((item) => (
                <Comment
                    key={item?.id}
                    avatar={item?.rated_user?.avatar}
                    name={item?.rated_user?.name}
                    comment={item?.comment}
                    star={item?.star}
                />
            ))}
        </div>
    );
};

export default ListComment;
