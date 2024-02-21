import React, { memo, useRef } from 'react';
import debounce from 'lodash.debounce';

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
    const latestValue = useRef(value);

    const updateValue = (e) => {
        setValue((prev) => ({
            ...prev,
            [typeValue]: e.target.value,
        }));
        latestValue.current = e.target.value;
    };

    const debouncedValue = debounce(() => {
        setValue((prev) => ({
            ...prev,
            [typeValue]: latestValue.current,
        }));
    }, 200);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            debouncedValue.flush();
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
                    onChange={updateValue}
                    onKeyDown={handleKeyPress}
                    onFocus={() => setInvalidFields([])}
                    autoFocus={autoFocus}
                    autoComplete={autoComplete}
                    name={typeValue}
                    value={value[typeValue]}
                />
            </label>

            {invalidFields.length > 0 && invalidFields.some((i) => i.name === typeValue) && (
                <small className="text-danger">{invalidFields.find((i) => i.name === typeValue)?.message}</small>
            )}
        </div>
    );
};

export default memo(InputForm);
