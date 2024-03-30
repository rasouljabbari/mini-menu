import { memo } from 'react'

const Counter = ({ order, incrementQuantity, decrementQuantity }) => {
    const { quantity } = order

    return (
        <div className='w-20 h-[30px] px-2 py-1 flex items-center justify-between gap-x-1 bg-white'>
            <div
                className={`${quantity > 1 ? 'bg-primary-600 cursor-pointer' : 'bg-primary-200 cursor-no-drop'} flex-center w-5 h-5 rounded `}
                onClick={() => decrementQuantity(order.id)}
            >
                <i className='text-lg text-white icon-minus' />
            </div>
            <div className="w-5 flex-center">{quantity}</div>
            <div
                className="bg-primary-600 flex-center w-5 h-5 rounded cursor-pointer"
                onClick={() => incrementQuantity(order.id)}
            >
                <i className='text-lg text-white icon-add' />
            </div>
        </div>
    )
}

export default memo(Counter)
