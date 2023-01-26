import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ICoin } from "../../atoms";
import Card from "./Card";

const Wrapper = styled.div`
  background-color: white;
  padding-top: 10px;
  border-radius: 5px;
  min-height: 300px;

  display: flex;
  flex-direction: column;
`;
const BoardTitle = styled.h2`
  text-align: center;
  font-weight: 500;
  margin-bottom: 10px;
`;
const Area = styled.div``;

interface IBoardProps {
  boardId: string;
  coins: ICoin[];
}

function Board({ boardId, coins }: IBoardProps) {
  return (
    <Draggable draggableId={boardId} index={+boardId}>
      {(provided) => (
        <Wrapper
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <BoardTitle>{boardId}</BoardTitle>
          <Droppable droppableId={boardId}>
            {(provided, snapshot) => (
              <Area ref={provided.innerRef} {...provided.droppableProps}>
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

export default Board;
