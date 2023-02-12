import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Wrapper = styled.div<{ isDragging: boolean }>`
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 15px 15px;
  background-color: ${(props) => props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging
      ? "0px 0.4rem 0.6rem rgba(0, 0, 0, 0.3)"
      : "0 0.2rem 0.4rem rgba(0, 0, 0, 0.15);"};
  & > * {
  }
  & > div:first-child {
    border-bottom: 2px solid ${(props) => props.theme.bgColor};
    padding-bottom: 10px;
  }
  & > div:last-child {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    width: 100%;
  }
`;

interface ICardProps {
  coinId: string;
  index: number;
  coinName: string;
  coinPrice: string;
  coinPurchase: number;
}

function Card({
  index,
  coinId,
  coinName,
  coinPrice,
  coinPurchase,
}: ICardProps) {
  return (
    <Draggable draggableId={coinId} index={index} key={coinId}>
      {(provided, snapshot) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <div>{coinName}</div>
          <div>
            <div>$ {coinPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <div>{coinPurchase} coins</div>
          </div>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default Card;
