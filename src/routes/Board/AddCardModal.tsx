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
  padding: 50px 40px 0px;
`;

function AddCard() {
  const setModal = useSetRecoilState(modalState);
  const setCardModal = useSetRecoilState(cardModalState);

  const closeModal = () => {
    setCardModal(false);
    setModal(false);
  };

  return (
    <Wrapper>
      <Button onClick={closeModal}>
        <IoClose />
      </Button>
      <Form>
        <h2>새 카드 생성</h2>
      </Form>
    </Wrapper>
  );
}

export default AddCard;
