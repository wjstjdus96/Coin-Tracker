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
  coinState,
  darkState,
  trashBinState,
} from "../../atoms";
import Board from "./Board";
import TrashBin from "./TrashBin";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdNightlight, MdLightMode } from "react-icons/md";
import AddBoard from "./AddBoard";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding-left: 50px;
  /* max-width: 850px; */
  width: 100%;
  position: relative;
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

function BoardList() {
  const [boards, setBoards] = useRecoilState(boardState);
  const [coins, setCoins] = useRecoilState(coinState);
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

  const onAddBoard = () => {
    setBoardModal(true);
  };

  const onChangeTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Wrapper>
        <Nav>
          <Title>나의 코인 보드</Title>
          <Buttons>
            <Button onClick={onAddBoard}>
              <AiOutlineAppstoreAdd size="30" />
            </Button>
            <Button onClick={onChangeTheme}>
              {isDark ? <MdNightlight size="30" /> : <MdLightMode size="30" />}
            </Button>
          </Buttons>
        </Nav>
        {boardModal && <AddBoard setModalOpen={setBoardModal} />}
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
