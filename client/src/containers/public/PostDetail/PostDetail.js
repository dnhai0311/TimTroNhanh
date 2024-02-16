import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { apiGetOnePost } from '../../../services/post';
import { useParams } from 'react-router-dom';
import ShowUser from './ShowUser';
import PostInfo from './PostInfo';

const DetailPost = () => {
    const { postId } = useParams();
    const [detailPost, setDetailPost] = useState({});

    useEffect(() => {
        const fetchDetailPost = async (postId) => {
            const response = await apiGetOnePost(postId);
            setDetailPost(response.data.response);
        };
        postId && fetchDetailPost(postId);
    }, [postId]);

    return (
        <>
            <Container className="my-3" fluid>
                <Row>
                    <Col lg={8}>
                        <PostInfo detailPost={detailPost} />
                    </Col>
                    <Col lg={4}>
                        <Container className="bg-success d-flex flex-column justify-content-center align-items-center border rounded">
                            <ShowUser detailPost={detailPost} />
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default DetailPost;
