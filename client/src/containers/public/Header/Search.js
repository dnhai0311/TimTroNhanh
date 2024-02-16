import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { SearchItem, MyModal } from '../../../components/';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetProvinces, apiGetDistricts } from '../../../services/app';
import icons from '../../../utils/icons';
import './Search.scss';

import { createSearchParams, useNavigate, useLocation } from 'react-router-dom';

const Search = () => {
    const { BsChevronRight, IoLocationOutline, BsHouseDoor, IoPricetagsOutline, BiArea, FaSearch, IoIosCloseCircle } =
        icons;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [isShowModal, setIsShowModal] = useState(false);
    const [content, setContent] = useState('');
    const [data, setData] = useState([]);

    const [category, setCategory] = useState({});
    const [province, setProvince] = useState({});
    const [district, setDistrict] = useState({});
    const [price, setPrice] = useState({});
    const [acreage, setAcreage] = useState({});

    const [param, setParam] = useState('');

    const { categories, prices, acreages } = useSelector((state) => state.app);

    const [provinces, setProvinces] = useState({});
    const [districts, setDistricts] = useState({});

    useEffect(() => {
        const fetchProvinces = async () => {
            const response = await apiGetProvinces();
            setProvinces(response.data.response);
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (location.search === '') {
            setCategory({});
            setProvince({});
            setDistrict({});
            setPrice({});
            setAcreage({});
        }
    }, [location]);

    useEffect(() => {
        const fetchDistricts = async (provinceId) => {
            const response = await apiGetDistricts(provinceId);
            setDistricts(response.data.response);
        };
        if (province.id) {
            fetchDistricts(province.id);
        }
    }, [dispatch, province]);

    const handleShow = (content, data) => {
        setContent(content);
        setData(data);
        setIsShowModal(true);
    };

    const handleSelect = (content, item) => {
        if (content === 'Loại trọ') {
            setCategory(item);
            return;
        }
        if (content === 'Vị trí') {
            setProvince(item);
            return;
        }
        if (content === 'Giá') {
            setPrice(item);
            return;
        }
        if (content === 'Diện tích') {
            setAcreage(item);
            return;
        }
        setDistrict(item);
    };

    const handleSubmit = () => {
        category.code ? navigate(`/${category.name}/?${param}`) : navigate(`/?${param}`);
    };

    useEffect(() => {
        const params = createSearchParams({
            districtId: district.id || '',
            provinceId: province.id || '',
            minPrice: price.min || '0',
            maxPrice: price.max || '',
            minAcreage: acreage.min || '0',
            maxAcreage: acreage.max || '',
        }).toString();
        setParam(params);
    }, [isShowModal, param, district, province, price, acreage]);

    return (
        <>
            <div className="w-100 searchBar ">
                <div className="mx-auto p-3 bg-danger border rounded d-flex flex-column flex-lg-row justify-content-start">
                    <SearchItem
                        text={category?.value || 'Toàn bộ'}
                        IconBefore={<BsHouseDoor className="mx-1" color="#C2C2C2" />}
                        IconAfter={
                            category.value ? (
                                <IoIosCloseCircle
                                    fontSize={'20px'}
                                    onClick={() => {
                                        setCategory({});
                                    }}
                                />
                            ) : (
                                <BsChevronRight color="#C2C2C2" />
                            )
                        }
                        handleShow={() => handleShow('Loại trọ', categories)}
                    />
                    <SearchItem
                        text={district.value ? `${district.value}, ${province.value}` : province.value || 'Toàn bộ'}
                        IconBefore={<IoLocationOutline className="mx-1" color="#C2C2C2" />}
                        IconAfter={
                            province.value ? (
                                <IoIosCloseCircle
                                    fontSize={'20px'}
                                    onClick={() => {
                                        setProvince({});
                                        setDistrict({});
                                    }}
                                />
                            ) : (
                                <BsChevronRight color="#C2C2C2" />
                            )
                        }
                        handleShow={() => {
                            if (!province.id || province.id === 0) {
                                handleShow('Vị trí', provinces);
                            } else {
                                handleShow(province.value, districts);
                            }
                        }}
                    />
                    <SearchItem
                        text={price?.value || 'Chọn giá'}
                        IconBefore={<IoPricetagsOutline className="mx-1" color="#C2C2C2" />}
                        IconAfter={
                            price.value ? (
                                <IoIosCloseCircle
                                    fontSize={'20px'}
                                    onClick={() => {
                                        setPrice({});
                                    }}
                                />
                            ) : (
                                <BsChevronRight color="#C2C2C2" />
                            )
                        }
                        handleShow={() => handleShow('Giá', prices)}
                    />
                    <SearchItem
                        text={acreage?.value || 'Chọn diện tích'}
                        IconBefore={<BiArea className="mx-1" color="#C2C2C2" />}
                        IconAfter={
                            acreage.value ? (
                                <IoIosCloseCircle
                                    fontSize={'20px'}
                                    onClick={() => {
                                        setAcreage({});
                                    }}
                                />
                            ) : (
                                <BsChevronRight color="#C2C2C2" />
                            )
                        }
                        handleShow={() => handleShow('Diện tích', acreages)}
                    />
                    <Button
                        className="w-100 w-lg-25 my-1 mx-1 fw-bold p-1 d-flex justify-content-center align-items-center"
                        onClick={handleSubmit}
                    >
                        <FaSearch className="mx-1" />
                        <span>Tìm kiếm</span>
                    </Button>
                </div>
            </div>
            {isShowModal && (
                <MyModal
                    handleSelect={handleSelect}
                    setIsShowModal={setIsShowModal}
                    content={content}
                    data={data}
                    setDistrict={setDistrict}
                    setProvince={setProvince}
                    setCategory={setCategory}
                />
            )}
        </>
    );
};

export default Search;
