import React, { memo, useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import addImg from '../../../../assets/addImg.png';
import icons from '../../../../utils/icons';

const Picture = ({ imgFiles, setImgFiles, isUpdate }) => {
    const { FaRegTrashAlt } = icons;

    const [selectedImages, setSelectedImages] = useState([]);
    const [hasEffectRun, setHasEffectRun] = useState(false);

    useEffect(() => {
        if (isUpdate && imgFiles && imgFiles.length > 0 && !hasEffectRun) {
            setSelectedImages(imgFiles);
            setHasEffectRun(true);
        }
    }, [isUpdate, imgFiles, hasEffectRun]);

    const fileInputRef = useRef(null);
    const handleAddPicture = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const maxImages = 12;
        const selectedFiles = e.target.files;

        if (selectedFiles.length + selectedImages.length > maxImages) {
            alert(`Chỉ được tải lên tối đa ${maxImages} ảnh.`);
            return;
        }
        setImgFiles((prevImgFiles) => [...prevImgFiles, ...selectedFiles]);

        const newImages = [...selectedImages];
        for (let i = 0; i < selectedFiles.length; i++) {
            const imageUrl = URL.createObjectURL(selectedFiles[i]);
            newImages.push(imageUrl);
        }
        setSelectedImages([...newImages]);
    };
    const handleRemoveImage = (index) => {
        const newImages = [...selectedImages];
        const newImgFlies = [...imgFiles];
        const removedImage = newImages.splice(index, 1)[0];
        newImgFlies.splice(index, 1);
        URL.revokeObjectURL(removedImage);
        setSelectedImages(newImages);
        setImgFiles(newImgFlies);
    };

    return (
        <>
            <div className="mt-5">
                <h4>Hình ảnh</h4>
                <div className="mb-2">Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</div>
                <Container>
                    <Row
                        className="border rounded flex-column justify-content-center align-items-center shadow"
                        style={{ minHeight: '200px', cursor: 'pointer' }}
                        onClick={handleAddPicture}
                    >
                        <img src={addImg} alt="addImg" className="mb-1" style={{ width: '120px' }} />
                        <div className="text-center">Thêm ảnh</div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            multiple
                        />
                    </Row>
                    {selectedImages.length > 0 && (
                        <Row className="d-flex flex-wrap">
                            {selectedImages.map((imageUrl, index) => (
                                <Col sm={3} key={index}>
                                    <div className="position-relative border shadow mt-3">
                                        <img
                                            key={index}
                                            src={imageUrl}
                                            alt={`SelectedImg${index}`}
                                            style={{ width: '100%', height: '120px' }}
                                            className="p-0 m-0"
                                        />
                                        <div
                                            className="position-absolute bottom-0 bg-light w-100 d-flex align-items-center justify-content-center"
                                            onClick={() => handleRemoveImage(index)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <FaRegTrashAlt />
                                            <span className="ms-1">Xoá</span>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Container>
            </div>
        </>
    );
};

export default memo(Picture);
