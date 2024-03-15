import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import icons from '../../../utils/icons';

const Sidebar = () => {
    const {
        FaRegFileAlt,
        MdPayment,
        LiaHistorySolid,
        LuUserSquare,
        LuClipboardCheck,
        FaMoneyCheckDollar,
        MdOutlineCategory,
        BiCategory,
        FaChartPie,
        FaChartBar,
    } = icons;
    const navigate = useNavigate();
    const location = useLocation();

    const [category] = useState(location.pathname.split('/').pop());
    const [activeRow, setActiveRow] = useState(category);
    const [activeSubRow, setActiveSubRow] = useState(null);

    const navigateAndSetActiveRow = (rowName) => {
        setActiveRow(rowName);
        setActiveSubRow(null);
        navigate(rowName);
    };

    const navigateAndSetActiveSubRow = (subRowName) => {
        setActiveSubRow(subRowName);
        navigate(subRowName);
    };

    const renderSubItems = (parent, subItems) => (
        <div>
            {subItems.map((subItem) => (
                <div
                    key={subItem.name}
                    className={`py-3 px-2 show-more rounded admin-sidebar-item ${
                        activeSubRow === parent + '/' + subItem.name ? 'active' : ''
                    }`}
                    onClick={() => navigateAndSetActiveSubRow(parent + '/' + subItem.name)}
                >
                    {subItem.icon}
                    <span className="ms-1">{subItem.label}</span>
                </div>
            ))}
        </div>
    );

    const renderSidebarItems = (items, title) => (
        <div className="border-bottom">
            <div className="pt-3 pb-2 px-2 fw-bold" style={{ opacity: '0.85' }}>
                {title}
            </div>
            {items.map((item) => (
                <div key={item.name}>
                    <div
                        className={`py-3 px-2 show-more rounded admin-sidebar-item ${
                            (activeRow === item.name && !item.subItems) || (activeSubRow === item.name && item.subItems)
                                ? 'active'
                                : ''
                        }`}
                        onClick={() => {
                            if (item.subItems) {
                                navigateAndSetActiveRow(item.name);
                                setActiveSubRow((prevActiveSubRow) =>
                                    prevActiveSubRow === item.name ? null : item.name,
                                );
                            } else {
                                navigateAndSetActiveRow(item.name);
                            }
                        }}
                    >
                        {item.icon}
                        <span className="ms-1">{item.label}</span>
                    </div>
                    {activeRow === item.name && item.subItems && renderSubItems(item.name, item.subItems)}
                </div>
            ))}
        </div>
    );

    const adminManagementItems = [
        {
            name: 'users',
            label: 'Quản lý người dùng',
            icon: <LuUserSquare />,
        },
        {
            name: 'posts',
            label: 'Quản lý bài đăng',
            icon: <FaRegFileAlt />,
            subItems: [{ name: 'approve-posts', label: 'Duyệt bài', icon: <LuClipboardCheck /> }],
        },
        {
            name: 'transactions',
            label: 'Quản lý giao dịch',
            icon: <LiaHistorySolid />,
            subItems: [
                { name: 'revenue', label: 'Doanh thu', icon: <FaChartBar /> },
                { name: 'top-up', label: 'Lịch sử nạp tiền', icon: <FaMoneyCheckDollar /> },
                { name: 'payment', label: 'Lịch sử thanh toán', icon: <MdPayment /> },
            ],
        },
    ];

    const optionItems = [
        { name: 'categories', label: 'Loại cho thuê', icon: <BiCategory /> },
        { name: 'post-categories', label: 'Loại tin đăng', icon: <MdOutlineCategory /> },
    ];

    return (
        <div className="w-100">
            <h4 className="py-4 px-3 fw-bold text-center border-bottom m-0">Tìm Trọ Nhanh Admin</h4>
            <div
                className={`py-3 px-2 border-bottom rounded admin-sidebar-item ${
                    activeRow === 'dashboard' || activeRow === 'admin' ? 'active' : ''
                }`}
                onClick={() => navigateAndSetActiveRow('dashboard')}
            >
                <FaChartPie />
                <span className="ms-1">Tổng quan</span>
            </div>
            {renderSidebarItems(adminManagementItems, 'Quản lý')}
            {renderSidebarItems(optionItems, 'Tuỳ chọn')}
        </div>
    );
};

export default Sidebar;
