import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import * as apis from '../../../services/index';
const Dashboard = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const [users, setUsers] = useState();
    const [posts, setPosts] = useState();
    const [trans, setTrans] = useState();
    const [totalTrans, setTotalTrans] = useState();

    const formatLabelsAndData = (arr) => {
        const labels = [];
        const data = [];
        const topUpData = [];
        const paymentData = [];

        let total = 0;

        arr.forEach((item) => {
            let label;
            if (item.month) {
                label = item.month;
            }
            if (item.type && !item.month) {
                switch (item.type) {
                    case '0':
                        label = 'Người tìm trọ';
                        break;
                    case '1':
                        label = 'Chủ trọ';
                        break;
                    default:
                        label = item.status || item.type;
                        break;
                }
            }

            if (item.status && !item.month) {
                switch (item.status) {
                    case 'payment':
                        label = 'Chờ thanh toán';
                        break;
                    case 'pending':
                        label = 'Chờ duyệt';
                        break;
                    case 'approved':
                        label = 'Bài đang hiển thị';
                        break;
                    case 'expried':
                        label = 'Bài hết hạn';
                        break;
                    case 'success':
                        label = 'Thành công';
                        break;
                    case 'failure':
                        label = 'Thất bại';
                        break;
                    default:
                        label = item.status;
                        break;
                }
            }
            let existingLabelIndex = labels.indexOf(label);
            if (existingLabelIndex !== -1);
            else {
                labels.push(label);
            }
            total += item.count;
            data.push(item.count);
            if (item.type === 'Nạp tiền') {
                topUpData.push(item.totalAmount);
            } else {
                paymentData.push(item.totalAmount);
            }
        });
        return { total, labels, data, topUpData, paymentData };
    };

    useEffect(() => {
        const fetchData = async () => {
            const users = await apis.apiGetTotalUsersByType();
            const posts = await apis.apiGetTotalPostsByStatus();
            const trans = await apis.apiGetTotalPaymentsByStatus();
            const totalTrans = await apis.apiGetTotalPaymentsByMonth();
            setUsers(formatLabelsAndData(users.data));
            setPosts(formatLabelsAndData(posts.data));
            setTrans(formatLabelsAndData(trans.data));
            setTotalTrans(formatLabelsAndData(totalTrans.data));
        };
        setTimeout(() => fetchData(), 200);
    }, []);

    const userData = {
        labels: users?.labels,
        datasets: [
            {
                label: 'Người dùng',
                data: users?.data,
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                hoverOffset: 4,
            },
        ],
    };
    const postData = {
        labels: posts?.labels,
        datasets: [
            {
                label: 'Bài đăng',
                data: posts?.data,
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(54, 162, 40)', 'rgb(54, 62, 235)'],
                hoverOffset: 4,
            },
        ],
    };
    const tranData = {
        labels: trans?.labels,
        datasets: [
            {
                label: 'Giao dịch',
                data: trans?.data,
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(54, 162, 40)'],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Biểu đồ giao dịch',
            },
        },
    };

    const transData = {
        labels: totalTrans?.labels,
        datasets: [
            {
                label: 'Nạp tiền',
                data: totalTrans?.topUpData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Thanh toán',
                data: totalTrans?.paymentData,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (
        <>
            <div className="mt-3 mx-3 d-flex justify-content-between">
                <div className="w-25 h-25">
                    <Doughnut data={userData} />
                    <div className="text-center mt-1">Người dùng ({users?.total})</div>
                </div>
                <div className="w-25 h-25">
                    <Doughnut data={postData} />
                    <div className="text-center mt-1">Bài đăng ({posts?.total})</div>
                </div>
                <div className="w-25 h-25">
                    <Doughnut data={tranData} />
                    <div className="text-center mt-1">Giao dịch ({trans?.total})</div>
                </div>
            </div>
            <Line data={transData} options={options} style={{ maxHeight: '40%' }} />;
        </>
    );
};

export default Dashboard;
