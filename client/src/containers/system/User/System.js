import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../../public/Header/Navigation';
import Sidebar from './Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../store/actions/app';
import { ToastContainer } from 'react-toastify';
import * as actions from '../../../store/actions';
import './Sidebar.scss';
import { getCurrentUser } from '../../../store/actions/user';

const System = () => {
    const dispatch = useDispatch();
    const { isDarkMode } = useSelector((state) => state.theme);
    useEffect(() => {
        dispatch(getCategories());
        dispatch(getCurrentUser());
    }, [dispatch]);

    const handleSignOut = () => {
        dispatch(actions.logout());
    };
    return (
        <>
            <Navigation handleGotoTop={() => {}} />
            <Container className={`${isDarkMode ? 'light-theme' : ''}`} fluid>
                <Row>
                    <Col sm={3} className={`d-block sidebar h-100 ${isDarkMode ? 'dark-theme' : 'light-theme'} `}>
                        <Sidebar handleSignOut={handleSignOut} />
                    </Col>
                    <Col className="d-none d-sm-block" sm={3}></Col>
                    <Col sm={9}>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
            <ToastContainer autoClose={1000} position="bottom-right" />
        </>
    );
};

export default System;
