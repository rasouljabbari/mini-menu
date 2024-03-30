import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart,addToCart } from '../../redux/features/orderSlice'

export default function ProductCountCounter({count,product,setShowInfoModal,setShowModal}) {

    const dispatch = useDispatch()

    const incrementHandler = () => {
        if(product?.addons?.length > 0){
            setShowInfoModal(false)
            setShowModal(true)
        }else{
            dispatch(addToCart(product))
        }
    }

    const decrementHandler = () => {
        dispatch(removeFromCart(product))
    }

    return (
        <div className='flex items-center justify-around gap-x-1'>
            <div
                className={`${count > 0 ? 'bg-primary-600 cursor-pointer' : 'bg-primary-200 cursor-no-drop'} flex-center w-5 h-5 rounded `}
                onClick={decrementHandler}
            >
                <i className='text-lg text-white icon-minus'/>
            </div>
            <div className="w-5 flex-center">{count}</div>
            <div
                className="bg-primary-600 flex-center w-5 h-5 rounded cursor-pointer"
                onClick={incrementHandler}
            >
                <i className='text-lg text-white icon-add'/>
            </div>
        </div>
    )
}
