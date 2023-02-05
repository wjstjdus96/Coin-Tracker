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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding-left: 50px;
  /* max-width: 850px; */
  width: 100%;
  /* position: relative; */
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 50px 10px 0px;
`;

const Title = styled.h1`
  margin: 30px 0px 30px;
  font-weight: 700;
  font-size: 30px;
  color: ${(props) => props.theme.textColor};
`;

const Boards = styled.div`
  display: flex;
  justify-content: baseline;
  align-items: center;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: ${(props) => props.theme.secondaryTextColor};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
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
  const [isDark, setIsDark] = useRecoilState(darkState);
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

  const onAddBoard = () => {
    setBoardModal((prev) => !prev);
  };

  const onChangeTheme = () => {
    setIsDark((prev) => !prev);
  };

  const closeModal = () => {
    setBoardModal(false);
  };

  useEffect(() => {
    console.log(boards);
    console.log(cards);
  }, [boards, cards]);

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {boardModal && <Overlay onClick={closeModal}></Overlay>}
      <Wrapper>
        <Nav>
          <Title>보드</Title>
          <Buttons>
            <Button onClick={onAddBoard}>
              <AiOutlineAppstoreAdd size="30" />
            </Button>
            <Button onClick={onChangeTheme}>
              {isDark ? <MdNightlight size="30" /> : <MdLightMode size="30" />}
            </Button>
          </Buttons>
        </Nav>
        {boardModal && <AddBoard />}
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
      </Wrapper>
      <TrashBin />
    </DragDropContext>
  );
}

export default BoardList;
