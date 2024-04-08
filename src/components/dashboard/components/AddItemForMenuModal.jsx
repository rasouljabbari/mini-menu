import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextInputWithLabel from "../../utils-components/input/TextInputWithLabel";
import NumberInputWithLabel from "../../utils-components/input/NumberInputWithLabel";
import UploadFileWithLabel from "../../utils-components/input/UploadFileWithLabel";
import { toast } from "react-toastify";
import SubmitButton from "../../utils-components/button/SubmitButton";
import { remove_item_of_arr_with_id } from "../../../utils/GeneralFunctions";
import { useMutation } from "@tanstack/react-query";
import { storeProductApi, updateProductApi } from "../../../api/productsApi";
import { apiErrorHandler } from "../../../utils/errorHandling";
import InputError from "../../utils-components/input/InputError";
import { MAIN_URL_IMAGE } from "../../../utils/GeneralVariables";

const MemoAddItemForMenuModal = ({ item, refetch, setProducts, setShowModal }) => {
  const [inputs, setInputs] = useState({
    title: "",
    price: null,
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [errorInfo, setErrorInfo] = useState('');

  useEffect(() => {
    setInputs({
      title: item?.title,
      price: item?.price,
      image: ""
    })
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
  };

  const removeHandler = (item) => {
    const updatedItems = remove_item_of_arr_with_id(JSON.parse(localStorage.getItem('products')), item?.id)
    localStorage.setItem('products', JSON.stringify(updatedItems));
    setProducts(updatedItems)
    setShowModal(false)
  }

  const storeProductMutation = useMutation({
    mutationFn: storeProductApi,
    onSuccess: async () => {
      toast.success(`محصول جدید با موفقیت ثبت شد.`)
      refetch()
      setShowModal(false)
      setInputs({
        title: "",
        price: null,
        image: null
      })
      setPreviewUrl('')
    },
    onError: (error) => {
      const errorResponse = apiErrorHandler(error);
      if (errorResponse?.status === 422) {
        setErrorInfo(errorResponse?.error);
      }
    },
  })

  const updateProductMutation = useMutation({
    mutationFn: updateProductApi,
    onSuccess: async () => {
      toast.success("آیتم با موفقیت ویرایش شد.")
      refetch()

      setShowModal(false)
      setInputs({
        title: "",
        price: null,
        image: null
      })
      setPreviewUrl('')
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
    if (item?.id) {
      updateProductMutation.mutate({ id: item?.id, ...inputs })
    } else {
      storeProductMutation.mutate(inputs)
    }
  };

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
            onClick={() => removeHandler(item)}
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

          {(item?.id || previewUrl) &&

            <div
              className="rounded-full border border-jungle-600 flex gap-x-3 bg-jungle-25 m-auto w-[150px] h-[150px]"
            >
              <img
                className="w-[150px] h-[150px] object-cover rounded-full"
                src={previewUrl || MAIN_URL_IMAGE + item?.image}
                alt={inputs?.title}
              />
            </div>
          }
        </div>
      </div>

      {
        errorInfo &&
        <InputError errorItem={errorInfo} />
      }

      <SubmitButton handler={() => setShowModal(false)} />
    </form>
  );
};

MemoAddItemForMenuModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  item: PropTypes.object,
  refetch: PropTypes.func,
};

const AddItemForMenuModal = memo(MemoAddItemForMenuModal);

export default AddItemForMenuModal;
