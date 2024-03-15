import React, { useEffect, useState, useMemo } from 'react';
import * as apis from '../../../services/index';
import PostTable from '../User/PostManagement/PostTable';
import moment from 'moment';
const AdminPostManagement = () => {
    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0);
    const memoizedData = useMemo(() => {
        return posts?.map((post) => ({
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
            },
        ],
        [],
    );

    useEffect(() => {
        const fetchAllPosts = async () => {
            const response = await apis.apiGetAllPosts();
            setPosts(response.data.response.rows);
            setTotal(response.data.response.count);
        };
        fetchAllPosts();
    }, []);
    return (
        <>
            <h3 className="py-3 px-5 border-bottom">Quản lý người dùng</h3>
            <PostTable columns={columns} data={memoizedData} total={total} isAdmin={true} />
        </>
    );
};

export default AdminPostManagement;
