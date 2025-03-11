import React from "react";
import MainLayout from "./layout/MainLayout";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="/" element={<MainLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
