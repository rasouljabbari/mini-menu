import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextInputWithLabel from "../../utils-components/input/TextInputWithLabel";
import SubmitButton from "../../utils-components/button/SubmitButton";
import AddNewItemButton from "../../utils-components/button/AddNewItemButton";
import Counter from "../../utils-components/Counter";
import { toast } from "react-toastify";
import { edit_item_with_id } from "../../../utils/GeneralFunctions";

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

const MemoAddItemModalForCustomerModal = ({ order, setOrders, setShowModal }) => {

  const [products, setProducts] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const [inputs, setInputs] = useState({
    full_name: "",
    items: [],
  });

  useEffect(() => {
    if (order) {
      setInputs({
        full_name: order?.full_name,
        items: order?.items,
      })
    }
  }, [order])

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, [localStorage.getItem('products')]);

  const addToCartHandler = (itemToAdd) => {

    const existingItemIndex = inputs.items.findIndex(item => item?.id === itemToAdd?.id);

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

  const submitHandler = (e) => {
    e.preventDefault();
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

    if (order?.id) {
      localStorage.setItem('orders', JSON.stringify(edit_item_with_id(existingOrders, { ...order, ...inputs })))
      setOrders && setOrders(edit_item_with_id(existingOrders, { ...order, ...inputs }))
      toast.success(`سفارش ${inputs?.full_name} با موفقیت ویرایش شد.`)
    } else {
      let id = 1
      //find last id :
      if (existingOrders?.length > 0) {
        id = existingOrders[existingOrders?.length - 1]?.id
        id++
      }

      localStorage.setItem('orders', JSON.stringify([...existingOrders, { id, ...inputs }]))
      toast.success(`سفارش ${inputs?.full_name} با موفقیت ثبت شد.`)
    }
    setShowModal(false)

  };

  const searchedProduct = products?.filter(product => product?.title?.includes(searchValue))

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

      <SubmitButton handler={() => setShowModal(false)} />
    </form>
  );
};

MemoAddItemModalForCustomerModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  setOrders: PropTypes.func,
  order: PropTypes.object,
};

const AddItemModalForCustomerModal = memo(MemoAddItemModalForCustomerModal);

export default AddItemModalForCustomerModal;
