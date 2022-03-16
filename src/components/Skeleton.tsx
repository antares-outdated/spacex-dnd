import React from "react";
import styled from "styled-components";

export const Skeleton: React.FC = () => (
  <Wrapper>
    <Item />
    <Item />
    <Item />
  </Wrapper>
);

const Item = styled.div`
  background-color: #fff;
  height: 50px;
  width: 100%;
  margin: 8px;
`;

const Wrapper = styled.div<{ status?: number }>`
  width: 100%;
  height: 100vh;

  background-color: #ccc;
`;
