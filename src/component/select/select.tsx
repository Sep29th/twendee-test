import React, { useState, useRef, useEffect } from 'react';
import { Theme } from '../../constant/theme.enum';
import { useAppSelector } from '../../hook/redux.hook';

type Option = {
    value: string;
    label: string;
};

type SelectProps = {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
};

const Select: React.FC<SelectProps> = ({ options, value, onChange, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const theme = useAppSelector((state) => state.theme);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative inline-block text-left ${className}`} ref={selectRef}>
            <button
                type="button"
                onClick={handleToggle}
                className={`inline-flex w-full justify-between items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ${theme == Theme.LIGHT ? 'ring-gray-300 hover:bg-gray-50 text-gray-900 bg-white' : 'ring-gray-600 text-gray-300 hover:bg-gray-900 bg-gray-700'}`}
                id="menu-button"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {options.find((option) => option.value === value)?.label || 'Select an option'}
                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    className={`absolute right-0 z-10 mt-2 origin-top-right rounded-md shadow-lg ring-1 ring-opacity-5 focus:outline-none ${theme == Theme.LIGHT ? 'ring-black bg-white' : 'ring-gray-300 bg-gray-600'}`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                >
                    <div className="py-1">
                        {options.map((option) => (
                            <a
                                key={option.value}
                                onClick={() => handleOptionClick(option.value)}
                                className={`block px-4 py-2 text-sm text-right ${theme == Theme.LIGHT ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-200 hover:bg-gray-500'}`}
                                role="menuitem"
                            >
                                {option.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Select;
