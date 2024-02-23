import React, { memo } from 'react';
import '../containers/public/PostDetail/PostDetails.scss';
import icons from '../utils/icons';

const Comment = ({ star, comment, name, avatar }) => {
    const { FaStar } = icons;

    return (
        <div className="pt-2 pb-1">
            <div className="d-flex">
                <img src={avatar} alt="avatar" className="small-avatar rounded" />
                <div className="ms-2 px-2 light-theme border rounded">
                    <small className="fw-bold text-primary">{name}</small>
                    <div className="mb-1">
                        {Array.from({ length: star }, (_, i) => (
                            <FaStar key={i} color="FFD24E" />
                        ))}
                    </div>
                    <div>{comment}</div>
                </div>
            </div>
        </div>
    );
};

export default memo(Comment);
