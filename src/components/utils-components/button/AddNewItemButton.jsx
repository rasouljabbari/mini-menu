import React, { memo } from 'react';

function AddNewItemButton({ isGreen, label, handler }) {
    return (
        <button
            type="button"
            onClick={handler}
            className={`${isGreen ? 'bg-jungle-500 hover:bg-jungle-700 border-jungle-600 text-white' : 'bg-white text-gray-700 hover:bg-green-50 border-gray-300'} md:w-fit justify-center border flex items-center gap-x-2.5 shadow-new-button py-2 px-4 rounded-lg`}
        >
            <span className='text-sm font-semibold'>{label}</span>
        </button>
    );
}

export default memo(AddNewItemButton);