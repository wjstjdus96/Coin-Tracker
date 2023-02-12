import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  boardModalState,
  boardState,
  cardState,
  darkState,
  trashBinState,
} from "../../atoms";
import Board from "./Board";
import TrashBin from "./TrashBin";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdNightlight, MdLightMode } from "react-icons/md";
import AddBoard from "./AddBoard";
import { useEffect } from "react";
import NavBar from "../NavBar";

const Boards = styled.div`
  display: flex;
  justify-content: baseline;
  align-items: flex-start;
  width: 100%;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function BoardList() {
  const [boards, setBoards] = useRecoilState(boardState);
  const [cards, setCards] = useRecoilState(cardState);
  const [trashBin, setTrashBin] = useRecoilState(trashBinState);
  const [boardModal, setBoardModal] = useRecoilState(boardModalState);
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
      setCards((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    } else if (source.droppableId === destination?.droppableId) {
      setCards((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const item = boardCopy.splice(source.index, 1)[0];
        boardCopy.splice(destination.index, 0, item);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination.droppableId !== source.droppableId) {
      setCards((allBoards) => {
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
    if (type === "cards") {
      setTrashBin(true);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <>
        {boardModal && <AddBoard />}
        <NavBar />
        <Droppable droppableId="boards" direction="horizontal" type="boards">
          {(provided, snapshot) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
              {boards.map((boardId, idx) => (
                <Board
                  key={idx}
                  index={idx}
                  boardId={boardId}
                  cards={cards[boardId]}
                ></Board>
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
      </>
      <TrashBin />
    </DragDropContext>
  );
}

export default BoardList;
