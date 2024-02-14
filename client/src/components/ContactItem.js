import React, { memo } from 'react';
import { Col } from 'react-bootstrap';

const ContactItem = ({ type, name, phone }) => {
    return (
        <Col sm={4} className="pb-3">
            <div className="pt-2 contact-item">
                <h6 className="text-danger">{type}</h6>
                <h5 className="text-success">{name}</h5>
                <h5>{phone}</h5>
            </div>
        </Col>
    );
};

export default memo(ContactItem);
