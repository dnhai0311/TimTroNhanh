import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { apiGetOnePost } from '../../../services/post';
import { useParams } from 'react-router-dom';
import ShowUser from './ShowUser';
import PostInfo from './PostInfo';
import ListComment from './ListComment';
import icons from '../../../utils/icons';
import { apiLikePost, apiDidUserLikePost } from '../../../services/post';
import { useSelector } from 'react-redux';
import { showToastSuccess } from '../../../utils/commons/ToastUtil';

const DetailPost = () => {
    const { userData } = useSelector((state) => state.user);
    const { FaHeart } = icons;
    const { postId } = useParams();
    const [detailPost, setDetailPost] = useState({});
    const [isRed, setIsRed] = useState(false);

    useEffect(() => {
        const fetchDetailPost = async (postId) => {
            const response = await apiGetOnePost(postId);
            setDetailPost(response.data.response);
        };
        postId && fetchDetailPost(postId);
    }, [postId]);

    useEffect(() => {
        const didUserLikePost = async () => {
            const response = await apiDidUserLikePost(postId);
            if (response.status === 200) {
                setIsRed(response.data.isLiked);
            }
        };
        userData?.id && postId && didUserLikePost();
    }, [userData?.id, postId]);

    const handleLikePost = async () => {
        const response = await apiLikePost(postId);
        if (response.status === 200) {
            showToastSuccess(response.data.msg);
            setIsRed(!isRed);
        }
    };

    return (
        <>
            <Container className="my-3" fluid>
                <Row>
                    <Col lg={8}>
                        <PostInfo detailPost={detailPost} />
                    </Col>
                    <Col lg={4}>
                        <Container className="bg-success d-flex flex-column justify-content-center align-items-center border rounded position-relative">
                            <ShowUser detailPost={detailPost} />
                            <div
                                className="position-fixed bottom-0 mb-4  bg-light p-3 border rounded-circle"
                                onClick={handleLikePost}
                            >
                                <FaHeart fontSize={'20px'} className={isRed ? 'text-danger' : 'text-dark'} />
                            </div>
                        </Container>
                        <ListComment userId={userData?.id} postId={postId} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default DetailPost;
