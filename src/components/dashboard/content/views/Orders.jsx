import { memo, useEffect, useState } from "react";
import AddNewItemButton from "../../../utils-components/button/AddNewItemButton";
import ModalParent from "../../components/ModalParent";
import AddItemModalForCustomerModal from "../../components/AddItemModalForCustomerModal";
import OrdersTable from "../../components/OrdersTable";
import { useQuery } from "@tanstack/react-query";
import { ordersListApi } from "../../../../api/ordersApi";


const MemoOrders = () => {
  const [showModal, setShowModal] = useState(false);
  // const [status, setStatus] = useState('not_paid');

  const [orders, setOrders] = useState([])

  // const { data, isLoading } = useQuery({
  //   queryKey: ["orders", status],
  //   queryFn: () => ordersListApi(status),
  // });

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => ordersListApi(),
  });

  useEffect(() => {
    setOrders(data?.orders);
  }, [data]);

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
        <div className="pb-20 flex flex-col gap-4">
          {/* <div className="p-1 bg-primary-100 flex gap-1 w-fit">
            <button className={`${status === "not_paid" ? "bg-primary-600 text-white" : ""} p-2 rounded`} onClick={() => setStatus("not_paid")}>پرداخت نشده</button>
            <button className={`${status === "paid" ? "bg-primary-600 text-white" : ""} p-2 rounded`} onClick={() => setStatus("paid")}>پرداخت شده</button>
          </div> */}
          {
            isLoading ? <h5 className="text-primary-600 bg-primary-100 p-1 rounded-md text-center text-3xl py-8 col-span-2 sm:col-span-4">در حال بارگذاری...</h5> :
              orders?.length > 0 ?
                <OrdersTable orders={orders} setOrders={setOrders} /> :
                <h5 className="text-primary-600 bg-primary-100 p-1 rounded-md text-center text-3xl py-8 col-span-2 sm:col-span-4">سفارشی ثبت نشده است.</h5>
          }

        </div>
      </div>

      {showModal && (
        <ModalParent removeCloseIcon size="md" setShowModal={setShowModal}>
          <AddItemModalForCustomerModal
            setOrders={setOrders}
            setShowModal={setShowModal} />
        </ModalParent>
      )}
    </>
  );
};

const Orders = memo(MemoOrders);

export default Orders;
