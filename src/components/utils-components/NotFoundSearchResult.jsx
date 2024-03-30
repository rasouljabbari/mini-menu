import React , {memo} from 'react';
import {Images} from "../../utils/Images.js";

function NotFoundSearchResult() {
    return (
        <div className='flex-center flex-col h-full py-16'>
            <div className="w-16 h-16 mb-4">
                <img
                    src={Images.search}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src=Images.logo;
                    }}
                    alt="Search Result"/>
            </div>
            <p className='text-center text-base text-gray-500'>نتیجه ای یافت نشد!</p>
        </div>
    );
}

export default memo(NotFoundSearchResult);