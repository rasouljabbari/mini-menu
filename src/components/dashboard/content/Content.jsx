import React, { memo } from "react";
import ContentRoutes from "./ContentRoutes.jsx";
import BottomSideBar from "../components/BottomSideBar.jsx";

function Content() {

  return (
    <div className="w-full relative z-10 h-screen max-w-tablet-content mx-auto flex flex-col justify-between pb-24">
      <ContentRoutes />

      <BottomSideBar />
    </div>
  );
}

export default memo(Content);
