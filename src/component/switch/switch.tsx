import React from 'react';
import './switch.css';

type PropsType = {
    onChange: (isChecked: boolean) => void;
    defaultChecked: boolean;
};

const Switch: React.FC<PropsType> = ({ onChange, defaultChecked }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <label className="switch">
            <input type="checkbox" onChange={handleChange} checked={defaultChecked} />
            <span className="slider"></span>
        </label>
    );
};

export default Switch;
