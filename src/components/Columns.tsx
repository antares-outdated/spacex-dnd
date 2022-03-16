import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "./Card";
import { Skeleton } from "./Skeleton";

const Columns: React.FC<any> = ({ columnId, column, columnIndex, loading }) => {
  return (
    <Wrapper key={columnId}>
      <ColumnTitle>{column.name}</ColumnTitle>
      <Overflow>
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <Column
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background:
                    columnIndex === 0 && snapshot.isDraggingOver
                      ? "#FF4D00"
                      : columnIndex === 1 && snapshot.isDraggingOver
                      ? "#FFD600"
                      : columnIndex === 2 && snapshot.isDraggingOver
                      ? "#00FFB2"
                      : "lightgrey",
                }}
              >
                {loading && <Skeleton />}
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
      </Overflow>
    </Wrapper>
  );
};

export default Columns;

const Column = styled.div`
  padding: 4px;
  width: 500px;
  min-height: 600px;
`;

const Overflow = styled.div`
  margin: 8px;
  height: 600px;

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
`;

const ColumnTitle = styled.div`
  text-transform: uppercase;
`;
