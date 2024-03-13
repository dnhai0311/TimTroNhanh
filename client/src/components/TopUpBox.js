import React, { memo } from 'react';
import '../containers/system/User/TopUp/TopUp.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TopUpBox = ({ image, name, path }) => {
    const navigate = useNavigate();

    const { isDarkMode } = useSelector((state) => state.theme);

    const handleClick = () => {
        navigate(path);
    };
    return (
        <div className="rounded mt-3 top-up-box d-flex flex-column justify-content-between" onClick={handleClick}>
            <div className="d-flex justify-content-center py-4">
                <img src={image} alt="thumbnail-method" width={'60px'} height={'60px'} />
            </div>
            <h5 className={`w-100 text-center py-z1 m-0 rounded-bottom border ${isDarkMode ? '' : 'bg-light'}`}>
                {name || 'Thanh toán'}
            </h5>
        </div>
    );
};

export default memo(TopUpBox);
