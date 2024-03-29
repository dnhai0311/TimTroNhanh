import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatToVND } from '../../../../utils/commons/formatToVND';

const TopUpSideBar = () => {
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);
    const menuItems = [
        { name: 'Lịch sử giao dịch', path: '/quan-ly/lich-su-giao-dich' },
        { name: 'Bảng giá', path: '/bang-gia' },
    ];
    const handleClick = (item) => {
        navigate(item.path);
    };
    return (
        <div>
            <div className="p-3 border rounded">
                Số dư tài khoản
                <h5 className="text-success">{formatToVND(userData?.money)}</h5>
            </div>
            {menuItems.map((item) => (
                <div
                    key={item.name}
                    className="btn w-100 text-center py-1 mt-2 border rounded bg-secondary text-light top-up-sidebar-item"
                    onClick={() => handleClick(item)}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export default TopUpSideBar;
