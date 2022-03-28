import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Columns } from "../components/Columns";
import { Message } from "../components/Message";
import { createColumns } from "../utils/createColumns";
import { useHttp } from "../hook/http.hook";
import { onDragEnd } from "../utils/onDragEnd";
import { RootState } from "../redux/store";
import { updateColumns } from "../redux/columns";

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.columns)
  const [isOpen, setOpen] = useState(false);
  const [isError, setError] = useState(false);

  const { request, loading } = useHttp();

  const handleDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      columns[result.destination.droppableId].status === "PAST"
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return false;
    }

    if (
      columns[result.destination.droppableId].status === "NOW" &&
      columns[result.source.droppableId].status === "MY"
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
    if (localStorage.getItem("spacex")) {
      const newColumns = JSON.parse(localStorage.getItem("spacex") || "{}");
      dispatch(updateColumns(newColumns));
    } else {
      request("launches?limit=5").then((result) => {
        dispatch(updateColumns(createColumns(result.slice(0, 10))));
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("spacex", JSON.stringify(columns));
  }, [columns]);

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
