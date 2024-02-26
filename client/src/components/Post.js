import React, { memo, useEffect, useState } from 'react';
import icons from '../utils/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';
import { useSelector } from 'react-redux';
import { apiLikePost } from '../services/post';
import { showToastSuccess } from '../utils/commons/ToastUtil';

const Post = ({
    title,
    price,
    area,
    location,
    star,
    time,
    description,
    uploader,
    img,
    phone,
    id,
    avatar,
    isLiked,
    postType,
}) => {
    const { FaStar, FaHeart } = icons;
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [isRed, setIsRed] = useState(false);
    useEffect(() => {
        setIsRed(isLiked);
    }, [isLiked]);

    const address = location
        .split(',')
        .map((phan) => phan.trim())
        .slice(-2)
        .join(', ');
    moment.locale('vi');
    const formattedTime = moment(time).fromNow();

    const handleLikePost = async () => {
        const response = await apiLikePost(id);
        if (response.status === 200) {
            showToastSuccess(response.data.msg);
            setIsRed(!isRed);
        }
    };

    return (
        <div className="col-12 py-3 border-top border-bottom border-dark post position-relative">
            <div className="row gx-4">
                <div className="col-4 d-flex position-relative p-0">
                    <Link className="w-100" to={`/post/${id}`}>
                        {postType === +2 && (
                            <div className="post-hight-light p-1 bg-danger text-light rounded">Tin nổi bật</div>
                        )}
                        <img src={img} alt="thumbnail" className=" rounded post-thumb" />
                    </Link>
                    <div className={'position-absolute bottom-0 end-0'}>
                        {isLoggedIn && (
                            <FaHeart
                                className={`mx-4 my-2 icon-heart ${isRed ? 'text-danger' : 'text-dark'}`}
                                fontSize={'25px'}
                                onClick={handleLikePost}
                            />
                        )}
                    </div>
                </div>
                <div className="col-8">
                    <Link
                        to={`/post/${id}`}
                        className="px-2 fw-bold text-danger line-clamp-2 text-justify text-decoration-none text-uppercase"
                    >
                        {title}
                    </Link>
                    <div className="px-2 ">
                        {Array(5)
                            .fill()
                            .map((_, index) => (
                                <FaStar key={index} color={index < star ? '#FFD24E' : ''} value={index} />
                            ))}
                    </div>
                    <div className="px-2 d-flex justify-content-between">
                        <div className="fw-bold text-success text-truncate ">
                            {price < 1 ? `${price * 1000}.000 đồng` : `${price}triệu`}/tháng
                        </div>
                        <div className="text-truncate ">{area}m²</div>
                        <div className="text-truncate post-item">{address}</div>
                        <div className="text-truncate ">{formattedTime}</div>
                    </div>
                    <div className="px-2 my-2 line-clamp-3 text-justify fw-light">{description}</div>
                    <div className="px-2">
                        <div className="row">
                            <div className="col-6 d-flex align-items-center">
                                <img
                                    src={avatar}
                                    alt="avatar"
                                    className="border rounded-circle"
                                    style={{ width: '30px', height: '30px' }}
                                />
                                <span className="px-2 text-truncate">{uploader}</span>
                            </div>
                            <div className="col-6 text-end text-truncate px-2 py-1 text-light">
                                <span className="border p-1 rounded bg-primary ">Liên hệ: {phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Post);
