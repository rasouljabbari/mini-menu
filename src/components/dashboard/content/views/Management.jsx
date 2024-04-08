import { memo, useEffect, useState } from "react";
import AddNewItemButton from "../../../utils-components/button/AddNewItemButton";
import ProductCard from "../../../utils-components/product/ProductCard";
import ModalParent from "../../components/ModalParent";
import AddItemForMenuModal from "../../components/AddItemForMenuModal";
import { useQuery } from "@tanstack/react-query";
import { productsListApi } from "../../../../api/productsApi";


const MemoManagement = () => {
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => productsListApi(),
  });

  useEffect(() => {
    setProducts(data?.products);
  }, [data]);

  return (
    <>
      <div className="py-14 flex flex-col gap-20">
        <div className="flex items-center justify-between gap-6">
          <h1 className="text-2xl text-primary-700">مدیریت کافه</h1>
          <AddNewItemButton
            isGreen
            label={"افزودن آیتم جدید"}
            handler={() => setShowModal(true)}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 pb-20">
          {
            isLoading ? <h5 className="text-primary-600 bg-primary-100 p-1 rounded-md text-center text-3xl py-8 col-span-2 sm:col-span-4">در حال بارگذاری...</h5> :
            products?.length > 0 ?
              products?.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  refetch={refetch}
                />
              )) :
              <h5 className="text-primary-600 bg-primary-100 p-1 rounded-md text-center text-3xl py-8 col-span-2 sm:col-span-4">محصولی ثبت نشده است.</h5>
          }

        </div>
      </div>

      {showModal && (
        <ModalParent removeCloseIcon size="md" setShowModal={setShowModal}>
          <AddItemForMenuModal refetch={refetch} setShowModal={setShowModal} />
        </ModalParent>
      )}
    </>
  );
};

const Management = memo(MemoManagement);

export default Management;
