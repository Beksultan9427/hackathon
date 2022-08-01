import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Navbar from "./components/Navbar";
import MacPage from "./pages/MacPage";
function Navigation() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mac" element={<MacPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Navigation;
