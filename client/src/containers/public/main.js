import React, { useEffect } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getAcreages, getCategories, getPrices } from '../../store/actions/app';
import { getCurrentUser } from '../../store/actions/user';

const Main = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(getAcreages());
        dispatch(getPrices());
        dispatch(getCategories());
    }, [dispatch]);
    useEffect(() => {
        setTimeout(() => {
            isLoggedIn && dispatch(getCurrentUser());
        }, 50);
    }, [isLoggedIn, dispatch]);
    return (
        <>
            <div className="bg-gray">
                <Header />
                <div className="w-100 w-sm-75 m-auto d-block">
                    <Outlet />
                </div>
                <Footer />
            </div>
            <ToastContainer autoClose={1000} position="bottom-right" />
        </>
    );
};

export default Main;
