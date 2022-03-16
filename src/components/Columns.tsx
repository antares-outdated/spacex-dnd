import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "./Card";

const Columns: React.FC<any> = ({ columnId, column, columnIndex }) => {
  return (
    <Wrapper key={columnId}>
      <ColumnTitle>{column.name}</ColumnTitle>
      <div style={{ margin: 8 }}>
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <Column
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? "#3A3A3A" : "lightgrey",
                }}
              >
                {column.items.map((item: any, index: any) => (
                  <Card
                    key={item.id}
                    item={item}
                    columnIndex={columnIndex}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </Column>
            );
          }}
        </Droppable>
      </div>
    </Wrapper>
  );
};

export default Columns;

const Column = styled.div`
  padding: 4px;
  width: 250px;
  min-height: 600px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColumnTitle = styled.div`
  text-transform: uppercase;
`;
