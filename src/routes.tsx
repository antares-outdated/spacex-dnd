import React from "react";
import { Card, Main } from "./pages";
import { Routes, Route } from "react-router-dom";

export const useRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/card/:id" element={<Card />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
};
