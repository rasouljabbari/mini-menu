import { memo, useEffect, useState } from "react";
import AddNewItemButton from "../../../utils-components/button/AddNewItemButton";
import ProductCard from "../../../utils-components/product/ProductCard";
import ModalParent from "../../components/ModalParent";
import AddItemModalForCustomerModal from "../../components/AddItemModalForCustomerModal";

const MemoCafeMenu = () => {
    const [products, setProducts] = useState([])
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
    }, [localStorage.getItem('products')]);

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
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 pb-20">
                    {
                        products?.length > 0 ?
                            products?.map((product, index) => (
                                <ProductCard
                                    setProducts={setProducts}
                                    key={index}
                                    product={product}
                                />
                            )) :
                            <h5 className="text-primary-600 bg-primary-100 p-1 rounded-md text-center text-3xl py-8 col-span-2 sm:col-span-4">محصولی ثبت نشده است.</h5>
                    }

                </div>
            </div>

            {showModal && (
                <ModalParent removeCloseIcon size="md" setShowModal={setShowModal}>
                    <AddItemModalForCustomerModal setShowModal={setShowModal} />
                </ModalParent>
            )}
        </>
    );
};

const CafeMenu = memo(MemoCafeMenu);

export default CafeMenu;
