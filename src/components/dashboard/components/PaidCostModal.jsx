import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SubmitButton from "../../utils-components/button/SubmitButton";
import { toast } from "react-toastify";
import { edit_item_with_id } from "../../../utils/GeneralFunctions";
import { useMutation } from "@tanstack/react-query";
import { updateOrderCostApi } from "../../../api/ordersApi";
import { apiErrorHandler } from "../../../utils/errorHandling";
import InputError from "../../utils-components/input/InputError";
import NumberInputWithLabel from "../../utils-components/input/NumberInputWithLabel";


const MemoPaidCostModal = ({ order, setOrders, setShowModal }) => {

  const [paidCost, setPaidCost] = useState(0)
  const [errorInfo, setErrorInfo] = useState(null)

  useEffect(() => {
    setPaidCost(order?.paid_cost)
  }, [order])

  const updateOrderPaidCostMutation = useMutation({
    mutationFn: updateOrderCostApi,
    onSuccess: async ({ data }) => {
      toast.success(`سفارش ${data?.order?.full_name} با موفقیت ویرایش شد.`)
      setOrders && setOrders(prev => (edit_item_with_id(prev, data?.order)))
      setShowModal(false)
    },
    onError: (error) => {
      const errorResponse = apiErrorHandler(error);
      if (errorResponse?.status === 422) {
        setErrorInfo(errorResponse?.error);
      }
    },
  })

  const submitHandler = (e) => {
    e.preventDefault();
    updateOrderPaidCostMutation.mutate({ id: order?.id, paid_cost: paidCost })
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={submitHandler}>
      <h2 className="text-gray-900 text-lg font-semibold mb-1">
        ویرایش هزینه سفارش مشتری
      </h2>
      <hr />
      <NumberInputWithLabel
        name="paidCost"
        label={"هزینه پرداخت شده"}
        value={paidCost}
        handler={(value) => setPaidCost(value)}
      />

      {
        errorInfo &&
        <InputError errorItem={errorInfo} />
      }

      <SubmitButton handler={() => setShowModal(false)} />
    </form>
  );
};

MemoPaidCostModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  setOrders: PropTypes.func,
  order: PropTypes.object,
};

const PaidCostModal = memo(MemoPaidCostModal);

export default PaidCostModal;
