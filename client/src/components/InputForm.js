import React, { memo } from 'react';

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
    minLength,
    pattern,
    onSubmit,
    autoFocus,
    autoComplete,
}) => {
    const handleChange = (e) => {
        setValue((prev) => ({
            ...prev,
            [typeValue]: e.target.value,
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit(e);
        }
    };

    return (
        <div>
            <label className="w-100">
                {label}
                <input
                    required
                    maxLength={maxLength}
                    minLength={minLength}
                    type={type}
                    pattern={pattern}
                    placeholder={placeHolder}
                    className="form-control"
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    onFocus={() => setInvalidFields([])}
                    autoFocus={autoFocus}
                    autoComplete={autoComplete}
                    name={typeValue}
                />
            </label>

            {invalidFields.length > 0 && invalidFields.some((i) => i.name === typeValue) && (
                <small className="text-danger">{invalidFields.find((i) => i.name === typeValue)?.message}</small>
            )}
        </div>
    );
};

export default memo(InputForm);
