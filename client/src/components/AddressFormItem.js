import React from "react";
import Form from "react-bootstrap/Form";

const AddressFormItem = ({ name, values, setId }) => {
  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setId(JSON.parse(selectedOption));
    // console.log(name + ": " + selectedOption);
  };

  return (
    <>
      <Form.Group className="w-100 w-md-50 pe-3 fw-bold">
        <Form.Label>{name}</Form.Label>
        <Form.Control
          as="select"
          className="rounded-0 shadow"
          onChange={handleSelectChange}
        >
          <option className="d-none" value="" key="0">
            Chọn {name}
          </option>
          {values &&
            values.map((item) => (
              <option key={item?.id} value={JSON.stringify(item)}>
                {item.value}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
    </>
  );
};

export default AddressFormItem;
