import { SetterOrUpdater, useRecoilState } from "recoil";
import { boardModalState } from "../../atoms";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

interface IAddBoardProps {
  setModalOpen: SetterOrUpdater<boolean>;
}

const Wrapper = styled.div`
  width: 300px;
  height: 200px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: lightgray;
  border: 1px solid black;
  border-radius: 8px;
`;

const Button = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
`;

function AddBoard(setModalOpen: IAddBoardProps) {
  const [boardModal, setBoardModal] = useRecoilState(boardModalState);

  const closeModal = () => {
    setBoardModal(false);
  };

  return (
    <Wrapper>
      <Button onClick={closeModal}>
        <IoClose />
      </Button>
    </Wrapper>
  );
}

export default AddBoard;
