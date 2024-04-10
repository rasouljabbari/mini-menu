import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Images } from "../../../utils/Images";
import AddItemForMenuModal from "../../dashboard/components/AddItemForMenuModal";
import ModalParent from "../../dashboard/components/ModalParent";
import { MAIN_URL_IMAGE } from "../../../utils/GeneralVariables";

function ProductCard({ product, refetch }) {

  const [showItem, setShowItem] = useState(null)

  let productInCartCount = 0;
  const productsInCart = useSelector((state) => state.cart.cartItems);

  productsInCart?.forEach((elem) => {
    if (elem?.id === product?.id) {
      productInCartCount += elem?.count;
    }
    return productInCartCount;
  });

  return (
    <>
      <div
        onClick={() => setShowItem(product)}
        className="w-[136px] h-[183px] relative bg-product-frame z-30 mx-auto"
      >
        {/*image*/}
        <div className="absolute -top-8 right-1/2 translate-x-1/2 w-[115px] rounded-full">
          <img
            className={`w-[115px] h-[115px] object-cover rounded-full`}
            // src={URL.createObjectURL(product?.image)}
            src={MAIN_URL_IMAGE + product?.image}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = Images.placeholder;
            }}
            loading="lazy"
            alt={product?.title}
          />
        </div>

        {/*title*/}
        <h2 className="text-black text-center product-cut-text text-xl font-medium absolute bottom-12 right-1/2 translate-x-1/2">
          {product?.title}
        </h2>

        {/*price*/}
        <div className="w-[135px] flex flex-col items-center gap-x-2 absolute bottom-0 right-1/2 translate-x-1/2">
          <span
            className={`whitespace-nowrap text-center text-white text-xl py-1 font-normal`}
          >
            {product?.price?.toLocaleString()} ﷼
          </span>
        </div>
      </div>

      {showItem && (
        <ModalParent removeCloseIcon size="md" setShowModal={setShowItem}>
          <AddItemForMenuModal refetch={refetch} item={showItem} setShowModal={setShowItem} />
        </ModalParent>
      )}
    </>
  );
}

export default memo(ProductCard);
