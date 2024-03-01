import React, { memo, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { formatToVND } from '../utils/commons/formatToVND';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';

const Payment = ({ name }) => {
    const navigate = useNavigate();

    const radioOptions = [50000, 100000, 200000, 500000, 1000000];

    const [amount, setAmount] = useState(null);

    const handleRadioChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setAmount(value);
    };

    const formatAmount = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleCustomAmountChange = (event) => {
        const value = event.target.value.replace(/\D/g, '');
        setAmount(value === '' ? null : parseInt(value, 10));
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h4>Bạn đã chọn nạp tiền bằng {name}</h4>
                <Button
                    className="px-2 border rounded btn-success"
                    onClick={() => {
                        navigate('/quan-ly/nap-tien');
                    }}
                >
                    Quay lại
                </Button>
            </div>
            <div className="mt-3">Chọn nhanh số tiền cần nạp</div>
            <Form className="mt-2">
                <div className="d-flex">
                    {radioOptions.map((option) => (
                        <Form.Check
                            key={option}
                            type="radio"
                            label={formatToVND(option)}
                            name="moneyRadioGroup"
                            id={`moneyRadio-${option}`}
                            value={option}
                            onChange={handleRadioChange}
                            checked={amount === option}
                            className="pe-4"
                        />
                    ))}
                </div>
                <div className="mt-3">Hoặc nhập số tiền cần nhập</div>
                <InputGroup className="d-flex mt-2 w-25">
                    <Form.Control
                        type="text"
                        placeholder="Nhập số tiền"
                        value={amount === null ? '' : formatAmount(amount)}
                        onChange={handleCustomAmountChange}
                    />
                    <InputGroup.Text id="basic-addon1">vnđ</InputGroup.Text>
                </InputGroup>
                <Button className="w-100 mt-3">Tiếp tục</Button>
            </Form>
        </>
    );
};

export default memo(Payment);
