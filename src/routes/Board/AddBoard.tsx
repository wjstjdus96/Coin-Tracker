import { SetterOrUpdater, useRecoilState } from "recoil";
import { boardModalState, boardState } from "../../atoms";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  width: 300px;
  height: 200px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: lightgray;
  border-radius: 8px;
`;

const Button = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
`;

interface IForm {
  board: string;
}

function AddBoard() {
  const [boardModal, setBoardModal] = useRecoilState(boardModalState);
  const [boards, setBoards] = useRecoilState(boardState);
  const { register, handleSubmit } = useForm<IForm>();

  const closeModal = () => {
    setBoardModal(false);
  };

  const onValid = (data: any) => {
    setBoards((oldBoards) => [...oldBoards, data.board]);
    setBoardModal(false);
  };

  return (
    <Wrapper>
      <Button onClick={closeModal}>
        <IoClose />
      </Button>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          id="board"
          type="text"
          placeholder="보드 이름을 입력하세요"
          {...register("board")}
        />
        <button type="submit">생성</button>
      </form>
    </Wrapper>
  );
}

export default AddBoard;
