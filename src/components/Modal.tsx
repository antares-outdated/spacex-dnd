import React from "react";
import styled from "styled-components";

export const Modal: React.FC<any> = ({ item, updateOpen }) => (
  <Wrapper>
    <Content>
      <img src={item.links.patch.small} alt="" />
      <h3>{item.name}</h3>
      <p>{item.details}</p>

      <Button onClick={() => updateOpen(false)}>
        <img src="/images/arrow.png" alt="" width="50" />
      </Button>
    </Content>
  </Wrapper>
);

const Content = styled.div`
  padding: 120px;
  position: relative;
`;

const Wrapper = styled.div<{ status?: number }>`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;

  width: 100%;
  height: 100%;

  background-color: #ccc;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;

  margin-top: 50px;
`;
