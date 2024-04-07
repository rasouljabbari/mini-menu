import React, { memo } from 'react';
import { remove_item_of_arr_with_id } from '../../../utils/GeneralFunctions.js';
import { useMutation } from '@tanstack/react-query';
import { destroyOrderApi } from '../../../api/ordersApi.js';

function RemoveItemModal({ setShowModal, order, orders, setOrders }) {

    const mutation = useMutation({
        mutationFn: destroyOrderApi,
        onSuccess: async ({ data }) => {
            console.log(data);
            localStorage.setItem("Token", data?.response?.token)
            localStorage.setItem("user", data?.response?.user)
            window.location.href = "/"
        },
    })

    const removeHandler = () => {
        mutation.mutate(order?.id)
        // setOrders(removedList)
        // setShowModal(null)
    }
    return (
        <div>
            {
                <div className='flex flex-col items-start justify-start gap-3'>
                    <p className="text-gray-900 text-lg font-semibold">حذف سفارش</p>
                    <span
                        className="text-base font-medium text-gray-700 text-center">آیا از حذف سفارش {order?.full_name} مطمئن هستید؟</span>
                </div>
            }
            <div className="flex gap-x-3 flex-row mt-8">
                <button onClick={() => setShowModal(null)} className="border border-gray-300 rounded-lg h-10 px-3 w-full flex justify-center items-center text-gray-700 hover:bg-primary-100 hover:border-primary-100">خیر</button>
                <button onClick={removeHandler} className="border border-gray-300 rounded-lg h-10 px-3 w-full flex justify-center items-center text-white bg-primary-500 hover:bg-primary-700 hover:border-primary-700">بله</button>
            </div>
        </div>
    );
}

export default memo(RemoveItemModal);