import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ICoin } from "../../atoms";
import Card from "./Card";
import { FaRegPlusSquare, FaRegWindowClose } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TbPlus } from "react-icons/tb";

const Wrapper = styled.div<IWrapper>`
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 10px;
  margin-right: 40px;
  border-radius: 15px;
  width: 400px;
  min-height: 500px;
  max-height: 50%;
  display: flex;
  flex-direction: column;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 5px 5px rgba(0, 0, 0, 0.1)" : "none"};
`;

const BoardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 10px;
`;

const BoardTitle = styled.h2`
  padding-left: 20px;
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  width: 70px;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
`;

const Button = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.buttonColor};
  border-radius: 20%;
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
          <BoardHeader>
            <BoardTitle>{boardId}</BoardTitle>
            <ButtonWrapper>
              <Button>
                <TbPlus size="19" />
              </Button>
              <Button>
                <IoClose size="20" />
              </Button>
            </ButtonWrapper>
          </BoardHeader>
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
