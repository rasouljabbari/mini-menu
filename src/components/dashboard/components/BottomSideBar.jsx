import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import {
  asideIcons,
  asideTitles,
  BOTTOM_PAGES,
} from "../../../utils/stateList";
import BottomFixedButton from "../../utils-components/button/BottomFixedButton";

function BottomSideBar() {

  const logoutHandler = () => {
    localStorage.clear()
    window.location.href = "/login"
  }

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
      <button onClick={logoutHandler} className="flex-center flex-col gap-y-1 relative">
        <i className={`icon-log-out-01 text-rose-500 text-2xl`} />
      </button>
    </BottomFixedButton>
  );
}

export default memo(BottomSideBar);
