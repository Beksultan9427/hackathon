import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Navbar from "./components/Navbar";
import MacPage from "./pages/MacPage";
import AdminAddPage from "./pages/AdminAddPage";
import AdminPage from "./pages/AdminPage";
import AdminEditPage from "./pages/AdminEditPage";
import AdminProvider from "./contexts/AdminProvider";
import ClientProvider from "./contexts/ClientProvider";

function Navigation() {
  return (
    <div>
      <ClientProvider>
        <AdminProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/admin/add" element={<AdminAddPage />} />
              <Route path="/admin/" element={<AdminPage />} />
              <Route path="/admin/edit/:id" element={<AdminEditPage />} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </ClientProvider>
    </div>
  );
}

export default Navigation;
