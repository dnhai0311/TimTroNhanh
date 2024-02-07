import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import CreateNewPost from "../CreateNewPost/CreateNewPost";
import "./PostManagement.scss";
import { apiGetOnePost } from "../../../../services/post";

const UpdatePost = ({ isShow, setIsShow, selectedPostId }) => {
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
    <Modal show={isShow} dialogClassName="update-modal" onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <CreateNewPost isUpdate={true} dataPost={selectedPost} />
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePost;
