import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import ModalParent from './ModalParent';
import AddItemModalForCustomerModal from './AddItemModalForCustomerModal';
import ShowOrderInfoModal from './ShowOrderInfoModal';
import RemoveItemModal from './RemoveItemModal';
import PaidCostModal from './PaidCostModal';

function sumPrice(order) {
    let totalPrice = 0
    order?.products?.forEach(item => {
        totalPrice += item?.price * item?.pivot?.product_count
    });
    return totalPrice
}

const MemoOrdersTable = ({ orders, refetch, setOrders }) => {

    const [showEdit, setShowEdit] = useState(null)
    const [showCostEdit, setShowCostEdit] = useState(null)
    const [showInfo, setShowInfo] = useState(null)
    const [showRemove, setShowRemove] = useState(null)

    return (
        <>
            <table className='w-full'>
                <thead className='bg-jungle-800'>
                    <tr>
                        <th className='text-start text-white p-2'>نام</th>
                        <th className='text-end text-white p-2 whitespace-nowrap' dir='ltr'>مبلغ کل</th>
                        <th className='text-end text-white p-2 whitespace-nowrap' dir='ltr'>پرداختی</th>
                        <th className='text-center text-white p-2'>جزئیات</th>
                    </tr>
                </thead>
                <tbody className='bg-primary-100'>
                    {
                        orders?.map(order => (
                            <tr key={order?.id}>
                                <td className='text-start p-2 whitespace-nowrap'>{order?.full_name}</td>
                                <td className='text-start p-2'>{sumPrice(order)?.toLocaleString()}</td>
                                <td className='text-start p-2'>{order?.paid_cost?.toLocaleString()}</td>
                                <td className='flex items-center flex-wrap justify-center gap-1 py-2 px-1'>
                                    <button className='bg-blue-300 p-1' onClick={() => setShowInfo(order)}>جزئیات</button>
                                    {
                                        order?.status === "paid" ? <button className='bg-rose-100 text-rose-700 p-1' onClick={() => setShowRemove(order)}>حذف</button> :
                                            <>
                                                <button className='bg-blue-100 p-1' onClick={() => setShowEdit(order)}>ویرایش</button>
                                                <button className='bg-sky-200 p-1' onClick={() => setShowCostEdit(order)}>تسویه</button>
                                            </>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {showEdit && (
                <ModalParent removeCloseIcon size="md" setShowModal={setShowEdit}>
                    <AddItemModalForCustomerModal order={showEdit} setOrders={setOrders} setShowModal={setShowEdit} />
                </ModalParent>
            )}

            {showCostEdit && (
                <ModalParent removeCloseIcon size="md" setShowModal={setShowCostEdit}>
                    <PaidCostModal refetch={refetch} order={showCostEdit} setShowModal={setShowCostEdit} />
                </ModalParent>
            )}


            {showInfo && (
                <ModalParent removeCloseIcon size="md" setShowModal={setShowInfo}>
                    <ShowOrderInfoModal order={showInfo} setShowModal={setShowInfo} />
                </ModalParent>
            )}

            {showRemove && (
                <ModalParent removeCloseIcon size="md" setShowModal={setShowRemove}>
                    <RemoveItemModal order={showRemove} setOrders={setOrders} setShowModal={setShowRemove} />
                </ModalParent>
            )}
        </>
    );
};

MemoOrdersTable.propTypes = {
    orders: PropTypes.array.isRequired,
    setOrders: PropTypes.func.isRequired,
    refetch: PropTypes.func,
};

const OrdersTable = memo(MemoOrdersTable);

export default OrdersTable;