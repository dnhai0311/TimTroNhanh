import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddressForm from './AddressForm';
import Overview from './Overview';
import Picture from './Picture';
import { apiUploadImage } from '../../../../services/app';
import { apiCreatePost, apiUpdatePost } from '../../../../services/post';
import Loading from '../../../Loading';
import { useNavigate } from 'react-router-dom';
import { showToastSuccess, showToastError } from '../../../ToastUtil';
import { toast } from 'react-toastify';
const CreateNewPost = ({ isUpdate, dataPost, isSomePostUpdate, setIsSomePostUpdate }) => {
    const navigate = useNavigate();

    const [provinceSelected, setProvinceSelected] = useState({
        id: 0,
        value: '',
    });

    const [districtSelected, setDistrictSelected] = useState({
        id: 0,
        value: '',
    });

    const [exactlyAddress, setExactlyAddress] = useState('');
    const [address, setAddress] = useState('');
    const [categorySelected, setCategorySelected] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [acreage, setAcreage] = useState('');

    const [imgFiles, setImgFiles] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!dataPost) return;
        setTitle(dataPost?.title);
        setDescription(dataPost?.description);
        setPrice(dataPost?.attribute?.price);
        setAcreage(dataPost?.attribute?.acreage);
        setAddress(dataPost?.attribute?.address.split(', ').slice(0, 2).join(', '));
        setCategorySelected(dataPost.category);
        setProvinceSelected(dataPost?.attribute?.district?.province);
        setDistrictSelected({
            id: dataPost?.attribute?.district.id,
            value: dataPost?.attribute?.district?.value,
        });
        dataPost?.images?.path && setImgFiles(JSON.parse(dataPost?.images?.path));
    }, [dataPost]);

    const showToastErrorAndSetLoading = (message) => {
        showToastError(message);
        setIsLoading(false);
        document.getElementById('submitButton').disabled = false;
    };

    const showToastSuccessAndSetLoading = (message) => {
        showToastSuccess(message);
        setIsLoading(false);
        document.getElementById('submitButton').disabled = false;
    };

    const uploadImages = async () => {
        let formData = new FormData();
        let ImgUrls = [];

        for (const file of imgFiles) {
            if (typeof file === 'object') {
                formData.append('file', file);
                formData.append('upload_preset', process.env.REACT_APP_UPLOAD_NAME);
                const response = await toast.promise(apiUploadImage(formData), {
                    pending: 'Đang cập nhật ảnh',
                    error: 'Cập nhật ảnh thất bại',
                });
                if (response.status === 200) ImgUrls = [...ImgUrls, response.data.secure_url];
            } else {
                ImgUrls = [...ImgUrls, file];
            }
        }

        return ImgUrls;
    };

    const createPost = async (payload) => {
        const response = await apiCreatePost(payload);

        if (response.status === 200) {
            showToastSuccessAndSetLoading('Đăng bài thành công');
            navigate('/quan-ly/tin-dang');
        } else {
            showToastErrorAndSetLoading(response.data.response.msg);
        }
    };

    const UpdatePost = async (payload) => {
        payload = {
            ...payload,
            idPost: dataPost.id,
            userId: dataPost.userId,
        };
        const response = await apiUpdatePost(payload);

        if (response.status === 200) {
            showToastSuccessAndSetLoading('Cập nhật bài thành công');
            setIsSomePostUpdate(!isSomePostUpdate);
        } else {
            showToastErrorAndSetLoading(response.data.response.msg);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        document.getElementById('submitButton').disabled = true;
        if (+price > 0 && +acreage > 0);
        else {
            showToastErrorAndSetLoading('Giá hoặc diện tích không hợp lệ');
            return;
        }
        if (imgFiles.length === 0) {
            showToastErrorAndSetLoading('Vui lòng đăng ít nhất 1 ảnh về bài đăng của bạn');
            return;
        }
        let payload = {
            title,
            description,
            categoryCode: categorySelected.code,
            price,
            acreage,
            address: exactlyAddress,
            districtId: districtSelected.id,
        };
        if (Object.values(payload).includes('')) {
            showToastErrorAndSetLoading('Bạn chưa nhập đầy đủ');
            return;
        }
        // showToastError("Vui lòng đợi");
        const ImgUrls = await uploadImages();
        payload = { ...payload, ImgUrls };
        if (!isUpdate) {
            await createPost(payload);
            return;
        }
        await UpdatePost(payload);
    };

    return (
        <>
            <h3 className="border-bottom py-3 px-5">{isUpdate ? 'Cập nhật bài đăng' : 'Đăng tin mới'}</h3>
            <Container className="px-5">
                <Row className="py-3">
                    <Col md={8}>
                        <AddressForm
                            provinceSelected={provinceSelected}
                            setProvinceSelected={setProvinceSelected}
                            districtSelected={districtSelected}
                            setDistrictSelected={setDistrictSelected}
                            address={address}
                            setAddress={setAddress}
                            exactlyAddress={exactlyAddress}
                            setExactlyAddress={setExactlyAddress}
                        />
                        <Overview
                            title={title}
                            description={description}
                            acreage={acreage}
                            price={price}
                            categorySelected={categorySelected}
                            setCategorySelected={setCategorySelected}
                            setTitle={setTitle}
                            setDescription={setDescription}
                            setPrice={setPrice}
                            setAcreage={setAcreage}
                        />
                        <Picture imgFiles={imgFiles} setImgFiles={setImgFiles} isUpdate={isUpdate} />
                        <Button className="w-100 p-2 mt-3 bg-success fw-bold" id="submitButton" onClick={handleSubmit}>
                            {isLoading ? <Loading /> : <span>{isUpdate ? 'Cập nhật' : 'Đăng bài'}</span>}
                        </Button>
                    </Col>
                    <Col md={4}>map</Col>
                </Row>
            </Container>
        </>
    );
};

export default CreateNewPost;
