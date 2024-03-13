import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const AdminWrapper = () => {
    const { isAdmin } = useSelector((state) => state.auth);
    return isAdmin ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default AdminWrapper;
