import React from 'react';
import { Modal } from 'react-bootstrap';
import DetailPost from '../../../public/PostDetail/PostDetail';
const ShowDetailPost = ({ postId, setIsShowDetail }) => {
    const handleClose = () => {
        setIsShowDetail(false);
    };
    return (
        <Modal show={true} dialogClassName="update-modal" onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <DetailPost id={postId} isAdmin={true} />
            </Modal.Body>
        </Modal>
    );
};

export default ShowDetailPost;
