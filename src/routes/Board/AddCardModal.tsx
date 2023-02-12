import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import {
  boardModalState,
  boardState,
  cardModalState,
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
  background-color: ${(props) => props.theme.bgColor};
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
  padding: 30px 40px 0px;

  & > h2 {
    margin-bottom: 10px;
    font-weight: 700;
  }

  & > input {
    margin-bottom: 5px;
    border: solid 2px ${(props) => props.theme.buttonColor};
    border-radius: 5px;
    padding: 5px;
  }
`;

interface IForm {
  name: string;
  price: string;
  purchase: number;
}

interface IAddCard {
  boardId: string;
}

function AddCard({ boardId }: IAddCard) {
  const { register, handleSubmit } = useForm<IForm>();
  const setModal = useSetRecoilState(modalState);
  const setCardModal = useSetRecoilState(cardModalState);
  const setCards = useSetRecoilState(cardState);

  const closeModal = () => {
    setCardModal(false);
    setModal(false);
  };

  const onValid = (data: any) => {
    console.log(boardId);
    setCards((prev) => {
      const newCard = {
        id: Date.now(),
        name: data.name,
        price: data.price,
        purchase: data.purchase,
      };
      const cardCopy = prev[boardId];
      return { ...prev, [boardId]: cardCopy.concat(newCard) };
    });
    closeModal();
  };

  return (
    <Wrapper>
      <Button onClick={closeModal}>
        <IoClose />
      </Button>
      <Form onSubmit={handleSubmit(onValid)}>
        <h2>새 카드 생성</h2>
        <input id="name" placeholder="코인 이름" {...register("name")} />
        <input id="price" placeholder="코인 가격" {...register("price")} />
        <input
          id="purchase"
          placeholder="코인 개수"
          {...register("purchase")}
        />
        <button type="submit">생성</button>
      </Form>
    </Wrapper>
  );
}

export default AddCard;
