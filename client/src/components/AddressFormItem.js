import React, { memo, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

const AddressFormItem = ({ name, values, setValue, value }) => {
  const [selectedOption, setSelectedOption] = useState(
    value ? JSON.stringify(value) : ""
  );
  const [isSettingValue, setIsSettingValue] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (!isSettingValue && selectedOption) {
      setValue(JSON.parse(selectedOption));
    }
  }, [selectedOption, setValue, isSettingValue]);

  useEffect(() => {
    setSelectedOption(value ? JSON.stringify(value) : "");
    setIsSettingValue(false);
  }, [value]);

  return (
    <>
      <Form.Group className="w-100 w-md-50 pe-3 fw-bold">
        <Form.Label>{name}</Form.Label>
        <Form.Control
          as="select"
          className="rounded-0 shadow"
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option className="d-none" value="" key="0">
            Chọn {name}
          </option>
          {values &&
            values.map((item) => (
              <option
                key={item?.id}
                value={JSON.stringify({
                  id: item.id,
                  code: item.code,
                  value: item.value,
                })}
              >
                {item.value}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
    </>
  );
};

export default memo(AddressFormItem);
