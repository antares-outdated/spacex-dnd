import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useHttp } from "../hook/http.hook";
import { CardType } from "../types";

export const Card: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState<CardType>();
  const { request, loading } = useHttp();

  useEffect(() => {
    request(`launches/${id}`).then((result) => {
      setCard(result);
    });
  }, []);

  if (loading) {
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
