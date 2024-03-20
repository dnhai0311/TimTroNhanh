import React, { memo } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import debounce from 'lodash.debounce';
const InputPost = ({ isDisable, isTextArea, name, value, setValue, isAfter, text, width }) => {
    const updateValue = (e) => {
        if (name === 'Địa chỉ chính xác') setValue(e?.target?.value + ',');
        else setValue(e?.target?.value);
    };
    const debouncedValue = debounce(updateValue, 200);

    return (
        <Form.Group className={`${width ? width : 'w-100'} pe-3 mt-3  fw-bold w-100 w-sm-50`}>
            <Form.Label>{name}</Form.Label>
            {!isDisable ? (
                <>
                    <InputGroup>
                        <Form.Control
                            className="rounded-0 shadow text-right"
                            onChange={debouncedValue}
                            required
                            as={isTextArea ? 'textarea' : 'input'}
                            rows={8}
                            defaultValue={value}
                        />
                        {isAfter && <InputGroup.Text id="basic-addon1">{text}</InputGroup.Text>}
                    </InputGroup>
                </>
            ) : (
                <Form.Control className="rounded-0 shadow" disabled value={value} />
            )}
        </Form.Group>
    );
};

export default memo(InputPost);
