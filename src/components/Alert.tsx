import React from "react";
import styled from "styled-components";

export const Message: React.FC<{ text: string }> = ({ text }) => (
  <Wrapper>
    <Content>
      <h3>{text}</h3>
    </Content>
  </Wrapper>
);

const Content = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-transform: uppercase;
`;

const Wrapper = styled.div`
  display: fixed;
  position: absolute;
  bottom: 0;
  right: 0;

  background-color: #3a3a3a;
  min-width: 300px;
  min-height: 50px;
  color: #fff;
`;
