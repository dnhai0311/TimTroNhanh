import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ImageSlider from './ImageSlider';

const PostInfo = ({ detailPost }) => {
    return (
        <>
            <Container className="w-100 bg-white border rounded" style={{ height: '1200px' }}>
                <Row>
                    <ImageSlider images={detailPost?.images?.path} />
                </Row>
            </Container>
        </>
    );
};
export default PostInfo;
