import React, { memo } from "react";
import BannerSlider from "../../utils-components/slider/BannerSlider.jsx";
import { Link } from "react-router-dom";
import FilterCard from "../../utils-components/FilterCard.jsx";
import TableCardSkeleton from "../../skeleton/TableCardSkeleton.jsx";
import categoryOnlineMenuTitle from "../../../assets/images/png/category-online-menu-title.svg";
import Header from "../../header/Header.jsx";
import { Images } from "../../../utils/Images.js";

function UserMenuCategory({ itemsList, page_name, bannerList }) {
  return (
    <>
      <img
        src={Images.OrmanLogoBg}
        className="fixed z-20 right-0 top-1/2 -translate-y-1/2 md:hidden"
        alt="کافه رستوران اورمان"
      />
      <div className="flex flex-col gap-9 px-6">
        <div className="flex flex-col gap-4 relative z-20">
          <Header />
          {bannerList?.length > 0 && <BannerSlider bannerList={bannerList} />}
        </div>

        <img
          className="mx-auto w-fit h-fit"
          src={categoryOnlineMenuTitle}
          alt="کافه رستوران اورمان"
        />

        <div className="flex flex-wrap justify-center gap-y-12 gap-x-6">
          {itemsList?.map((item, index) =>
            itemsList[0] ? (
              <Link
                className="relative z-30"
                key={index}
                to={`/${page_name}/${item?.id}`}
              >
                <FilterCard title={item?.title} logo={item?.logo} />
              </Link>
            ) : (
              <React.Fragment key={index}>
                <TableCardSkeleton />
              </React.Fragment>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default memo(UserMenuCategory);
