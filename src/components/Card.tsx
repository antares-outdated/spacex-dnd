import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Modal } from "./Modal";

const Card: React.FC<any> = ({ item, columnIndex, index }) => {
  const [isShowModal, setShowModal] = useState(false);

  console.log(item);

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
            onClick={() => setShowModal(!isShowModal)}
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
      {isShowModal && <Modal updateOpen={setShowModal} item={item} />}
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
