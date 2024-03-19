import React from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import ImageSlider from './ImageSlider';
import moment from 'moment';
import 'moment/locale/vi';
import { useSelector } from 'react-redux';
import icons from '../../../utils/icons';
import { OpenLayerMap } from '../../../components/index';
const PostInfo = ({ detailPost }) => {
    const { FaStar } = icons;
    const { isDarkMode } = useSelector((state) => state.theme);
    return (
        <>
            <Container className={`w-100  border rounded ${isDarkMode ? '' : 'bg-white'}`}>
                <Row>
                    <ImageSlider images={detailPost?.images?.path} />
                </Row>
                <Row className="mt-4 pt-2">
                    <h3 className="text-danger">{detailPost?.title}</h3>
                    <div className="mb-1">
                        {Array(5)
                            .fill()
                            .map((_, index) => (
                                <FaStar
                                    key={index}
                                    color={index < detailPost?.star ? '#FFD24E' : ''}
                                    fontSize={'25px'}
                                />
                            ))}
                    </div>
                    <div className="mb-1">Chuyên mục: {detailPost?.category?.value}</div>
                    <div className="mb-1">Địa chỉ: {detailPost?.attribute?.address}</div>
                    <div className="d-flex">
                        <h5 className="w-25 fw-bold text-success">
                            {detailPost?.attribute?.price < 1
                                ? `${detailPost?.attribute?.price * 1000}.000 đồng/tháng`
                                : `${detailPost?.attribute?.price} triệu/tháng`}
                        </h5>
                        <div className="w-25">{detailPost?.attribute?.acreage} m²</div>
                        <div className="w-25">{moment(detailPost?.updatedAt).fromNow()}</div>
                        <div className="w-25">#{detailPost?.id}</div>
                    </div>
                    <div>
                        <h4>Thông tin mô tả</h4>
                        <div>
                            {detailPost?.description &&
                                detailPost?.description.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        <div>
                                            <span>&#8226;</span> {line}
                                        </div>
                                        <br />
                                    </React.Fragment>
                                ))}
                        </div>
                    </div>
                    <div>
                        <h4>Đặc điểm tin đăng</h4>
                        <Table striped responsive variant={isDarkMode ? 'dark' : ''}>
                            <tbody>
                                <tr>
                                    <td className="w-25">Mã tin</td>
                                    <td>#{detailPost?.id}</td>
                                </tr>
                                <tr>
                                    <td>Khu vực</td>
                                    <td>
                                        {detailPost?.attribute?.district?.value},{' '}
                                        {detailPost?.attribute?.district?.province?.value}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Loại</td>
                                    <td>{detailPost?.category?.value}</td>
                                </tr>
                                <tr>
                                    <td>Gói tin</td>
                                    <td>{detailPost?.postCategory?.value}</td>
                                </tr>
                                <tr>
                                    <td>Ngày đăng</td>
                                    <td>{moment(detailPost?.updatedAt).format('dddd, DD-MM-YYYY')}</td>
                                </tr>
                                <tr>
                                    <td>Ngày hết hạn</td>
                                    <td>{moment(detailPost?.expiredAt).format('dddd, DD-MM-YYYY')}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <h4>Thông tin liên hệ</h4>
                        <Table striped responsive variant={isDarkMode ? 'dark' : ''}>
                            <tbody>
                                <tr>
                                    <td className="w-25">Tên người đăng</td>
                                    <td>{detailPost?.user?.name}</td>
                                </tr>
                                <tr>
                                    <td>Số điện thoại</td>
                                    <td>{detailPost?.user?.phone}</td>
                                </tr>
                                <tr>
                                    <td>Facebook</td>
                                    <td>{detailPost?.user?.facebook}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Row>
                <OpenLayerMap address={detailPost?.attribute?.district?.value} />
            </Container>
        </>
    );
};

export default PostInfo;
