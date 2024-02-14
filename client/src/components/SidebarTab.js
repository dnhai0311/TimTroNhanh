import React, { memo } from 'react';
import icons from '../utils/icons';
import { Link, useNavigate, createSearchParams, useLocation } from 'react-router-dom';

const SidebarTab = ({ name, value, isDouble, type, scrollFunction }) => {
    const { BsChevronRight } = icons;
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (min, max) => {
        const newSearchParams = createSearchParams({
            [`min${type}`]: min,
            [`max${type}`]: max,
            page: '1',
        }).toString();
        navigate(`${location.pathname}?${newSearchParams}`);
        scrollFunction();
    };
    return (
        <>
            <div className="col-12  border rounded ">
                <h6 className="py-3 fw-bold">{name}</h6>
                {!isDouble && (
                    <div className="row">
                        {value?.length > 0 &&
                            value.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        className="pb-2 mb-2 d-flex align-items-center sidebarTab col-12"
                                    >
                                        <BsChevronRight color="#C2C2C2" className="me-1" />
                                        <Link
                                            to={`/${item.name}`}
                                            className="text-decoration-none fw-light sidebarItem"
                                        >
                                            {item.value}
                                        </Link>
                                    </div>
                                );
                            })}
                    </div>
                )}
                {isDouble && (
                    <div className="row">
                        {value?.length > 0 &&
                            value.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        className="pb-2 mb-2 d-flex align-items-center sidebarTab isDouble col-6"
                                    >
                                        <BsChevronRight color="#C2C2C2" className="me-1" />
                                        <div
                                            className="text-decoration-none fw-light sidebarItem"
                                            onClick={() => handleClick(item.min, item.max)}
                                        >
                                            {item.value}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                )}
            </div>
        </>
    );
};

export default memo(SidebarTab);
