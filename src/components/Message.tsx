import React from "react";
import styled from "styled-components";

export const Message: React.FC<{ text: string; status: number }> = ({
  text,
  status,
}) => (
  <Wrapper status={status}>
    <Content>
      <h3>{text}</h3>
    </Content>
  </Wrapper>
);

const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  text-transform: uppercase;
`;

const Wrapper = styled.div<{ status?: number }>`
  display: fixed;
  position: absolute;
  bottom: 0;
  right: 0;

  background-color: ${(props) =>
    props.status === 201
      ? "#00FFB2"
      : props.status === 500
      ? "#FF4D00"
      : "#3a3a3a"};
  min-width: 300px;
  min-height: 50px;
  color: ${(props) => (props.status === 201 ? "#3a3a3a" : "#fff")};
`;
