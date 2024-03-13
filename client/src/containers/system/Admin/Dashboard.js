import React from 'react';
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

const Dashboard = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const userData = {
        labels: ['Người tìm trọ', 'Chủ trọ'],
        datasets: [
            {
                label: 'Người dùng',
                data: [300, 50],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                hoverOffset: 4,
            },
        ],
    };
    const postData = {
        labels: ['Bài chờ thanh toán', 'Bài chờ duyệt', 'Bài đang hiển thị', 'Bài hết hạn'],
        datasets: [
            {
                label: 'Bài đăng',
                data: [300, 50, 40, 60],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(54, 162, 40)', 'rgb(54, 62, 235)'],
                hoverOffset: 4,
            },
        ],
    };
    const tranData = {
        labels: ['Thành công', 'Thất bại'],
        datasets: [
            {
                label: 'Giao dịch',
                data: [200, 50],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                hoverOffset: 4,
            },
        ],
    };

    const months = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];

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
        labels: months,
        datasets: [
            {
                label: 'Nạp tiền',
                data: [5, 10, 50, 20, 90, 100, 300, 400, 100, 100, 400, 250],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Thanh toán',
                data: [10, 1, 20, 40, 25, 2, 30, 40, 65, 20, 10, 25],
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
                    <div className="text-center mt-1">Người dùng ({'40'})</div>
                </div>
                <div className="w-25 h-25">
                    <Doughnut data={postData} />
                    <div className="text-center mt-1">Bài đăng ({'50'})</div>
                </div>
                <div className="w-25 h-25">
                    <Doughnut data={tranData} />
                    <div className="text-center mt-1">Giao dịch ({'120'})</div>
                </div>
            </div>
            <Line data={transData} options={options} style={{ maxHeight: '40%' }} />;
        </>
    );
};

export default Dashboard;
