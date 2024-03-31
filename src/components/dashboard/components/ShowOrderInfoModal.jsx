import { memo } from "react";
import PropTypes from "prop-types";


function Cart({ cart }) {
  return (
    <div className="flex flex-col gap-2">
      <h2>موارد انتخاب شده :‌</h2>
      <ul className="flex flex-col gap-2 bg-primary-100 p-3 rounded">
        {cart.items.map((item) => (
          <li key={item.id} className="grid grid-cols-2">
            <div className="flex items-center gap-1">
              <b>{item.quantity}</b>

              عدد

              <b>{item.title}</b>
            </div>
            <div className="flex items-center justify-end gap-4">
              مبلغ: {(item?.price * item?.quantity).toLocaleString()}

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const MemoShowOrderInfoModal = ({ order, setShowModal }) => {

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-gray-900 text-lg font-semibold mb-1">
        سفارش {order?.full_name}
      </h2>
      <hr />
      <div className="flex flex-col gap-4">

        {
          order?.items?.length > 0 &&

          <Cart cart={order} />
        }
      </div>

      <button onClick={() => setShowModal(null)} className="bg-primary-600 text-white rounded-md p-2 w-full text-center">بستن</button>
    </div>
  );
};

MemoShowOrderInfoModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};

const ShowOrderInfoModal = memo(MemoShowOrderInfoModal);

export default ShowOrderInfoModal;
