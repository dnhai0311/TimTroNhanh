import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { apiResetPassword, apiUpdateUser } from '../../../services/user';

import { useNavigate } from 'react-router-dom';
import { showToastError, showToastSuccess } from '../../../utils/commons/ToastUtil';

const ChangePassword = ({ isReset }) => {
    const navigate = useNavigate();
    const [oldPassword, setOldPasswordChange] = useState('');
    const [newPassword, setNewPasswordChange] = useState('');
    const [reNewPassword, setReNewPasswordChange] = useState('');

    const handleOldPasswordChange = (e) => {
        setOldPasswordChange(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPasswordChange(e.target.value);
    };

    const handleReNewPasswordChange = (e) => {
        setReNewPasswordChange(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (newPassword === reNewPassword) {
            if (isReset) {
                const response = await apiResetPassword({ newPassword });
                if (response.success === true) {
                    showToastError(response.data.message);
                    return;
                }
                showToastSuccess(response.data.message);
                navigate('/login');
            } else {
                const response = await apiUpdateUser({ oldPassword, newPassword });
                if (response.success === true) {
                    showToastError(response.data.message);
                    return;
                }
                showToastSuccess(response.data.message);
                navigate('/quan-ly/thong-tin-tai-khoan');
            }
        }
    };
    return (
        <>
            <h3 className={`py-3 px-5 border-bottom ${isReset ? 'text-center' : ''}`}>
                {isReset ? 'Đặt lại mật khẩu' : 'Đổi mật khẩu'}
            </h3>
            <Form className={`${isReset ? 'w-100' : 'w-50'} m-auto`} onSubmit={handleSubmit}>
                {!isReset && (
                    <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu cũ</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={handleOldPasswordChange}
                            autoComplete="password"
                            minLength={6}
                            maxLength={20}
                            required
                        />
                    </Form.Group>
                )}
                <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={handleNewPasswordChange}
                        autoComplete="new password"
                        minLength={6}
                        maxLength={20}
                        required
                    />
                    {newPassword !== reNewPassword && (
                        <Form.Text className="text-danger">Mật khẩu không giống nhau</Form.Text>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nhập lại mật khẩu mới</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={handleReNewPasswordChange}
                        autoComplete="re new password"
                        minLength={6}
                        maxLength={20}
                        required
                    />
                    {newPassword !== reNewPassword && (
                        <Form.Text className="text-danger">Mật khẩu không giống nhau</Form.Text>
                    )}
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3">
                    Đổi mật khẩu
                </Button>
            </Form>
        </>
    );
};

export default ChangePassword;
