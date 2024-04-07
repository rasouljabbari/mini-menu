import React, { memo } from 'react';

const InputError = ({ errorItem }) => {
    return(
        <ul className='space-y-1 pt-4 list-disc'>
            {Object.keys(errorItem).map((keyName, i) => (
                <li key={i}>
                    <span className="text-rose-600 text-base">{errorItem[keyName] || errorItem[keyName][0]}</span>
                </li>
            ))}
        </ul>
    )
};

export default memo(InputError);