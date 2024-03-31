import React, { memo } from 'react';
import { NumericFormat } from 'react-number-format';

function NumberInputWithLabel({ label, placeholder, name, value, handler, max, hasPrice = false, isReadOnly = false }) {
    const changeHandler = (e) => {
        const inputValue = hasPrice ? e.target.value?.replaceAll(',', '') : e.target.value

        if (max) {
            if (inputValue <= max) {
                handler(inputValue)
            }
        } else {
            handler(inputValue)
        }

    }
    return (
        <div className="flex flex-col gap-y-1.5">
            <label
                htmlFor="tableCount"
                className='text-gray-700 text-sm font-medium'
            >{label}</label>
            <div className="w-full rounded-lg relative border border-gray-300">
                {
                    hasPrice ?
                        <NumericFormat
                            readOnly={isReadOnly}
                            className={`${hasPrice ? 'pr-3 pl-14' : 'px-3'} w-full border-0 outline-0 shadow-new-button placeholder:text-gray-400 placeholder:text-xs py-2 rounded-lg text-sm`}
                            placeholder={placeholder}
                            name={name}
                            id={name}
                            value={value}
                            onChange={changeHandler}
                            thousandSeparator="," /> :
                        <input
                            readOnly={isReadOnly}
                            className={`${hasPrice ? 'pr-3 pl-14' : 'px-3'} w-full border-0 outline-0 shadow-new-button placeholder:text-gray-400 placeholder:text-xs py-2 rounded-lg text-sm`}
                            placeholder={placeholder}
                            type="number"
                            name={name}
                            id={name}
                            value={value}
                            onChange={changeHandler}
                        />
                }
                {
                    hasPrice &&
                    <span className='absolute left-3 top-1/2 -translate-y-1/2 text-base text-gray-600'>ریال</span>
                }
            </div>
        </div>
    );
}

export default memo(NumberInputWithLabel);