import React, { memo, useState } from 'react';
import { remove_item_of_arr_with_id } from '../../../utils/GeneralFunctions.js';
import { useMutation } from '@tanstack/react-query';
import { destroyOrderApi } from '../../../api/ordersApi.js';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '../../../utils/errorHandling.js';
import InputError from '../../utils-components/input/InputError.jsx';

function RemoveItemModal({ setShowModal, order, setOrders }) {

    const [errorInfo, setErrorInfo] = useState(null)

    const mutation = useMutation({
        mutationFn: destroyOrderApi,
        onSuccess: async (data) => {
            console.log("data : ", data);
            toast.success(`سفارش ${order?.full_name} با موفقیت حذف شد.`)
            setOrders(prev => remove_item_of_arr_with_id(prev, order?.id))
            setShowModal(null)
        },
        onError: (error) => {
            
            const errorResponse = apiErrorHandler(error);
            console.log(error, errorResponse);
            if (errorResponse?.status === 422) {
                setErrorInfo(errorResponse?.error);
            }
        },
    })

    const removeHandler = () => {
        mutation.mutate(order?.id)
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
            {
                errorInfo &&
                <InputError errorItem={errorInfo} />
            }
            <div className="flex gap-x-3 flex-row mt-8">
                <button onClick={() => setShowModal(null)} className="border border-gray-300 rounded-lg h-10 px-3 w-full flex justify-center items-center text-gray-700 hover:bg-primary-100 hover:border-primary-100">خیر</button>
                <button onClick={removeHandler} className="border border-gray-300 rounded-lg h-10 px-3 w-full flex justify-center items-center text-white bg-primary-500 hover:bg-primary-700 hover:border-primary-700">بله</button>
            </div>
        </div>
    );
}

export default memo(RemoveItemModal);