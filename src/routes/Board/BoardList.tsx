import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { boardState, coinState, trashBinState } from "../../atoms";
import Board from "./Board";
import TrashBin from "./TrashBin";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  max-width: 850px;
  width: 100%;
  position: relative;
`;

const Title = styled.h1`
  margin: 30px 0px 30px;
  font-weight: 700;
  font-size: 30px;
  color: white;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
`;

function BoardList() {
  const [boards, setBoards] = useRecoilState(boardState);
  const [coins, setCoins] = useRecoilState(coinState);
  const [trashBin, setTrashBin] = useRecoilState(trashBinState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;

    if (!destination) return;

    if (source.droppableId === "boards") {
      setBoards((prev) => {
        const boardCopy = [...prev];
        const item = boardCopy.splice(source.index, 1)[0];
        boardCopy.splice(destination.index, 0, item);
        return boardCopy;
      });
    } else if (destination.droppableId === "trashcan") {
      setCoins((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    } else if (source.droppableId === destination?.droppableId) {
      setCoins((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const item = boardCopy.splice(source.index, 1)[0];
        boardCopy.splice(destination.index, 0, item);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination.droppableId !== source.droppableId) {
      setCoins((allBoards) => {
        const destinationCopy = [...allBoards[destination.droppableId]];
        const sourceCopy = [...allBoards[source.droppableId]];
        const item = sourceCopy.splice(source.index, 1)[0];
        destinationCopy.splice(destination.index, 0, item);
        return {
          ...allBoards,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: destinationCopy,
        };
      });
    }

    setTrashBin(false);
  };
  const onDragStart = ({ type }: DragStart) => {
    if (type === "coins") {
      setTrashBin(true);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Wrapper>
        <Title>나의 코인 보드</Title>
        <Droppable droppableId="boards" direction="horizontal" type="boards">
          {(provided, snapshot) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
              {boards.map((boardId, idx) => (
                <Board
                  key={idx}
                  index={idx}
                  boardId={boardId}
                  coins={coins[boardId]}
                ></Board>
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
      <TrashBin />
    </DragDropContext>
  );
}

export default BoardList;
