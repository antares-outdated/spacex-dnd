import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { Message } from "./components/Alert";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Past Launches",
    items: [],
  },
  [uuid()]: {
    name: "Launches",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "My Launches",
    items: [],
  },
};

const onDragEnd = ({ result, columns, setColumns }: any) => {
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [isOpen, setOpen] = useState(false);

  const handleDragEnd = (props: any) => {
    if (
      columns[props.result.destination.droppableId].name === "My Launches" ||
      !props.result.destination
    ) {
      return false;
    }

    if (
      columns[props.result.destination.droppableId].name === "Launches" &&
      columns[props.result.source.droppableId].name === "Past Launches"
    ) {
      if (window.confirm("Are you sure?")) {
        onDragEnd(props);

        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);

        return false;
      } else {
        return false;
      }
    }

    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);

    onDragEnd(props);
  };

  return (
    <>
      <Title>
        <h1>Explore to space</h1>
        <img src="/images/earth.png" width="30" alt="" />
      </Title>
      {isOpen && <Message text="Success" />}

      <Inner>
        <DragDropContext
          onDragEnd={(result) => handleDragEnd({ result, columns, setColumns })}
        >
          {Object.entries(columns).map(([columnId, column], columnIndex) => {
            return (
              <Column key={columnId}>
                <ColumnTitle>{column.name}</ColumnTitle>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <ColumnsBackground
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#3A3A3A"
                              : "lightgrey",
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                isDragDisabled={columnIndex === 2 && true}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "#ccc"
                                        : "#fff",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </Card>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </ColumnsBackground>
                      );
                    }}
                  </Droppable>
                </div>
              </Column>
            );
          })}
        </DragDropContext>
      </Inner>
    </>
  );
}

export default App;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;
const Card = styled.div`
  user-select: none;
  padding: 16px;
  margin: 0 0 8px 0;
  min-height: 50px;
`;

const ColumnsBackground = styled.div`
  padding: 4px;
  width: 250px;
  min-height: 600px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  img {
    margin-left: 10px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColumnTitle = styled.div`
  text-transform: uppercase;
`;
