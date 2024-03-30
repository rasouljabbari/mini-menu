import { useLayoutEffect, memo } from "react";
import { useLocation } from "react-router-dom";

const GotoTopPage = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [location.pathname]);
    return <div className="px-4">
        {children}
    </div>
}

export default memo(GotoTopPage)