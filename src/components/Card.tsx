import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card: React.FC<any> = ({ item, columnIndex, index }) => {
  return (
    <Draggable
      key={item.id}
      isDragDisabled={columnIndex === 2 && true}
      draggableId={item.id}
      index={index}
    >
      {(provided, snapshot) => (
        <CardItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            backgroundColor: snapshot.isDragging ? "#ccc" : "#fff",
            ...provided.draggableProps.style,
          }}
        >
          {item.content}
        </CardItem>
      )}
    </Draggable>
  );
};

export default Card;

const CardItem = styled.div`
  user-select: none;
  padding: 16px;
  margin: 0 0 8px 0;
  min-height: 50px;
`;
