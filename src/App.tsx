import React from "react";
import { useRoutes } from "./routes";

export const App: React.FC = () => {
  const routes = useRoutes()
  return routes
};
