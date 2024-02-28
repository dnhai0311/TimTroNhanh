import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import InputForm from '../../components/InputForm';
import { showToastError, showToastSuccess } from '../../utils/commons/ToastUtil';
import { apiGetUser } from '../../services/user';

const ForgetPassword = () => {
    const { isDarkMode } = useSelector((state) => state.theme);

    const [validated, setValidated] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);

    const [payload, setPayload] = useState({
        phone: '',
    });
    const [isFind, setIsFind] = useState(false);

    const [isOTPDisabled, setIsOTPDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const intervalRef = useRef(null);

    const [isShowOTPInput, setIsShowOTPInput] = useState(false);

    const otpRef = useRef(null);

    const findUser = async (phone) => {
        const response = await apiGetUser('', phone);
        if (response.data.err === 0) {
            setIsFind(true);
        } else {
            setIsFind(false);
            showToastError('Không tìm thấy người dùng');
            setIsShowOTPInput(false);
        }
    };

    const handleSubmit = async (event) => {
        let invalids = validate(payload);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (invalids !== 0) {
            showToastError('Vui lòng nhập lại');
            setIsFind(false);
        } else {
            findUser(payload.phone);
        }

        setValidated(true);
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

    const handleOTPSend = () => {
        setIsOTPDisabled(true);
        setIsShowOTPInput(true);
        showToastSuccess('Đã gửi OTP');
        intervalRef.current = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(intervalRef.current);
            setIsOTPDisabled(false);
            setCountdown(60);
        }, 60000);
    };

    const handleOTPCheck = () => {
        showToastSuccess('Đã xác nhận OTP');
    };

    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (isOTPDisabled) {
            otpRef.current.focus();
        }
    }, [isOTPDisabled]);

    useEffect(() => {
        setIsFind(false);
    }, [payload]);
    return (
        <>
            <div className="p-1 p-md-5 m-3 bg-gray">
                <div className="d-flex justify-content-center align-items-center">
                    <Form
                        className={`px-5 pt-5 pb-4 rounded login-form text-dark ${
                            isDarkMode ? 'light-theme' : 'bg-light'
                        }`}
                        noValidate
                        validated={validated}
                    >
                        <Form.Group>
                            <h3 className="text-center ">Quên mật khẩu</h3>
                        </Form.Group>
                        <Form.Group>
                            <div className="mb-1">
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
                                    autoFocus={true}
                                    autoComplete={'phone'}
                                ></InputForm>
                            </div>
                        </Form.Group>
                        {isFind ? (
                            <div className={`d-flex align-items-center ${isShowOTPInput ? '' : 'justify-content-end'}`}>
                                {isShowOTPInput ? (
                                    <input
                                        className="px-2 py-1 border rounded mt-1 mb-2 w-25"
                                        ref={otpRef}
                                        maxLength={6}
                                    />
                                ) : null}
                                <Button
                                    onClick={handleOTPSend}
                                    disabled={isOTPDisabled}
                                    className="bg-light text-primary p-1 border-light ms-1"
                                >
                                    {isOTPDisabled ? `${countdown} giây để gửi lại` : 'Gửi mã '}
                                </Button>
                            </div>
                        ) : null}

                        {otpRef?.current?.value?.length === 6 ? (
                            <Form.Group>
                                <div className="d-grid mb-2">
                                    <Button onClick={handleOTPCheck}>Xác thực OTP</Button>
                                </div>
                            </Form.Group>
                        ) : (
                            <Form.Group>
                                <div className="d-grid mb-2">
                                    <Button onClick={handleSubmit}>Tìm</Button>
                                </div>
                            </Form.Group>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
};

export default ForgetPassword;
