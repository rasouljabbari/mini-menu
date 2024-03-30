import React, {memo} from 'react';
import {useNavigate} from "react-router-dom";

function UserSearchWithOutValue({categoryList,category,isBorder,setShowBg,isMobile = true}) {

    const navigate = useNavigate()

    const changeLinkHandler = (url) => {
        if(isMobile){
            setShowBg(false)
        }
        navigate(url)
    }

    return (
        <div className='cursor-pointer' onClick={() => changeLinkHandler(`/${categoryList?.title === 'رستوران' ? 'restaurant-menu' :'cafe-menu'}/${category?.id}`)}>
            <div className={`${isBorder ? 'py-2 mx-2' : ''} flex flex-row items-center justify-between gap-x-5`}>
                <div className="flex flex-row items-center gap-x-5">
                    <i className={`${category?.logo} w-10 font-bold text-3xl text-primary-650`}/>
                    <h2 className="text-xl text-black whitespace-nowrap " >{category?.title}</h2>
                </div>
                <i className="text-2xl text-black icon-arrow-left1 "></i>
            </div>
        </div>
    );
}

export default memo(UserSearchWithOutValue);