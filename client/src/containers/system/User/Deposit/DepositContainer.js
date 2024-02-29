import React from 'react';
import { DepositBox } from '../../../../components';
import momo from '../../../../assets/payment/momo.png';

const DepositContainer = () => {
    return (
        <div>
            <h4>Mời bạn chọn phương thức nạp tiền</h4>
            <div className="d-flex flex-wrap">
                <DepositBox image={momo} name={'Momo'} />
                <DepositBox image={momo} />
                <DepositBox />
                <DepositBox />
                <DepositBox />
            </div>
        </div>
    );
};

export default DepositContainer;
