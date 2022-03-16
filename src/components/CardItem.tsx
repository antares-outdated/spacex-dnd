import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CardType } from "../types";

type Props = {
  item: CardType;
  columnIndex: number;
  index: number;
};

const Card: React.FC<Props> = ({ item, columnIndex, index }) => {
  const navigate = useNavigate();
  return (
    <>
      <Draggable
        key={item.id}
        isDragDisabled={columnIndex === 0 && true}
        draggableId={item.id}
        index={index}
      >
        {(provided, snapshot) => (
          <CardItem
            onClick={() => navigate(`/card/${item.id}`)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              backgroundColor: snapshot.isDragging ? "#ccc" : "#fff",
              ...provided.draggableProps.style,
            }}
          >
            <h4>{item.name}</h4>
            <p>{item.details}</p>
          </CardItem>
        )}
      </Draggable>
    </>
  );
};

export default Card;

const CardItem = styled.div`
  user-select: none;
  padding: 16px;
  margin: 0 0 8px 0;
  min-height: 50px;
`;
