import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Navbar from "./components/Navbar";
import MacPage from "./pages/MacPage";
import AdminAddPage from "./pages/AdminAddPage";
import AdminPage from "./pages/AdminPage";

function Navigation() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mac" element={<MacPage />} />
          <Route path="/admin/add" element={<AdminAddPage />} />
          <Route path="/admin/" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Navigation;
