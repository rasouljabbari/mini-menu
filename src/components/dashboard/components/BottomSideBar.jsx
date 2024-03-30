import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import {
  asideIcons,
  asideTitles,
  BOTTOM_PAGES,
} from "../../../utils/stateList";
import BottomFixedButton from "../../utils-components/button/BottomFixedButton";

function BottomSideBar() {

  return (
    <BottomFixedButton>
      {BOTTOM_PAGES.map((name) => (
        <NavLink
          key={name}
          to={`/${name}`}
          className={({ isActive }) =>
            `text-xs ${isActive ? "text-fire-600" : "text-gray-400"}`
          }
        >
          <div className="flex-center flex-col gap-y-1 relative">
            <i className={`${asideIcons[name]} text-2xl`} />
            {asideTitles[name]}
          </div>
        </NavLink>
      ))}
    </BottomFixedButton>
  );
}

export default memo(BottomSideBar);
