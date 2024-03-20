import React, { useEffect } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAcreages, getCategories, getPrices } from '../../store/actions/app';
import { getCurrentUser } from '../../store/actions/user';
import { logout } from '../../store/actions';

const Main = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
    const { isDarkMode } = useSelector((state) => state.theme);
    useEffect(() => {
        dispatch(getAcreages());
        dispatch(getPrices());
        dispatch(getCategories());
    }, [dispatch]);
    useEffect(() => {
        if (isAdmin) {
            dispatch(logout());
            return;
        }
        setTimeout(() => {
            isLoggedIn && dispatch(getCurrentUser());
        }, 50);
    }, [isLoggedIn, isAdmin, dispatch]);
    return (
        <div className={`${isDarkMode ? 'dark-theme' : 'light-theme'}`} style={{ minHeight: '100vh' }}>
            <Header />
            <div className="w-100 w-md-75 m-auto d-block">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;
