import React, { memo } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import icons from '../utils/icons';
import { useNavigate } from 'react-router-dom';

const DropDownManage = ({ handleSignOut }) => {
    const { FaRegFileAlt, MdOutlineMessage, MdPayment, LiaHistorySolid, LuUserSquare, FaSignOutAlt } = icons;
    const navigate = useNavigate();
    return (
        <>
            <DropdownButton variant="primary" id="dropdown-manage-button" title="Quản lý tài khoản">
                <Dropdown.Item
                    className="d-flex align-items-center"
                    onClick={() => {
                        navigate('/quan-ly/tin-nhan');
                    }}
                >
                    <MdOutlineMessage />
                    <span className="px-1">Tin nhắn</span>
                </Dropdown.Item>
                <Dropdown.Item
                    className="d-flex align-items-center"
                    onClick={() => {
                        navigate('/quan-ly/nap-tien');
                    }}
                >
                    <MdPayment />
                    <span className="px-1">Nạp tiền</span>
                </Dropdown.Item>
                <Dropdown.Item
                    className="d-flex align-items-center"
                    onClick={() => {
                        navigate('/quan-ly/tin-dang');
                    }}
                >
                    <FaRegFileAlt /> <span className="px-1">Quản lý tin đăng</span>
                </Dropdown.Item>
                <Dropdown.Item
                    className="d-flex align-items-center"
                    onClick={() => {
                        navigate('/quan-ly/lich-su-giao-dich');
                    }}
                >
                    <LiaHistorySolid />
                    <span className="px-1">Lịch sử giao dịch</span>
                </Dropdown.Item>
                <Dropdown.Item
                    className="d-flex align-items-center"
                    onClick={() => {
                        navigate('/quan-ly/thong-tin-tai-khoan');
                    }}
                >
                    <LuUserSquare />
                    <span className="px-1">Thông tin tài khoản</span>
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center border-top" onClick={handleSignOut}>
                    <FaSignOutAlt />
                    <span className="px-1">Đăng xuất</span>
                </Dropdown.Item>
            </DropdownButton>
        </>
    );
};

export default memo(DropDownManage);
