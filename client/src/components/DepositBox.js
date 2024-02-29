import React, { memo } from 'react';
import '../containers/system/User/Deposit/Deposit.scss';
import { useSelector } from 'react-redux';
const DepositBox = ({ image, name }) => {
    const { isDarkMode } = useSelector((state) => state.theme);

    return (
        <div className="rounded mt-3 deposit-box d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-center py-4">
                <img src={image} alt="thumbnail-method" width={'60px'} />
            </div>
            <h5 className={`w-100 text-center py-1 m-0 rounded-bottom border ${isDarkMode ? '' : 'bg-light'}`}>
                {name || 'Thanh toán'}
            </h5>
        </div>
    );
};

export default memo(DepositBox);
