import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/LoginPage";
import Register from "../Pages/RegisterPage";
import Main from "../Pages/MainPage";
import ProductPage from "../Pages/ProductPage";
import CartPage from "../Pages/CartPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Main />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default AppRoutes;