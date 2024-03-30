import React, { memo } from "react";
import { BrowserRouter } from 'react-router-dom';
import "aos/dist/aos.css";
import Content from "./components/dashboard/content/Content.jsx";

function App() {

    return (
        <Content />
    );
}

const AppWrapper = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
}

export default memo(AppWrapper)
