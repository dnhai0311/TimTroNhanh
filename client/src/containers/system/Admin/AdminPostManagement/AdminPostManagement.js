import React, { useEffect, useState, useMemo } from 'react';
import * as apis from '../../../../services/index';
import PostTable from '../../User/PostManagement/PostTable';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import ShowDetailPost from './ShowDetailPost';
import { showToastSuccess } from '../../../../utils/commons/ToastUtil';
const AdminPostManagement = ({ isApproved }) => {
    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0);
    const [postTarget, setPostTarget] = useState();
    const [isShowDetail, setIsShowDetail] = useState(false);
    const memoizedData = useMemo(() => {
        return posts?.map((post) => ({
            postId: post.postId,
            postImg: JSON.parse(post.postImg)[0],
            title: post.title,
            price: post.price < 1 ? `${post.price * 1000}.000 đồng/tháng` : `${post.price} triệu/tháng`,
            updatedAt: moment(post.updatedAt).format('DD-MM-YYYY'),
            expiredAt: moment(post.expiredAt).format('DD-MM-YYYY'),
            status: post.status,
            userName: post.userName,
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
                accessorKey: 'userName',
                header: 'Tên người đăng',
            },
            {
                accessorKey: 'updatedAt',
                header: 'Ngày tạo',
            },
            {
                accessorKey: 'expiredAt',
                header: 'Ngày hết hạn',
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
                        <div className="d-flex flex-column justify-content-center">
                            <Button
                                className="btn-success"
                                onClick={() => {
                                    setPostTarget(props.row.original.postId);
                                    setIsShowDetail(true);
                                }}
                            >
                                Chi tiết
                            </Button>
                            {props.row.original.status === 'pending' && (
                                <Button
                                    className="mt-3"
                                    onClick={async () => {
                                        await apis.apiUpdatePostStatus(props.row.original.postId, 'approved');
                                        showToastSuccess('Duyệt bài thành công');
                                        const updatedPosts = posts.filter(
                                            (post) => +post.postId !== +props.row.original.postId,
                                        );
                                        setPosts(updatedPosts);
                                    }}
                                >
                                    Duyệt
                                </Button>
                            )}
                        </div>
                    );
                },
            },
        ],
        [posts],
    );
    useEffect(() => {
        const fetchAllPosts = async (status) => {
            const response = await apis.apiGetAllPosts(status);
            setPosts(response.data.response.rows);
            setTotal(response.data.response.count);
        };

        if (!isApproved) {
            fetchAllPosts();
            return;
        }
        fetchAllPosts('pending');
    }, [isApproved]);
    return (
        <>
            <h3 className="py-3 px-5 border-bottom">Quản lý bài đăng</h3>
            <PostTable columns={columns} data={memoizedData} total={total} isAdmin={true} />
            {isShowDetail && <ShowDetailPost postId={postTarget} setIsShowDetail={setIsShowDetail} />}
        </>
    );
};

export default AdminPostManagement;
