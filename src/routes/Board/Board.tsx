import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
  boardState,
  cardModalState,
  cardState,
  ICoin,
  modalState,
} from "../../atoms";
import Card from "./Card";
import { FaRegPlusSquare, FaRegWindowClose } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TbPlus } from "react-icons/tb";
import { useRecoilState, useSetRecoilState } from "recoil";
import AddCardModal from "./AddCardModal";

const Wrapper = styled.div<IWrapper>`
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 10px;
  margin-right: 40px;
  border-radius: 15px;
  width: 400px;
  min-height: 250px;
  max-height: 590px;
  display: flex;
  flex-direction: column;
  box-shadow: ${(props) =>
    props.isDragging
      ? "0px 5px 5px rgba(0, 0, 0, 0.1)"
      : "0 0.3rem 0.6rem rgba(0, 0, 0, 0.15);"};
`;

const BoardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 40px;
`;

const BoardTitle = styled.h2`
  padding-left: 20px;
  font-weight: 700;
  font-size: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
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
  cursor: pointer;
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

const PriceDiv = styled.div`
  height: 65px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 0 0 15px 15px;
  box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;

  & > input {
    border: none;
    font-weight: 600;
    font-size: 17px;
    padding-left: 20px;
  }
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
  cards: ICoin[];
  index: number;
}

function Board({ boardId, cards, index }: IBoardProps) {
  const [boards, setBoards] = useRecoilState(boardState);
  const [allCards, setAllCards] = useRecoilState(cardState);
  const [cardModal, setCardModal] = useRecoilState(cardModalState);
  const setModal = useSetRecoilState(modalState);
  const [price, setPrice] = useState<string>();
  const AddCard = () => {
    setCardModal(true);
    setModal(true);
    console.log(boardId);
  };
  const DeleteBoard = () => {
    setBoards((allBoards) => {
      const boardsCopy = [...allBoards];
      const boardIndex = boardsCopy.findIndex((item) => item == boardId);
      boardsCopy.splice(boardIndex, 1);
      return boardsCopy;
    });
  };
  const changeTitle = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setBoards((allBoards) => {
      const newBoards = [...allBoards];
      newBoards.splice(index, 1, value);
      return newBoards;
    });
  };
  const calculatePrice = () => {
    var acc = 0;
    cards.map((item) => {
      acc += Number(item.price) * item.purchase;
    });
    setPrice("Total : $ " + String(acc).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  };

  useEffect(() => {
    calculatePrice();
    console.log(allCards);
  }, [cards]);

  return (
    <Draggable draggableId={boardId} index={index} key={boardId}>
      {(provided, snapshot) => (
        <Wrapper
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {cardModal && <AddCardModal boardId={boardId} />}
          <BoardHeader>
            {/* <BoardTitle
              onChange={changeTitle}
              value={boards[index]}
            ></BoardTitle> */}
            <BoardTitle>{boardId}</BoardTitle>
            <ButtonWrapper>
              <Button onClick={AddCard}>
                <TbPlus size="20" />
              </Button>
              <Button onClick={DeleteBoard}>
                <IoClose size="20" />
              </Button>
            </ButtonWrapper>
          </BoardHeader>
          <Droppable droppableId={boardId} type="cards">
            {(provided, snapshot) => (
              <Area
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromthis={Boolean(snapshot.draggingFromThisWith)}
              >
                {cards.map((coin, idx) => (
                  <Card
                    coinId={coin.id + ""}
                    coinName={coin.name}
                    index={idx}
                    coinPrice={coin.price}
                    coinPurchase={coin.purchase}
                  ></Card>
                ))}
                {provided.placeholder}
              </Area>
            )}
          </Droppable>
          <PriceDiv>
            <input value={price || ""} disabled />
          </PriceDiv>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default React.memo(Board);
