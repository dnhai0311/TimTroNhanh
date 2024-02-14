import React, { memo } from 'react';

const SearchItem = ({ text, IconBefore, IconAfter, fontWeight, handleShow }) => {
    return (
        <>
            <div className="bg-light p-1 mx-1 my-1 border rounded w-100 w-lg-25 fw-normal d-flex justify-content-between align-items-center">
                <div
                    onClick={handleShow}
                    className="d-flex justify-content-start align-items-center text-nowrap d-inline-block text-truncate mx-1"
                    style={{ flex: '10', cursor: 'pointer' }}
                >
                    {IconBefore}
                    <span className={fontWeight}>{text}</span>
                </div>
                <div style={{ flex: '1', cursor: 'pointer' }} className="d-flex align-items-center">
                    {IconAfter}
                </div>
            </div>
        </>
    );
};

export default memo(SearchItem);
