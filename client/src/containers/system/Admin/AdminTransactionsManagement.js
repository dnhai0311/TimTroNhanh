import React, { useState, useEffect, useMemo } from 'react';
import * as apis from '../../../services/index';
import PostTable from '../User/PostManagement/PostTable';
import moment from 'moment';
import { formatToVND } from '../../../utils/commons/formatToVND';

const AdminTransactionsManagement = () => {
    const [trans, setTrans] = useState([]);
    const [total, setTotal] = useState(0);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Mã giao dịch',
            },
            {
                accessorKey: 'user.name',
                header: 'Người giao dịch',
            },
            {
                accessorKey: 'amount',
                header: 'Số tiền',
                cell: (props) => {
                    return <span>{formatToVND(props.getValue())}</span>;
                },
            },

            {
                accessorKey: 'type',
                header: 'Loại giao dịch',
            },
            {
                accessorKey: 'status',
                header: 'Trạng thái',
            },
        ],
        [],
    );

    useEffect(() => {
        const fetchAllTrans = async () => {
            const response = await apis.apiGetAllPayments();
            console.log(response);
            setTrans(response.data.rows);
            setTotal(response.data.count);
        };
        fetchAllTrans();
    }, []);
    return (
        <>
            <h3 className="py-3 px-5 border-bottom">Lịch sử giao dịch</h3>
            <PostTable columns={columns} data={trans} total={total} isAdmin={true} />
        </>
    );
};

export default AdminTransactionsManagement;
