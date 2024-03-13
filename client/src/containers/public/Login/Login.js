import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputForm from '../../../components/InputForm';
import Button from 'react-bootstrap/Button';
import * as actions from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';

import './Login.scss';
import { showToastError } from '../../../utils/commons/ToastUtil';

const Login = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
    const { isDarkMode } = useSelector((state) => state.theme);

    const [isHost, setIsHost] = useState(false);
    const [isRegister, setIsRegister] = useState(location.state?.flag);
    const [validated, setValidated] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);

    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        password: '',
        isHost: false,
    });

    useEffect(() => {
        setIsRegister(location.state?.flag);
        setPayload({
            name: '',
            phone: '',
            password: '',
            isHost: false,
        });
    }, [location.state?.flag]);
    useEffect(() => {
        isLoggedIn && navigate('/');
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        if (msg === 'Đăng nhập thành công' || msg === 'Đăng ký thành công') return;
        msg && showToastError(msg);
        if (msg !== 'Đăng nhập thành công' && msg !== 'Đăng ký thành công') dispatch(actions.setMsg());
    }, [dispatch, msg, update]);

    const handleSubmit = async (event) => {
        let finalPayload = isRegister
            ? payload
            : {
                  phone: payload.phone,
                  password: payload.password,
              };
        let invalids = validate(finalPayload);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload));
        else {
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
        fields.forEach((item) => {
            switch (item[0]) {
                case 'password':
                    if (item[1].length < 6) {
                        setInvalidFields((prev) => [
                            ...prev,
                            {
                                name: item[0],
                                message: 'Mật khẩu phải có tối thiểu 6 kí tự.',
                            },
                        ]);
                        invalids++;
                    }
                    break;
                case 'phone':
                    if (item[1].length < 10 || item[1].indexOf(0) !== Number('0')) {
                        setInvalidFields((prev) => [
                            ...prev,
                            {
                                name: item[0],
                                message: 'Số điện thoại không hợp lệ.',
                            },
                        ]);
                        invalids++;
                    }
                    break;

                default:
                    break;
            }
        });
        return invalids;
    };

    return (
        <>
            <div className="p-1 p-md-5 m-3 bg-gray">
                <div
                    key={isRegister ? 'Đăng ký' : 'Đăng nhập'}
                    className="d-flex justify-content-center align-items-center"
                >
                    <Form
                        className={`px-5 pt-5 pb-4 rounded login-form text-dark ${
                            isDarkMode ? 'light-theme' : 'bg-light'
                        }`}
                        noValidate
                        validated={validated}
                    >
                        <Form.Group>
                            <h3 className="text-center ">{isRegister ? 'Đăng ký' : 'Đăng nhập'}</h3>
                        </Form.Group>
                        <Form.Group>
                            {isRegister && (
                                <div className="mb-2">
                                    <InputForm
                                        label={'Tên người dùng'}
                                        type={'text'}
                                        typeValue={'name'}
                                        placeHolder={'Nhập tên người dùng'}
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
                            )}
                        </Form.Group>
                        <Form.Group>
                            <div className="mb-2">
                                <InputForm
                                    label={'Số điện thoại'}
                                    type={'text'}
                                    typeValue={'phone'}
                                    placeHolder={'Nhập số điện thoại'}
                                    value={payload.phone}
                                    setValue={setPayload}
                                    invalidFields={invalidFields}
                                    setInvalidFields={setInvalidFields}
                                    pattern={'[0]{1}[0-9]{9,10}'}
                                    maxLength={11}
                                    onSubmit={handleSubmit}
                                    autoFocus={isRegister ? false : true}
                                    autoComplete={'phone'}
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
                                    minlength={6}
                                    maxLength={20}
                                    onSubmit={handleSubmit}
                                    autoComplete={'new-password'}
                                ></InputForm>
                            </div>
                        </Form.Group>
                        {isRegister && (
                            <Form.Group className="d-flex justify-content-center py-1">
                                <Form.Check
                                    type="checkbox"
                                    id="isHost"
                                    checked={isHost}
                                    onChange={() => {
                                        setIsHost(!isHost);
                                        setPayload({
                                            ...payload,
                                            isHost: !isHost,
                                        });
                                    }}
                                />
                                <Form.Label htmlFor="isHost" className="ms-2">
                                    Bạn có phải là chủ trọ?
                                </Form.Label>
                            </Form.Group>
                        )}
                        {!isRegister && (
                            <div className="row mb-2">
                                <div className="col-md-6 d-flex justify-content-center">
                                    <div className="form-check mb-2 mb-md-0">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="loginCheck"
                                            defaultChecked={true}
                                        />
                                        <label className="form-check-label is-valid:checked" htmlFor="loginCheck">
                                            Nhớ tài khoản
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex justify-content-center">
                                    <Link to="/quen-mat-khau" className="text-decoration-none">
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                            </div>
                        )}
                        <Form.Group>
                            <div className="d-grid mb-2">
                                <Button onClick={handleSubmit}>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</Button>
                            </div>
                        </Form.Group>
                        <Form.Group>
                            {!isRegister ? (
                                <div className="text-center">
                                    <p>
                                        Chưa là thành viên?{' '}
                                        <span
                                            role="button"
                                            className="text-primary"
                                            onClick={() => {
                                                setIsRegister(true);
                                                setPayload({
                                                    name: '',
                                                    phone: '',
                                                    password: '',
                                                });
                                            }}
                                        >
                                            Đăng ký
                                        </span>
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p>
                                        Đã có tài khoản?{' '}
                                        <span
                                            role="button"
                                            className="text-primary"
                                            onClick={() => {
                                                setIsRegister(false);
                                                setPayload({
                                                    name: '',
                                                    phone: '',
                                                    password: '',
                                                });
                                            }}
                                        >
                                            Đăng nhập
                                        </span>
                                    </p>
                                </div>
                            )}
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Login;
