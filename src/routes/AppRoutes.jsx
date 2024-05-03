import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../pages/login";
import Register from "../pages/register";
import Painel from "../pages/crud";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/painel-admin" element={<Painel />} />
            </Routes>
        </BrowserRouter>
    );
};