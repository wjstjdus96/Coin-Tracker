import { Droppable, Draggable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { trashBinState } from "../../atoms";

const Wrapper = styled.div``;

function TrashBin() {
  const trashBin = useRecoilValue(trashBinState);
  return (
    <Droppable droppableId="trashcan">
      {(provided) => <Wrapper>{trashBin && <span>쓰레기통</span>}</Wrapper>}
    </Droppable>
  );
}

export default TrashBin;
