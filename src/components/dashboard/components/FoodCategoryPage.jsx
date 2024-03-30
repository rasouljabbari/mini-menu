import { memo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import TabItems from "../../../../utils-components/TabItems.jsx";
import ProductCard from "../../utils-components/product/ProductCard.jsx";
import ProductSkeleton from "../../../../skeleton/ProductSkeleton.jsx";

import { useParams } from "react-router-dom";
import { menuAndCategory } from "../../../../../api/user/menuAndCategory/apiHandler.js";
import { Images } from "../../../utils/Images.js";
import PageTitleWithBack from "../../../components/PageTitleWithBack.jsx";

function FoodCategoryPage({ categoryList, page_name }) {
  // Queries
  const [list, setList] = useState();
  const [activeTabId, setActiveTabId] = useState(null);

  let { categoryId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["listOfFood", activeTabId, "category"],
    queryFn: () => menuAndCategory(activeTabId, "category"),
  });

  useEffect(() => {
    function fetchData() {
      setActiveTabId(categoryId);
      setList(data?.data);
    }
    fetchData();
  }, [data, categoryId]);

  return (
    <div className="relative flex flex-col gap-14 px-2">
      <img
        src={Images.OrmanLogoBg}
        className="fixed z-20 right-0 top-1/2 -translate-y-1/2 md:hidden"
        alt="کافه رستوران اورمان"
      />
      <div className="flex flex-col gap-5 px-3">
        <PageTitleWithBack label={data?.category?.title} />
        {categoryList?.length && (
          <TabItems
            page_name={page_name}
            activeTabId={activeTabId}
            list={categoryList}
          />
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-y-12 gap-x-6">
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8]?.map((item) => (
              <ProductSkeleton key={item} />
            ))
          : list?.length > 0 &&
            list?.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
      </div>

      {/* <ProgressBar /> */}
    </div>
  );
}

export default memo(FoodCategoryPage);
