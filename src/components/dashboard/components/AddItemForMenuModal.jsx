import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextInputWithLabel from "../../utils-components/input/TextInputWithLabel";
import NumberInputWithLabel from "../../utils-components/input/NumberInputWithLabel";
import UploadFileWithLabel from "../../utils-components/input/UploadFileWithLabel";
import { toast } from "react-toastify";
import SubmitButton from "../../utils-components/button/SubmitButton";
import { edit_item_with_id, remove_item_of_arr_with_id } from "../../../utils/GeneralFunctions";

const MemoAddItemForMenuModal = ({ item, setProducts, setShowModal }) => {
  const [inputs, setInputs] = useState({
    title: "",
    price: null,
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    setInputs({
      title: item?.title,
      price: item?.price,
      image: item?.image
    })
    setPreviewUrl(item?.image)
  }, [item])

  const inputHandler = async (value, name) => {
    if (name !== "image") {
      setInputs((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    } else {
      setInputs((prevInfo) => ({
        ...prevInfo,
        image: value,
      }));
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(value);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    let updatedItems = []
    const existingItems = JSON.parse(localStorage.getItem('products')) || [];
    if (item?.id) {
      updatedItems = edit_item_with_id(existingItems, { ...item, ...inputs, image: previewUrl });

      toast.success("آیتم با موفقیت ویرایش شد.")
    } else {
      let id = 1
      //find last id :
      if (existingItems?.length > 0) {
        id = existingItems[existingItems?.length - 1]?.id
        id++
      }

      updatedItems = [...existingItems, { ...inputs, id, image: previewUrl }];

      toast.success("آیتم جدید با موفقیت افزوده شد.")
    }

    localStorage.setItem('products', JSON.stringify(updatedItems));
    setProducts(updatedItems)

    setInputs({
      food_name: "",
      price: 0,
      image: null
    })
    setPreviewUrl('')
    setShowModal(false)
  };

  const removeHandler = (item) => {
    const updatedItems = remove_item_of_arr_with_id(JSON.parse(localStorage.getItem('products')), item?.id)
    localStorage.setItem('products', JSON.stringify(updatedItems));
    setProducts(updatedItems)
    setShowModal(false)
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={submitHandler}>
      <div className="flex items-center justify-between gap-6">
        <h2 className="text-gray-900 text-lg font-semibold mb-1">
          {
            item?.id ? "ویرایش آیتم" : "افزودن آیتم جدید"
          }
        </h2>
        {
          item?.id &&
          <button
              type="button"
              className="text-rose-800 bg-rose-100 py-1 px-3 rounded"
              onClick={() =>removeHandler(item)}
            >حذف آیتم</button>
        }
      </div>
      <hr />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="w-full">
            <TextInputWithLabel
              name="title"
              label={"نام آیتم"}
              value={inputs?.title}
              handler={(value) => inputHandler(value, "title")}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="w-full">
            <NumberInputWithLabel
              hasPrice
              name="price"
              label="قیمت"
              value={inputs?.price}
              handler={(value) => inputHandler(value, "price")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="col-span-2">
            <UploadFileWithLabel
              name="image"
              label="بارگذاری عکس"
              handler={(value) => inputHandler(value, "image")}
            />
          </div>

          {previewUrl &&

            <div
              className="rounded-full border border-jungle-600 flex gap-x-3 bg-jungle-25 m-auto w-[150px] h-[150px]"
            >
              <img
                className="w-[150px] h-[150px] object-cover rounded-full"
                src={previewUrl}
                alt={inputs?.title}
              />
            </div>
          }
        </div>
      </div>

      <SubmitButton handler={() => setShowModal(false)} />
    </form>
  );
};

MemoAddItemForMenuModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  item: PropTypes.object,
};

const AddItemForMenuModal = memo(MemoAddItemForMenuModal);

export default AddItemForMenuModal;
