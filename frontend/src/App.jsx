import React from "react";
import { Toaster } from "@/components/ui/sonner"
import MainLayout from "./layout/MainLayout";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import DashboardLayout from "./layout/DashboardLayout";
import DriverPage from "./pages/DriverPage";
import DriverForm from "./pages/DriverForm";

function App() {
  return (
    <>
      <Toaster closeButton />
      <Routes>
        <Route path="/">
          <Route path="/" element={<MainLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoutes
                allowedRoles={["superadmin", "admin", "driver"]}
              />
            }
          >
            <Route element={<DashboardLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/driver" element={<DriverPage />} />
              <Route path="/driver/create" element={<DriverForm />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
