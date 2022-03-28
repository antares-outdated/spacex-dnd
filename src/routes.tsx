import React from "react";
import { Routes, Route } from "react-router-dom";
import { Card } from "./pages/card";
import { Main } from "./pages/main";

export const useRoutes = () => {
  return <Routes>
    <Route path="/card/:id" element={<Card />} />

    <Route path="/" element={<Main />} />
    <Route path="*" element={<Main />} />
  </Routes>
}