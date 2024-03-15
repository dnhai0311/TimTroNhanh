import React, { useState, useEffect, useMemo } from 'react';
import * as apis from '../../../services/index';
import PostTable from '../User/PostManagement/PostTable';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);

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
        ],
        [],
    );

    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await apis.apiGetAllUsers();
            console.log(response);
            setUsers(response.data.rows);
            setTotal(response.data.count);
        };
        fetchAllUsers();
    }, []);
    return (
        <>
            <h3 className="py-3 px-5 border-bottom">Quản lý người dùng</h3>
            <PostTable columns={columns} data={users} total={total} isAdmin={true} />
        </>
    );
};

export default AdminUserManagement;
