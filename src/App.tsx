/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Message } from "./components/Alert";
import Columns from "./components/Columns";
import { columnsFn, columnsFromBackend } from "./constants";
import { useHttp } from "./hook/http.hook";
import { selectData } from "./redux/selectors";
import { onDragEnd } from "./utils/onDragEnd";

const App: React.FC = () => {
  const data = useSelector(selectData);
  const [isOpen, setOpen] = useState(false);
  const [isError, setError] = useState(false);
  const [cards, setCards] = useState([]);
  const [columns, setColumns] = useState(columnsFromBackend);

  console.log(data);

  const { request, loading } = useHttp();

  useEffect(() => {
    setColumns(columnsFn(cards));
  }, [cards]);

  const handleDragEnd = (props: any) => {
    if (
      columns[props.destination.droppableId].name === "Past Launches" ||
      !props.destination
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return false;
    }

    if (
      columns[props.destination.droppableId].name === "Launches" &&
      columns[props.source.droppableId].name === "My Launches"
    ) {
      if (!window.confirm("Are you sure?")) {
        return false;
      }
    }

    onDragEnd({ result: props, columns, setColumns });

    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  useEffect(() => {
    request("launches?limit=5").then((res) => {
      setCards(res.slice(0, 10));
    });
  }, []);

  return (
    <>
      <Title>
        <h1>Explore to space</h1>
        <img src="/images/earth.png" width="30" alt="" />
      </Title>

      <WorkSpace>
        <DragDropContext onDragEnd={handleDragEnd}>
          {Object.entries(columns).map(([columnId, column], index) => (
            <Columns
              key={columnId}
              columnId={columnId}
              loading={loading}
              column={column}
              columnIndex={index}
            />
          ))}
        </DragDropContext>
      </WorkSpace>
      {isError && <Message status={500} text="Locked for drag-n-drop!" />}
      {isOpen && <Message status={201} text="Success!" />}
    </>
  );
};

export default App;

const WorkSpace = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  height: 100%;
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
