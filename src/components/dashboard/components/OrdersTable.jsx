import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import ModalParent from './ModalParent';
import AddItemModalForCustomerModal from './AddItemModalForCustomerModal';
import ShowOrderInfoModal from './ShowOrderInfoModal';
import RemoveItemModal from './RemoveItemModal';

function sumPrice(order) {
    let totalPrice = 0
    order?.items?.forEach(item => {
        totalPrice += item?.price * item?.quantity
    });
    return totalPrice
}

const MemoOrdersTable = ({ orders, setOrders }) => {

    const [showEdit, setShowEdit] = useState(null)
    const [showInfo, setShowInfo] = useState(null)
    const [showRemove, setShowRemove] = useState(null)

    return (
        <>
            <table className='w-full'>
                <thead className='bg-jungle-800'>
                    <tr>
                        <th className='text-start text-white p-2'>نام مشتری</th>
                        <th className='text-end text-white p-2 whitespace-nowrap' dir='ltr'>(﷼) مبلغ کل</th>
                        <th className='text-center text-white p-2'>جزئیات</th>
                    </tr>
                </thead>
                <tbody className='bg-primary-100'>
                    {
                        orders?.map(order => (
                            <tr key={order?.id}>
                                <td className='text-start p-2 whitespace-nowrap'>{order?.full_name}</td>
                                <td className='text-start p-2'>{sumPrice(order)?.toLocaleString()}</td>
                                <td className='flex items-center flex-wrap justify-center gap-1 py-2 px-1'>
                                    <button className='bg-blue-200 p-1' onClick={() => setShowInfo(order)}>جزئیات</button>
                                    <button className='bg-blue-100 p-1' onClick={() => setShowEdit(order)}>ویرایش</button>
                                    <button className='bg-rose-100 text-rose-700 p-1' onClick={() => setShowRemove(order)}>حذف</button>
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

            {showInfo && (
                <ModalParent removeCloseIcon size="md" setShowModal={setShowInfo}>
                    <ShowOrderInfoModal order={showInfo} setShowModal={setShowInfo} />
                </ModalParent>
            )}

            {showRemove && (
                <ModalParent removeCloseIcon size="md" setShowModal={setShowRemove}>
                    <RemoveItemModal order={showRemove} orders={orders} setOrders={setOrders} setShowModal={setShowRemove} />
                </ModalParent>
            )}
        </>
    );
};

MemoOrdersTable.propTypes = {
    orders: PropTypes.array.isRequired,
    setOrders: PropTypes.func.isRequired,
};

const OrdersTable = memo(MemoOrdersTable);

export default OrdersTable;