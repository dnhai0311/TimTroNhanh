import React, { memo, useState, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { showToastSuccess, showToastError } from '../utils/commons/ToastUtil';
import { apiRatePost, apiDidUserRatePost } from '../services/post';
import '../containers/public/PostDetail/ListComment.scss';

const CommentInput = ({ userId, postId, isAdmin }) => {
    const [star, setStar] = useState(0);
    const inputRef = useRef(null);
    const [isUserRated, setIsUserRated] = useState(false);
    console.log(star);
    const handleTextareaInput = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    const onClickStar = (index) => {
        setStar(index);
        inputRef.current.focus();
    };

    const submitComment = async () => {
        if (!userId) {
            showToastError('Hãy đăng nhập để có thể đánh giá');
            return;
        }
        if (star <= 0 || inputRef.current.value === '') {
            showToastError('Hãy nhập đánh giá và chọn số sao cho tin này');
            return;
        }
        const response = await apiRatePost(postId, star, inputRef.current.value);
        if (response.status === 200) {
            inputRef.current.value = '';
            setStar(0);
            showToastSuccess(response.data.msg);
        } else {
            showToastError(response.data.msg);
        }
    };

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitComment();
        }
    };

    useEffect(() => {
        const DidUserRatePost = async () => {
            const response = await apiDidUserRatePost(postId);
            if (response.status === 200) {
                setIsUserRated(response.data.isRated);
            }
        };
        userId && postId && DidUserRatePost();
    }, [postId, userId]);

    return (
        <>
            {!isAdmin && (
                <>
                    <Form.Control
                        className="pt-2 pb-3 mt-2 overflow-hidden"
                        placeholder={!isUserRated ? 'Viết đánh giá' : 'Bạn đã đánh giá tin đăng này'}
                        as="textarea"
                        onInput={handleTextareaInput}
                        onKeyDown={handleEnterPress}
                        ref={inputRef}
                        disabled={isUserRated}
                    />
                    <div className="rating">
                        {!isUserRated &&
                            Array(5)
                                .fill()
                                .map((_, index) => (
                                    <React.Fragment key={index}>
                                        <input value={index} name="rating" id={`star${index}`} type="radio" />
                                        <label htmlFor={`star${index}`} onClick={() => onClickStar(5 - index)}></label>
                                    </React.Fragment>
                                ))}
                    </div>
                </>
            )}
        </>
    );
};

export default memo(CommentInput);
