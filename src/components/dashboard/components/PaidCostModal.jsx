import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SubmitButton from "../../utils-components/button/SubmitButton";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { changeStatusOrderApi, updateOrderCostApi } from "../../../api/ordersApi";
import { apiErrorHandler } from "../../../utils/errorHandling";
import InputError from "../../utils-components/input/InputError";
import NumberInputWithLabel from "../../utils-components/input/NumberInputWithLabel";


const MemoPaidCostModal = ({ order, setShowModal, refetch }) => {

  const [paidCost, setPaidCost] = useState(0)
  const [errorInfo, setErrorInfo] = useState(null)

  useEffect(() => {
    setPaidCost(order?.paid_cost)
  }, [order])

  const updateOrderPaidCostMutation = useMutation({
    mutationFn: updateOrderCostApi,
    onSuccess: async ({ data }) => {
      toast.success(`سفارش ${data?.order?.full_name} با موفقیت ویرایش شد.`)
      refetch()
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

  const changeStatusOrderMutation = useMutation({
    mutationFn: changeStatusOrderApi,
    onSuccess: async ({ data }) => {
      toast.success(`سفارش ${data?.order?.full_name} با موفقیت پرداخت و ثبت شد.`)
      refetch()
      setShowModal(false)
    },
    onError: (error) => {
      const errorResponse = apiErrorHandler(error);
      if (errorResponse?.status === 422) {
        setErrorInfo(errorResponse?.error);
      }
    },
  })

  const paidHandler = () => {
    changeStatusOrderMutation.mutate({ id: order?.id})
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={submitHandler}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-gray-900 text-lg font-semibold mb-1">
          ویرایش هزینه
        </h2>
        <button type="button" onClick={paidHandler} className="bg-blue-100 text-blue-600 rounded-lg px-4 h-10 w-fit">تسویه کامل</button>
      </div>
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

      <SubmitButton
        isLoading={updateOrderPaidCostMutation?.isLoading}
        handler={() => setShowModal(false)} />
    </form>
  );
};

MemoPaidCostModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  order: PropTypes.object,
  refetch: PropTypes.func,
};

const PaidCostModal = memo(MemoPaidCostModal);

export default PaidCostModal;
