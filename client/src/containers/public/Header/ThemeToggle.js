import React from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../../store/actions/theme';

const ThemeToggle = ({ className }) => {
    const dispatch = useDispatch();
    const { isDarkMode } = useSelector((state) => state.theme);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <div>
            <Form.Check
                type="switch"
                id="custom-switch"
                label={'☾'}
                checked={isDarkMode}
                onChange={handleToggle}
                className={className}
            />
        </div>
    );
};

export default ThemeToggle;
