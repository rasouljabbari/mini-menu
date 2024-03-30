import { memo } from "react";
import PropTypes from "prop-types";

const MemoBottomFixedButton = ({ children }) => {
    return (
        <div
            className="z-40 dv-bg-footer-sidebar bg-primary-600 p-[2px] w-full max-w-tablet-content fixed bottom-0 right-0 sm:right-1/2 sm:translate-x-1/2"
        >
            <div className="dv-sidebar-2 bg-white flex items-center justify-between py-4 px-5 gap-x-10 w-full">
                {children}
            </div>
        </div>
    );
};

MemoBottomFixedButton.propTypes = {
    children: PropTypes.node.isRequired,
};

const BottomFixedButton = memo(MemoBottomFixedButton);

export default BottomFixedButton;