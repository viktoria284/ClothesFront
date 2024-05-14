import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Pages/LoginPage";
import Register from "../Pages/RegisterPage";
import Main from "../Pages/MainPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

export default AppRoutes;

/*export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <App />
      </UserProvider>
    ),
    children: [
      { path: "", element: <Main /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);*/