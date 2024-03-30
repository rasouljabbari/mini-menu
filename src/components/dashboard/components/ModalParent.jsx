import React from "react";
import { modalSize } from "../../../utils/stateList";

function ModalParent({
  setShowModal,
  size,
  isGray,
  children,
  removeCloseIcon = false,
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-primary-600 opacity-70"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="flex items-center min-h-screen px-2 py-8">
        <div
          className={`${modalSize[size]} ${isGray ? "bg-modal-gray" : "bg-white"
            } w-full animation-in relative mx-auto rounded-xl shadow-lg py-5 px-3`}
        >
          {!removeCloseIcon && (
            <i
              className={`z-50 absolute top-4 left-2 md:left-4 cursor-pointer transition-all duration-300 hover:bg-rose-200 hover:text-rose-700 rounded icon-close-circle text-2xl`}
              onClick={() => setShowModal(false)}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalParent;
