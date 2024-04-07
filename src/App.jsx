import React, { memo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import "aos/dist/aos.css";
import Content from "./components/dashboard/content/Content.jsx";
import Login from "./components/login/login.jsx";

function App() {
    const token = localStorage.getItem("Token")
    return (
        token ? 
            <Content /> : 
            <Routes>
                <Route index element={<Navigate to="login" replace />} />
                <Route path={"login"} element={<Login />} />
            </Routes>
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
