import React from "react";
import { useRoutes } from "./routes";

const App: React.FC = () => {
  const routes = useRoutes();
  return <>{routes}</>;
};

export default App;
