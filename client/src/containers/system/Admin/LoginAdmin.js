import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputForm from '../../../components/InputForm';
import Button from 'react-bootstrap/Button';
import { showToastError, showToastSuccess } from '../../../utils/commons/ToastUtil';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/actions/auth';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const dispatch = useDispatch();
    const { isAdmin, msg, update } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    console.log(isAdmin);
    const [payload, setPayload] = useState({
        name: '',
        password: '',
    });
    const [validated, setValidated] = useState(false);

    const [invalidFields, setInvalidFields] = useState([]);

    const handleSubmit = async (event) => {
        let invalids = validate(payload);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (invalids === 0) {
            dispatch(login(payload));
        } else {
            showToastError('Vui lòng nhập lại');
        }
    };

    const validate = (payload) => {
        let invalids = 0;
        let fields = Object.entries(payload);
        fields.forEach((item) => {
            if (item[1] === '') {
                setInvalidFields((prev) => [
                    ...prev,
                    {
                        name: item[0],
                        message: 'Bạn không được bỏ trống trường này.',
                    },
                ]);

                invalids++;
            }
        });
        return invalids;
    };
    useEffect(() => {
        if (msg === '') return;
        if (msg.includes('thành công')) {
            showToastSuccess(msg);
        } else {
            showToastError(msg);
        }
    }, [dispatch, msg, update]);

    useEffect(() => {
        isAdmin && navigate('/admin');
    }, [isAdmin, navigate]);

    return (
        <div className=" bg-light d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Form className={`px-5 pt-5 pb-4 rounded login-form text-dark bg-white`} noValidate validated={validated}>
                <Form.Group>
                    <h3 className="text-center ">Đăng nhập</h3>
                </Form.Group>
                <Form.Group>
                    <div className="mb-2">
                        <InputForm
                            label={'Tên tài khoản admin'}
                            type={'text'}
                            typeValue={'name'}
                            placeHolder={'Tên tài khoản admin'}
                            value={payload.name}
                            setValue={setPayload}
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                            maxLength={25}
                            onSubmit={handleSubmit}
                            autoFocus={true}
                            autoComplete={'username'}
                        ></InputForm>
                    </div>
                </Form.Group>
                <Form.Group>
                    <div className="mb-2">
                        <InputForm
                            label={'Mật khẩu'}
                            type={'password'}
                            typeValue={'password'}
                            placeHolder={'Nhập mật khẩu'}
                            value={payload.password}
                            setValue={setPayload}
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                            minlength={0}
                            maxLength={20}
                            onSubmit={handleSubmit}
                            autoComplete={'password'}
                        ></InputForm>
                    </div>
                </Form.Group>
                <Form.Group>
                    <div className="d-grid mb-2">
                        <Button onClick={handleSubmit}>Đăng nhập</Button>
                    </div>
                </Form.Group>
            </Form>
        </div>
    );
};

export default LoginAdmin;
