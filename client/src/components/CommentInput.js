import React, { memo, useState, useRef } from 'react';
import { Form } from 'react-bootstrap';
import icons from '../utils/icons';
import { showToastSuccess, showToastError } from '../utils/commons/ToastUtil';

const CommentInput = () => {
    const { FaStar } = icons;

    const [star, setStar] = useState(0);
    const inputRef = useRef(null);

    const handleTextareaInput = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    const onClickStar = (index) => {
        setStar(index);
    };

    const submitComment = async () => {
        if (star <= 0 || inputRef.current.value === '') {
            showToastError('Hãy nhập đánh giá và chọn số sao cho tin này');
            return;
        }
        console.log('enter: ', inputRef.current.value);
        inputRef.current.value = '';
        setStar(0);
        showToastSuccess('Đánh giá thành công');
    };

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitComment();
        }
    };

    return (
        <>
            <Form.Control
                className="pt-2 pb-3 mt-2 overflow-hidden"
                placeholder="Viết đánh giá"
                as="textarea"
                onInput={handleTextareaInput}
                onKeyDown={handleEnterPress}
                ref={inputRef}
            />
            <div className="text-end">
                {Array(5)
                    .fill()
                    .map((_, index) => (
                        <FaStar
                            key={index}
                            color={index < star ? '#FFD24E' : ''}
                            value={index}
                            onClick={() => onClickStar(index + 1)}
                        />
                    ))}
            </div>
        </>
    );
};

export default memo(CommentInput);
