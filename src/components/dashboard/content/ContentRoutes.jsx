import React, { memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../../404/NotFound.jsx";
import GotoTopPage from "../../../utils/GotoTopPage.jsx";
import CafeMenu from "./views/CafeMenu.jsx";
import Management from "./views/Management.jsx";
import Orders from "./views/Orders.jsx";


function ContentRoutes() {

  return (
    <GotoTopPage>
      <Routes>
        <Route index element={<Navigate to="menu" replace />} />
        <Route path={"menu"} element={<CafeMenu />} />
        <Route path={"orders"} element={<Orders />} />
        <Route path={"management"} element={<Management />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </GotoTopPage>
  );
}

export default memo(ContentRoutes);
