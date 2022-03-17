import React from "react";
import { Routes, Route } from "react-router-dom";
import { Card, Main } from "./pages";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/card/:id" element={<Card />} />

      <Route path="/" element={<Main />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
};

export default App;
