import React , {memo} from 'react';

function NotFound() {
    return (
        <div className='h-120 flex-center flex-col'>
            <h1 className='text-center text-7xl text-fire-700'>404</h1>
            <p className='text-center text-3xl text-primary-600'>صفحه مورد نظر وجود ندارد</p>
        </div>
    );
}

export default memo(NotFound);