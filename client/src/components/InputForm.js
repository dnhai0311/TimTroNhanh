import React, { memo } from "react";

const InputForm = ({
  label,
  type,
  placeHolder,
  value,
  setValue,
  typeValue,
  invalidFields,
  setInvalidFields,
  maxLength,
  minlength,
  pattern,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        required
        maxLength={maxLength}
        minLength={minlength}
        type={type}
        pattern={pattern}
        placeholder={placeHolder}
        className="form-control"
        value={value}
        onChange={(e) => {
          setValue((prev) => ({
            ...prev,
            [typeValue]: e.target.value,
          }));
        }}
        onFocus={() => setInvalidFields([])}
      ></input>
      {invalidFields.length > 0 &&
        invalidFields.some((i) => i.name === typeValue) && (
          <small className="text-danger">
            {invalidFields.find((i) => i.name === typeValue)?.message}
          </small>
        )}
    </div>
  );
};

export default memo(InputForm);
