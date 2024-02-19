import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PostTable from './PostTable';
import { Container, Row, Button } from 'react-bootstrap';
import { apiGetAllPosts } from '../../../../services/user';
import moment from 'moment';
import UpdatePost from './UpdatePost';
import { apiDeletePost } from '../../../../services/post';

const PostManagement = () => {
    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0);
    const [isShowPostUpdate, setIsShowPostUpdate] = useState(false);
    const [isSomePostUpdate, setIsSomePostUpdate] = useState(false);
    const [selectedPost, setSelectedPost] = useState(0);

    const handleDelete = useCallback(
        async (id) => {
            await apiDeletePost(id);
            setIsSomePostUpdate(!isSomePostUpdate);
            // console.log(response);
        },
        [isSomePostUpdate],
    );

    const memoizedData = useMemo(() => {
        return posts.map((post) => ({
            postId: post.postId,
            postImg: JSON.parse(post.postImg)[0],
            title: post.title,
            price: post.price < 1 ? `${post.price * 1000}.000 đồng/tháng` : `${post.price} triệu/tháng`,
            updatedAt: moment(post.updatedAt).format('DD-MM-YYYY'),
            expiredAt: moment(post.expiredAt).format('DD-MM-YYYY'),
            status: post.status,
        }));
    }, [posts]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'postId',
                header: 'Mã tin',
            },
            {
                accessorKey: 'postImg',
                header: 'Ảnh đại diện tin',
                cell: (props) => {
                    return (
                        <div className="d-flex justify-content-center align-items-center">
                            <img src={props.getValue()} width={100} height={100} alt="thumbnail" />
                        </div>
                    );
                },
            },
            {
                accessorKey: 'title',
                header: 'Tiêu đề',
                cell: (props) => {
                    return (
                        <div className="text-wrap" style={{ width: '250px' }}>
                            {props.getValue()}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'price',
                header: 'Giá',
                cell: (props) => {
                    return <span>{props.getValue()}</span>;
                },
            },
            {
                accessorKey: 'updatedAt',
                header: 'Ngày cập nhật',
                cell: (props) => {
                    return <span>{props.getValue()}</span>;
                },
            },
            {
                accessorKey: 'expiredAt',
                header: 'Ngày hết hạn',
                cell: (props) => {
                    return <span>{props.getValue()}</span>;
                },
            },
            {
                accessorKey: 'status',
                header: 'Trạng thái',
            },
            {
                accessorKey: 'action',
                header: 'Tuỳ chọn',
                cell: (props) => {
                    return (
                        <>
                            <div className="d-flex flex-column">
                                <Button
                                    className="w-100 my-1 bg-success"
                                    onClick={() => {
                                        setIsShowPostUpdate(true);
                                        setSelectedPost(props.row.original.postId);
                                    }}
                                >
                                    Sửa
                                </Button>
                                <Button
                                    className="w-100 my-1 bg-danger"
                                    onClick={() => {
                                        handleDelete(props.row.original.postId);
                                    }}
                                >
                                    Xoá
                                </Button>
                            </div>
                        </>
                    );
                },
            },
        ],
        [handleDelete],
    );

    useEffect(() => {
        const fetchAllPosts = async () => {
            const response = await apiGetAllPosts();
            setPosts(response.data.response.rows);
            setTotal(response.data.response.count);
        };
        fetchAllPosts();
    }, [isSomePostUpdate]);

    return (
        <>
            <h3 className="border-bottom py-3 px-5">Quản lý tin đăng</h3>
            <Container className="px-1">
                <Row>
                    <PostTable columns={columns} data={memoizedData} total={total} />
                </Row>
            </Container>
            {isShowPostUpdate && (
                <UpdatePost
                    isShow={isShowPostUpdate}
                    setIsShow={setIsShowPostUpdate}
                    selectedPostId={selectedPost}
                    isSomePostUpdate={isSomePostUpdate}
                    setIsSomePostUpdate={setIsSomePostUpdate}
                />
            )}
        </>
    );
};

export default PostManagement;
