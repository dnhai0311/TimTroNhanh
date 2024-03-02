import React, { useState, useMemo, useEffect } from 'react';
import PostTable from './PostManagement/PostTable';
import { formatToVND } from '../../../utils/commons/formatToVND';
import moment from 'moment';
import { apiGetAllPaymentsFromUser } from '../../../services/payment';
const TransactionManagement = () => {
    const [payments, setPayments] = useState([]);
    const [total, setTotal] = useState(0);

    const memoizedData = useMemo(() => {
        return payments?.map((payment) => ({
            id: payment.id,
            amount: formatToVND(payment.amount),
            type: payment.type,
            status: payment.status,
            updatedAt: moment(payment.updatedAt).format('DD-MM-YYYY'),
            expiredAt: moment(payment.expiredAt).format('DD-MM-YYYY'),
        }));
    }, [payments]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Mã giao dịch',
            },
            {
                accessorKey: 'amount',
                header: 'Số tiền',
            },
            {
                accessorKey: 'type',
                header: 'Loại giao dịch',
            },
            {
                accessorKey: 'status',
                header: 'Trạng thái',
            },
            {
                accessorKey: 'updatedAt',
                header: 'Ngày tạo',
            },
            {
                accessorKey: 'expiredAt',
                header: 'Ngày hết hạn',
            },
        ],
        [],
    );

    useEffect(() => {
        const fetchAllPayments = async () => {
            const response = await apiGetAllPaymentsFromUser();
            setPayments(response.data.response.rows);
            setTotal(response.data.response.count);
        };
        fetchAllPayments();
    }, []);
    return (
        <>
            <h3 className="py-3 px-5 border-bottom">Lịch sử giao dịch</h3>
            <PostTable columns={columns} data={memoizedData} total={total} isPayment={true} />
        </>
    );
};

export default TransactionManagement;
