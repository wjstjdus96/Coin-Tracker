import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Wrapper = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: #a3a3d4;
`;

interface ICardProps {
  coinId: string;
  coinText: string;
  index: number;
}

function Card({ coinId, coinText, index }: ICardProps) {
  return (
    <Draggable draggableId={coinId} index={index} key={coinId}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {coinText}
        </Wrapper>
      )}
    </Draggable>
  );
}

export default Card;
