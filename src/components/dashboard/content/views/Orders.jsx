import { memo, useEffect, useState } from "react";
import AddNewItemButton from "../../../utils-components/button/AddNewItemButton";
import ModalParent from "../../components/ModalParent";
import AddItemModalForCustomerModal from "../../components/AddItemModalForCustomerModal";
import OrdersTable from "../../components/OrdersTable";


const MemoOrders = () => {
  const [showModal, setShowModal] = useState(false);

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, [localStorage.getItem('orders')]);

  return (
    <>
      <div className="py-14 flex flex-col gap-20">
        <div className="flex items-center justify-between gap-6">
          <h1 className="text-2xl text-primary-700">مدیریت سفارشات</h1>
          <AddNewItemButton
            isGreen
            label={"ثبت سفارش جدید"}
            handler={() => setShowModal(true)}
          />
        </div>
        <div className="pb-20">
          {
            orders?.length > 0 ?
              <OrdersTable orders={orders} setOrders={setOrders} /> :
              <h5 className="text-primary-600 bg-primary-100 p-1 rounded-md text-center text-3xl py-8 col-span-2 sm:col-span-4">سفارشی ثبت نشده است.</h5>
          }

        </div>
      </div>

      {showModal && (
        <ModalParent removeCloseIcon size="md" setShowModal={setShowModal}>
          <AddItemModalForCustomerModal setShowModal={setShowModal} />
        </ModalParent>
      )}
    </>
  );
};

const Orders = memo(MemoOrders);

export default Orders;
