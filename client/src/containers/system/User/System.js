import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../../public/Header/Navigation';
import Sidebar from './Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../store/actions/app';

import * as actions from '../../../store/actions';
import './Sidebar.scss';
import { getCurrentUser } from '../../../store/actions/user';

const System = () => {
    const dispatch = useDispatch();
    const { isAdmin } = useSelector((state) => state.auth);

    const { isDarkMode } = useSelector((state) => state.theme);
    useEffect(() => {
        if (isAdmin) {
            dispatch(actions.logout());
            return;
        }
        dispatch(getCategories());
        dispatch(getCurrentUser());
    }, [dispatch, isAdmin]);

    const handleSignOut = () => {
        dispatch(actions.logout());
    };
    return (
        <div className={`${isDarkMode ? 'bg-dark text-light' : 'text-dark'}`} style={{ minHeight: '100vh' }}>
            <Navigation handleGotoTop={() => {}} />
            <Container fluid>
                <Row>
                    <Col
                        sm={5}
                        md={4}
                        lg={3}
                        className={`d-block sidebar h-100 ${isDarkMode ? 'dark-theme' : 'light-theme'} `}
                    >
                        <Sidebar handleSignOut={handleSignOut} />
                    </Col>
                    <Col className="d-none d-sm-block" sm={5} md={4} lg={3}></Col>
                    <Col sm={7} md={8} lg={9}>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default System;
