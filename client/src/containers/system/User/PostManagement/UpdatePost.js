import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import CreateNewPost from '../CreateNewPost/CreateNewPost';
import './PostManagement.scss';
import { apiGetOnePost } from '../../../../services/post';
import { useSelector } from 'react-redux';

const UpdatePost = ({ isShow, setIsShow, selectedPostId, isSomePostUpdate, setIsSomePostUpdate }) => {
    const { isDarkMode } = useSelector((state) => state.theme);

    const [selectedPost, setSelectedPost] = useState({});
    const handleClose = () => {
        setIsShow(false);
    };

    useEffect(() => {
        const fetchPostData = async () => {
            const response = await apiGetOnePost(selectedPostId);
            setSelectedPost(response.data.response);
        };
        fetchPostData();
    }, [selectedPostId]);

    return (
        <Modal
            show={isShow}
            dialogClassName="update-modal"
            contentClassName={isDarkMode ? 'dark-theme' : ''}
            onHide={handleClose}
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <CreateNewPost
                    isUpdate={true}
                    dataPost={selectedPost}
                    isSomePostUpdate={isSomePostUpdate}
                    setIsSomePostUpdate={setIsSomePostUpdate}
                    isPayment={selectedPost.status === 'payment' || selectedPost.status === 'expired'}
                    postId={selectedPost.id}
                />
            </Modal.Body>
        </Modal>
    );
};

export default UpdatePost;
