import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Header from './Header';
import './Sidebar.scss';
const Admin = () => {
    return (
        <Container fluid>
            <Row>
                <Col sm="3" className="admin-sidebar text-light" style={{ minHeight: '100vh' }}>
                    <Sidebar />
                </Col>
                <Col sm="9" className="p-0 bg-light">
                    <Header />
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;
