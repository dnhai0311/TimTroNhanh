import React, { useEffect, useState } from 'react';
import { apiGetLikedPost } from '../../../services/post';
import { useSelector } from 'react-redux';
import Post from '../../../components/Post';
import './LikedPost.scss';
import { showToastSuccess } from '../../../utils/commons/ToastUtil';
import InfiniteScroll from 'react-infinite-scroll-component';

const LikedPost = () => {
    const { userData } = useSelector((state) => state.user);
    const [likedPosts, setLikedPosts] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (!userData?.id) {
            return;
        }
        const fetchLikedPost = async () => {
            const response = await apiGetLikedPost(userData.id, page);
            if (response.status === 200) {
                const allLikedPost = response.data.response.flatMap((item) => item.post);
                if (allLikedPost.length === 0) {
                    showToastSuccess('Đã hiện hết tin bạn đã lưu');
                    return;
                }
                setLikedPosts((prevPosts) => [...prevPosts, ...allLikedPost]);
            }
        };

        fetchLikedPost();
    }, [userData?.id, page]);

    return (
        <>
            <h4 className="m-auto fw-bold py-2 ps-2">Danh sách bài đăng bạn đã yêu thích</h4>
            <div className="w-100 w-sm-75 m-auto border rounded">
                <InfiniteScroll
                    dataLength={likedPosts.length}
                    next={() => {
                        setPage(page + 1);
                    }}
                    hasMore={true}
                    className="overflow-hidden"
                    loader={<h6 className="text-center p-2">Hết thật rồi...</h6>}
                >
                    {likedPosts.map((item) => (
                        <Post
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            star={+item.star}
                            price={item.attribute.price}
                            area={item.attribute.acreage}
                            location={item.attribute.address}
                            uploader={item.user.name}
                            time={item.updatedAt}
                            img={JSON.parse(item.images.path)[0]}
                            phone={item.user.phone}
                            id={item.id}
                            avatar={item.user.avatar}
                            isLiked={true}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        </>
    );
};

export default LikedPost;
