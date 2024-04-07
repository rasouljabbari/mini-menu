import { memo, useEffect, useState } from "react";
import AddNewItemButton from "../../../utils-components/button/AddNewItemButton";
import ProductCard from "../../../utils-components/product/ProductCard";
import ModalParent from "../../components/ModalParent";
import AddItemModalForCustomerModal from "../../components/AddItemModalForCustomerModal";
import { useQuery } from "@tanstack/react-query";
import { productsListApi } from "../../../../api/productsApi";

const MemoCafeMenu = () => {
    const [products, setProducts] = useState([])
    const [showModal, setShowModal] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: () => productsListApi(),
    });

    useEffect(() => {
        setProducts(data?.products?.data);
    }, [data]);

    return (
        <>
            <div className="py-14 flex flex-col gap-20">
                <div className="flex items-center justify-between gap-6">
                    <h1 className="text-2xl text-primary-700">منو کافه</h1>
                    <AddNewItemButton
                        isGreen
                        label={"ثبت سفارش جدید"}
                        handler={() => setShowModal(true)}
                    />
                </div>
                {
                    isLoading ? <h5 className="text-primary-600 bg-primary-100 p-1 rounded-md text-center text-3xl py-8 col-span-2 sm:col-span-4">در حال بارگذاری...</h5>
                        :
                        products?.length > 0 ?
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 pb-20">
                                {
                                    products?.map((product, index) => (
                                        <ProductCard
                                            setProducts={setProducts}
                                            key={index}
                                            product={product}
                                        />
                                    ))
                                }
                            </div> :
                            <h5 className="text-primary-600 bg-primary-100 p-1 rounded-md text-center text-3xl py-8 col-span-2 sm:col-span-4">محصولی ثبت نشده است.</h5>
                }
            </div>

            {showModal && (
                <ModalParent removeCloseIcon size="md" setShowModal={setShowModal}>
                    <AddItemModalForCustomerModal
                        setShowModal={setShowModal} />
                </ModalParent>
            )}
        </>
    );
};

const CafeMenu = memo(MemoCafeMenu);

export default CafeMenu;
