import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useHttp } from "../hook/http.hook";
import { CardType } from "../types";

export const Card: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState<CardType>();
  const { request } = useHttp();

  useEffect(() => {
    request(`launches/${id}`).then((result) => {
      setCard(result);
    });
  }, []);

  if (!card) {
    return <p>Loading...</p>;
  }

  return (
    <Wrapper>
      <Content>
        <img src={card.links.patch.small} alt="" />
        <h3>{card.name}</h3>
        <p>{card.details}</p>

        <Button onClick={() => navigate("/")}>
          <img src="/images/arrow.png" alt="" width="30" />
        </Button>
      </Content>
    </Wrapper>
  );
};

const Content = styled.div`
  position: relative;
  padding: 120px;

  @media (max-width: 500px) {
    padding: 30px;
  }
`;

const Wrapper = styled.div<{ status?: number }>`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  background-color: #ccc;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;

  margin-top: 50px;
`;
