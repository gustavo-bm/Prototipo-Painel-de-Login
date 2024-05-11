import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginPage } from "../pages/login/LoginPage";
import Register from "../pages/register/RegisterPage";
import Painel from "../pages/crud/CrudPage";

export function AppRoutes () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/painel-admin" element={<Painel />} />
      </Routes>
    </BrowserRouter>
  );
}
