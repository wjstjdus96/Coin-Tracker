import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ICoin } from "../../atoms";
import Card from "./Card";

const Wrapper = styled.div<IWrapper>`
  background-color: white;
  padding-top: 10px;
  border-radius: 9px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 5px 5px rgba(0, 0, 0, 0.1)" : "none"};
`;
const BoardTitle = styled.h2`
  text-align: center;
  font-weight: 500;
  margin-bottom: 10px;
`;
const Area = styled.div<IArea>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#b2bec3"
      : props.isDraggingFromthis
      ? "#dfe6e9 "
      : "transparent"};
  flex-grow: 1;
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
`;

interface IArea {
  isDraggingOver: boolean;
  isDraggingFromthis: boolean;
}

interface IWrapper {
  isDragging: boolean;
}

interface IBoardProps {
  boardId: string;
  coins: ICoin[];
  index: number;
}

function Board({ boardId, coins, index }: IBoardProps) {
  return (
    <Draggable draggableId={boardId} index={index} key={boardId}>
      {(provided, snapshot) => (
        <Wrapper
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <BoardTitle>{boardId}</BoardTitle>
          <Droppable droppableId={boardId} type="coins">
            {(provided, snapshot) => (
              <Area
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromthis={Boolean(snapshot.draggingFromThisWith)}
              >
                {coins.map((coin, idx) => (
                  <Card
                    coinId={coin.id + ""}
                    coinText={coin.text}
                    index={idx}
                  ></Card>
                ))}
                {provided.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default React.memo(Board);
