import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  boardModalState,
  boardState,
  cardState,
  modalState,
} from "../../atoms";
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
  box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.15);
`;

const Button = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Form = styled.form`
  padding: 50px 40px 0px;

  & > h2 {
    margin-bottom: 10px;
    font-weight: 700;
  }
  & > input {
    margin-bottom: 10px;
    border: solid 2px ${(props) => props.theme.buttonColor};
    border-radius: 5px;
    padding: 5px;
  }
  & > button {
    cursor: pointer;
    text-align: center;
    border: none;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 15px;
  }
`;

interface IForm {
  board: string;
}

function AddBoard() {
  const [boardModal, setBoardModal] = useRecoilState(boardModalState);
  const [boards, setBoards] = useRecoilState(boardState);
  const [cards, setCards] = useRecoilState(cardState);
  const setModal = useSetRecoilState(modalState);
  const { register, handleSubmit } = useForm<IForm>();

  const closeModal = () => {
    setBoardModal(false);
    setModal(false);
  };

  const onValid = (data: any) => {
    setCards((oldCards) => ({ ...oldCards, [data.board]: [] }));
    setBoards((oldBoards) => [...oldBoards, data.board]);
    closeModal();
  };

  return (
    <Wrapper>
      <Button onClick={closeModal}>
        <IoClose />
      </Button>
      <Form onSubmit={handleSubmit(onValid)}>
        <h2>새 보드 생성</h2>
        <input
          id="board"
          type="text"
          placeholder="보드 이름을 입력하세요"
          {...register("board")}
        />
        <button type="submit">생성</button>
      </Form>
    </Wrapper>
  );
}

export default AddBoard;
