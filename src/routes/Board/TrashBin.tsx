import { Droppable, Draggable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { trashBinState } from "../../atoms";
import { FaTrash } from "react-icons/fa";

const Wrapper = styled.div<{ isDraggingOver: boolean; trashBin: boolean }>`
  position: absolute;
  bottom: 80px;
  right: 100px;
  width: 100px;
  height: 100px;
  padding: 15px 0px;
  border-radius: 50%;
  background-color: white;
  box-shadow: ${(props) =>
    props.isDraggingOver ? "0px 10px 10px #a8add9" : "none"};
  display: flex;
  align-items: stretch;
  justify-content: center;
  visibility: ${(props) => (props.trashBin ? "visible" : "hidden")};
`;

const Icon = styled(FaTrash)<{ trashBin: boolean }>`
  position: absolute;
  bottom: 95px;
  right: 115px;
  visibility: ${(props) => (props.trashBin ? "visible" : "hidden")};
  color: ${(props) => props.theme.accentColor};
`;

function TrashBin() {
  const trashBin = useRecoilValue(trashBinState);
  return (
    <Droppable droppableId="trashcan" type="coins">
      {(provided, snapshot) => (
        <>
          <Wrapper
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            trashBin={trashBin}
          >
            {provided.placeholder}
          </Wrapper>
          <Icon trashBin={trashBin} size="70" />
        </>
      )}
    </Droppable>
  );
}

export default TrashBin;
