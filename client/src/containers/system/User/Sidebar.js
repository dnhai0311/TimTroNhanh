import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Sidebar.scss';
import icons from '../../../utils/icons';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThemeToggle from '../../public/Header/ThemeToggle';
import { formatToVND } from '../../../utils/commons/formatToVND';
import { useViewport } from '../../../components/index';

const Sidebar = ({ handleSignOut }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const viewPort = useViewport();
    const [category, setCategory] = useState(location.pathname.split('/').pop());
    const { userData } = useSelector((state) => state.user);
    const { FaRegFileAlt, MdOutlineMessage, MdPayment, LiaHistorySolid, LuUserSquare, FaSignOutAlt } = icons;

    const [activeRow, setActiveRow] = useState(category);
    const [showMenu, setShowMenu] = useState(false);
    const isShowMenu = viewPort < 576;
    const navigateAndSetActiveRow = (rowName) => {
        setActiveRow(rowName);
        navigate(rowName);
    };

    useEffect(() => {
        setCategory(location.pathname.split('/')[2]);
        setActiveRow(category);
    }, [category, location.pathname]);

    useEffect(() => {
        setShowMenu(!isShowMenu);
    }, [isShowMenu]);
    return (
        <>
            <Container>
                <Row className="d-flex justify-content-center align-items-center pt-1">
                    <Col sm={4}>
                        <Row>
                            <img
                                src={userData.avatar}
                                alt="avatar"
                                className=" rounded-circle m-auto"
                                style={{ width: 100 + 'px', height: 75 + 'px' }}
                            />
                        </Row>
                    </Col>
                    <Col sm={8}>
                        <Row className="fw-bold">{userData.name}</Row>
                        <Row>Mã thành viên: {userData.id}</Row>
                        <Row>{userData.phone}</Row>
                        <Row>Số tiền: {formatToVND(userData?.money)}</Row>
                    </Col>
                </Row>
                <Row className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
                    {isShowMenu && (
                        <Button variant="outline-primary" size="sm">
                            Menu
                        </Button>
                    )}
                </Row>
                {showMenu && (
                    <>
                        <Row className="mt-2 mb-2">
                            <Col className="p-0 d-flex align-items-center justify-content-between">
                                <Button
                                    onClick={() => {
                                        navigate('dang-tin-moi');
                                    }}
                                    className="bg-success"
                                >
                                    Đăng tin mới
                                </Button>
                                <ThemeToggle className={'me-2'} />
                            </Col>
                        </Row>
                        <Row
                            onClick={() => navigateAndSetActiveRow('tin-nhan')}
                            className={`sidebar-item ${activeRow === 'tin-nhan' ? 'active' : ''}`}
                        >
                            <Col>
                                <MdOutlineMessage />
                                <span>Tin nhắn</span>
                            </Col>
                        </Row>
                        <Row
                            onClick={() => navigateAndSetActiveRow('nap-tien')}
                            className={`sidebar-item ${activeRow === 'nap-tien' ? 'active' : ''}`}
                        >
                            <Col>
                                <MdPayment />
                                <span>Nạp tiền</span>
                            </Col>
                        </Row>
                        <Row
                            onClick={() => navigateAndSetActiveRow('tin-dang')}
                            className={`sidebar-item ${activeRow === 'tin-dang' ? 'active' : ''}`}
                        >
                            <Col>
                                <FaRegFileAlt />
                                <span>Quản lý tin đăng</span>
                            </Col>
                        </Row>
                        <Row
                            onClick={() => navigateAndSetActiveRow('lich-su-giao-dich')}
                            className={`sidebar-item ${activeRow === 'lich-su-giao-dich' ? 'active' : ''}`}
                        >
                            <Col>
                                <LiaHistorySolid />
                                <span>Lịch sử giao dịch</span>
                            </Col>
                        </Row>
                        <Row
                            onClick={() => navigateAndSetActiveRow('thong-tin-tai-khoan')}
                            className={`sidebar-item ${activeRow === 'thong-tin-tai-khoan' ? 'active' : ''}`}
                        >
                            <Col>
                                <LuUserSquare />
                                <span>Thông tin tài khoản</span>
                            </Col>
                        </Row>
                        <Row onClick={handleSignOut} className="sidebar-item">
                            <Col>
                                <FaSignOutAlt />
                                <span>Đăng xuất</span>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </>
    );
};

export default Sidebar;
