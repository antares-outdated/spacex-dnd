import React from "react";
import styled from "styled-components";
import { useRoutes } from "./routes";

const App: React.FC = () => {
  const routes = useRoutes();
  return <Container>{routes}</Container>;
};

export default App;

const Container = styled.div`
  padding: 0 40px;
`;
