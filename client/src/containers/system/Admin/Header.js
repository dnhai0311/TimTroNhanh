import React from 'react';
import { logout } from '../../../store/actions/auth';
import { useDispatch } from 'react-redux';
const Header = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <div className="p-3 text-end text-danger fw-bold show-more" onClick={handleLogout}>
            Đăng xuất
        </div>
    );
};

export default Header;
