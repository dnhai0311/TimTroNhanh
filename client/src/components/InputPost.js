import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
const InputPost = ({
  isDisable,
  isTextArea,
  name,
  value,
  setValue,
  isAfter,
  text,
  width,
}) => {
  // co su dung debounce o day

  return (
    <Form.Group
      className={`${width ? width : "w-100"} pe-3 mt-3  fw-bold w-50`}
    >
      <Form.Label>{name}</Form.Label>
      {!isDisable ? (
        <>
          <InputGroup>
            <Form.Control
              className="rounded-0 shadow text-right"
              onChange={(e) => {
                if (name === "Địa chỉ chính xác")
                  setValue(e.target.value + ",");
                else setValue(e.target.value);
                // console.log(e.target.value);
              }}
              required
              as={isTextArea ? "textarea" : "input"}
              rows={8}
            />
            {isAfter && (
              <InputGroup.Text id="basic-addon1">{text}</InputGroup.Text>
            )}
          </InputGroup>
        </>
      ) : (
        <Form.Control className="rounded-0 shadow" disabled value={value} />
      )}
    </Form.Group>
  );
};

export default InputPost;
