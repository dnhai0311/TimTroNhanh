import React, { memo } from 'react';
import '../containers/public/PostDetail/PostDetails.scss';
import icons from '../utils/icons';

const Comment = ({ star, comment, name, avatar }) => {
    const { FaStar } = icons;

    return (
        <div className="comment pt-2 pb-1">
            <div className="d-flex align-items-center">
                <img src={avatar} alt="avatar" className="small-avatar rounded" />
                <div className="fw-bold text-primary ms-2">{name}</div>
            </div>
            <div>
                {Array.from({ length: star }, (_, i) => (
                    <FaStar key={i} color="FFD24E" />
                ))}
            </div>
            <div>{comment}</div>
        </div>
    );
};

export default memo(Comment);
