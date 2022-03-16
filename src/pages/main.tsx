import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Columns from "../components/Columns";
import { Message } from "../components/Message";
import { columnsServer } from "../constants";
import { useHttp } from "../hook/http.hook";
import { updateColumns } from "../redux/actions";
import { selectData } from "../redux/selectors";
import { onDragEnd } from "../utils/onDragEnd";

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const columns = useSelector(selectData);
  const [isOpen, setOpen] = useState(false);
  const [isError, setError] = useState(false);

  const { request, loading } = useHttp();

  const handleDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      columns[result.destination.droppableId].name === "Past Launches"
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return false;
    }

    if (
      columns[result.destination.droppableId].name === "Launches" &&
      columns[result.source.droppableId].name === "My Launches"
    ) {
      if (!window.confirm("Are you sure?")) {
        return false;
      }
    }

    onDragEnd({ result, columns, updateColumns, dispatch });

    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  useEffect(() => {
    request("launches?limit=5").then((result) => {
      dispatch(updateColumns(columnsServer(result)));
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
