import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as apis from '../../../services/index';
import PostTable from '../User/PostManagement/PostTable';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);

    const handleUpdateUserStatus = useCallback(
        async (userId) => {
            await toast.promise(apis.apiUpdateUserStatus(userId), {
                pending: 'Đang cập nhật trạng thái',
                success: 'Cập nhật thành công',
                error: 'Cập nhật thất bại',
            });
            const userIndex = users.findIndex((user) => user.id === userId);
            if (userIndex !== -1) {
                const updatedUsers = [...users];

                updatedUsers[userIndex] = {
                    ...updatedUsers[userIndex],
                    status: updatedUsers[userIndex].status === 'active' ? 'disable' : 'active',
                };

                setUsers(updatedUsers);
            }
        },
        [users],
    );
    const memoizedData = useMemo(() => {
        return users?.map((user) => ({
            id: user.id,
            avatar: user.avatar,
            name: user.name,
            phone: user.phone,
            type: user.type === '0' ? 'Người tìm trọ' : 'Chủ trọ',
            status: user.status === 'active' ? 'Hoạt động' : 'Bị khoá',
        }));
    }, [users]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Mã tài khoản',
            },
            {
                accessorKey: 'avatar',
                header: 'Ảnh đại diện',
                cell: (props) => {
                    return (
                        <div className="d-flex justify-content-center align-items-center">
                            <img
                                src={props.getValue()}
                                width={100}
                                height={100}
                                className="rounded-circle"
                                alt="thumbnail"
                            />
                        </div>
                    );
                },
            },
            {
                accessorKey: 'name',
                header: 'Tên người dùng',
            },

            {
                accessorKey: 'phone',
                header: 'Số điện thoại',
            },
            {
                accessorKey: 'type',
                header: 'Loại tài khoản',
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
                        <div className="d-flex flex-column w-75 m-auto justify-content-evenly">
                            <Button
                                className="btn-warning mb-3"
                                onClick={() => handleUpdateUserStatus(props.row.original.id)}
                            >
                                {props.row.original.status === 'Hoạt động' ? 'Ẩn' : 'Mở'}
                            </Button>
                            <Button className="btn-danger" disabled>
                                Xoá
                            </Button>
                        </div>
                    );
                },
            },
        ],
        [handleUpdateUserStatus],
    );

    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await apis.apiGetAllUsers();
            setUsers(response.data.rows);
            setTotal(response.data.count);
        };
        fetchAllUsers();
    }, []);
    return (
        <>
            <h3 className="py-3 px-5 border-bottom">Quản lý người dùng</h3>
            <PostTable columns={columns} data={memoizedData} total={total} isAdmin={true} />
        </>
    );
};

export default AdminUserManagement;
