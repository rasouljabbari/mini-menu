import React, { memo } from 'react';

function TextInputWithLabel({ label, placeholder, name, value, handler, maxLength, isReadOnly = false }) {
    const changeHandler = (e) => {
        const inputValue = e.target.value
        if (maxLength) {
            if (inputValue?.length <= maxLength) {
                handler(inputValue)
            }
        } else {
            handler(inputValue)
        }
    }
    return (
        <div className="w-full flex flex-col gap-y-1.5">
            <label
                htmlFor="tableCount"
                className='text-gray-700 text-lg font-medium'
            >{label}</label>

            <div className="w-full rounded-lg relative border border-gray-300">
                <input
                    readOnly={isReadOnly}
                    className='w-full border-0 outline-0 shadow-new-button placeholder:text-gray-400 placeholder:text-xs py-2 px-3 rounded-lg text-sm'
                    placeholder={placeholder}
                    type="text"
                    name={name}
                    id={name}
                    value={value}
                    onChange={changeHandler}
                />
            </div>
        </div>
    );
}

export default memo(TextInputWithLabel);