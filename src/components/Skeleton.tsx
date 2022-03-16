import React from "react";
import styled from "styled-components";

export const Skeleton: React.FC<any> = ({ item, updateOpen }) => (
  <Wrapper>Skeleton</Wrapper>
);

const Wrapper = styled.div<{ status?: number }>`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;

  overflow: hidden;

  width: 100%;
  height: 100vh;

  background-color: #ccc;
`;
