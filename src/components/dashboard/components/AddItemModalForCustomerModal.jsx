import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextInputWithLabel from "../../utils-components/input/TextInputWithLabel";
import SubmitButton from "../../utils-components/button/SubmitButton";
import AddNewItemButton from "../../utils-components/button/AddNewItemButton";
import Counter from "../../utils-components/Counter";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { productsListApi } from "../../../api/productsApi";
import { storeOrderApi, updateOrderApi } from "../../../api/ordersApi";
import { apiErrorHandler } from "../../../utils/errorHandling";
import InputError from "../../utils-components/input/InputError";

function Cart({ cart, incrementQuantity, decrementQuantity, removeFromCart }) {
  return (
    <div className="flex flex-col gap-2">
      <h2>موارد انتخاب شده :‌</h2>
      <ul className="flex flex-col gap-2 bg-primary-100 p-3 rounded">
        {cart.items.map((item) => (
          <li key={item.id} className="grid grid-cols-2">
            {item.title} - {(item.price)?.toLocaleString()} ریال
            <div className="flex items-center justify-end gap-2">
              <Counter incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} order={item} />
              {
                cart.items?.length > 1 &&
                <button type="button" onClick={() => removeFromCart(item.id)} className="w-fit bg-rose-100 text-rose-700 py-1 px-3 rounded" >حذف</button>
              }
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const MemoAddItemModalForCustomerModal = ({ order, refetch, setShowModal }) => {

  const [searchValue, setSearchValue] = useState('')
  const [errorInfo, setErrorInfo] = useState(null)

  const [inputs, setInputs] = useState({
    full_name: "",
    items: [],
  });

  // fetch products
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => productsListApi(),
  });

  useEffect(() => {
    if (order) {
      setInputs({
        full_name: order?.full_name,
        items: order?.products?.map(product => ({
          ...product,
          quantity: product?.pivot?.product_count
        })),
      })
    }
  }, [order])

  const addToCartHandler = (itemToAdd) => {

    const existingItemIndex = inputs.items?.findIndex(item => item?.id === itemToAdd?.id);

    if (existingItemIndex !== -1) {
      const updatedItems = [...inputs.items];
      updatedItems[existingItemIndex].quantity += 1;
      setInputs({ ...inputs, items: updatedItems });
    } else {
      setInputs({ ...inputs, items: [...inputs.items, { ...itemToAdd, quantity: 1 }] });
    }
  }

  const incrementQuantity = (idToIncrement) => {
    const updatedItems = inputs.items.map(item =>
      item.id === idToIncrement ? { ...item, quantity: item.quantity + 1 } : item
    );
    setInputs({ ...inputs, items: updatedItems });
  };

  const decrementQuantity = (idToDecrement) => {
    const updatedItems = inputs.items.map(item =>
      item.id === idToDecrement && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setInputs({ ...inputs, items: updatedItems });
  };

  const removeFromCart = (idToRemove) => {
    const updatedItems = inputs.items.filter(item => item.id !== idToRemove);
    setInputs({ ...inputs, items: updatedItems });
  };

  const storeOrderMutation = useMutation({
    mutationFn: storeOrderApi,
    onSuccess: async ({ data }) => {
      toast.success(`سفارش ${data?.order?.full_name} با موفقیت ثبت شد.`)
      refetch && refetch()
      setShowModal(false)
      setInputs({
        full_name: "",
        items: [],
      })
    },
    onError: (error) => {
      const errorResponse = apiErrorHandler(error);
      if (errorResponse?.status === 422) {
        setErrorInfo(errorResponse?.error);
      }
    },
  })

  const updateOrderMutation = useMutation({
    mutationFn: updateOrderApi,
    onSuccess: async ({ data }) => {
      toast.success(`سفارش ${data?.order?.full_name} با موفقیت ویرایش شد.`)
      refetch && refetch()

      setShowModal(false)
      setInputs({
        full_name: "",
        items: [],
      })
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
    if (order?.id) {
      updateOrderMutation.mutate({id: order?.id, data: inputs})
    } else {
      storeOrderMutation.mutate(inputs)
    }
  };

  const searchedProduct = data?.products?.filter(product => product?.title?.includes(searchValue))

  return (
    <form className="flex flex-col gap-6" onSubmit={submitHandler}>
      <h2 className="text-gray-900 text-lg font-semibold mb-1">
        ثبت سفارش مشتری
      </h2>
      <hr />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <TextInputWithLabel
            name="full_name"
            label={"نام مشتری"}
            value={inputs?.full_name}
            handler={(value) => setInputs({ ...inputs, full_name: value })}
          />
        </div>

        <div className="flex flex-col">
          <TextInputWithLabel
            name="searchValue"
            label={"جستجوی نام آیتم"}
            value={searchValue}
            handler={(value) => setSearchValue(value)}
          />

          {
            searchValue &&
            <div className="bg-primary-100 p-4 rounded-b-md flex flex-col gap-1">
              {
                searchedProduct?.length > 0 ?
                  searchedProduct?.map((item, index) =>
                    <div key={index} className="text-ld text-primary-800 flex items-center justify-between gap-4">
                      <span>{item?.title}</span>
                      <div className="flex items-center gap-2">
                        <span>{item?.price || 0}</span>
                        <AddNewItemButton
                          isGreen
                          label="افزودن"
                          handler={() => { addToCartHandler(item); setSearchValue("") }}
                        />
                      </div>
                    </div>
                  ) : <p className="text-rose-600 text-center">محصولی یافت نشد.</p>
              }
            </div>
          }
        </div>

        {
          inputs?.items?.length > 0 &&
          <Cart cart={inputs} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} removeFromCart={removeFromCart} />
        }
      </div>

      {
        errorInfo &&
        <InputError errorItem={errorInfo} />
      }

      <SubmitButton handler={() => setShowModal(false)} />
    </form>
  );
};

MemoAddItemModalForCustomerModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  order: PropTypes.object,
  products: PropTypes.array.isRequired,
  refetch: PropTypes.func,
};

const AddItemModalForCustomerModal = memo(MemoAddItemModalForCustomerModal);

export default AddItemModalForCustomerModal;
