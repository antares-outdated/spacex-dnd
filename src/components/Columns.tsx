import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Colors } from "../constants";
import { ColumnType } from "../types";
import { Card } from "./CardItem";
import { Skeleton } from "./Skeleton";

type Props = {
  columnId: string;
  column: ColumnType;
  columnIndex: number;
  loading: boolean;
};

export const Columns: React.FC<Props> = ({
  columnId,
  column,
  columnIndex,
  loading,
}) => {

  const handlerBackground = (index: number, isDraggingOver: boolean) => {
    if (!isDraggingOver) {
      return Colors.grey
    }

    if (index === 0) {
      return Colors.red
    }
    if (index === 1) {
      return Colors.yellow
    }
    if (index === 2) {
      return Colors.green
    }
  }

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
                  background: handlerBackground(columnIndex, snapshot.isDraggingOver)
                }}
              >
                {!loading ? (
                  column.items.map((item: ColumnType, index: number) => (
                    <Card
                      key={index}
                      item={item}
                      columnIndex={columnIndex}
                      index={index}
                    />
                  ))
                ) : (
                  <Skeleton />
                )}
                {provided.placeholder}
              </Column>
            );
          }}
        </Droppable>
      </Overflow>
    </Wrapper>
  );
};

const Column = styled.div`
  padding: 4px;
  width: 300px;
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
