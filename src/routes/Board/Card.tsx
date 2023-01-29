import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Wrapper = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: #a3a3d4;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 5px 5px rgba(0, 0, 0, 0.1)" : "none"};
`;

interface ICardProps {
  coinId: string;
  coinText: string;
  index: number;
}

function Card({ coinId, coinText, index }: ICardProps) {
  return (
    <Draggable draggableId={coinId} index={index} key={coinId}>
      {(provided, snapshot) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {coinText}
        </Wrapper>
      )}
    </Draggable>
  );
}

export default Card;
