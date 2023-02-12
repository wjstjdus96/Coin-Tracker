import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { MdNightlight, MdLightMode, MdHome } from "react-icons/md";
import { boardModalState, boardState, darkState, modalState } from "../atoms";
import { Link } from "react-router-dom";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 50px 10px 0px;
`;

const Title = styled.h1`
  margin: 30px 0px 30px;
  font-weight: 700;
  font-size: 30px;
  color: ${(props) => props.theme.textColor};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: ${(props) => props.theme.secondaryTextColor};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

function NavBar() {
  const [boardModal, setBoardModal] = useRecoilState(boardModalState);
  const [isDark, setIsDark] = useRecoilState(darkState);
  const [modal, setModal] = useRecoilState(modalState);
  const onAddBoard = () => {
    setBoardModal((prev) => !prev);
    setModal(true);
  };

  const onChangeTheme = () => {
    setIsDark((prev) => !prev);
  };
  return (
    <Nav>
      <Title>보드</Title>
      <Buttons>
        <Button onClick={onAddBoard}>
          <AiOutlineAppstoreAdd size="30" />
        </Button>
        <Button onClick={onChangeTheme}>
          {isDark ? <MdNightlight size="30" /> : <MdLightMode size="30" />}
        </Button>
        <Button>
          <Link to="/">
            <MdHome size="33" />
          </Link>
        </Button>
      </Buttons>
    </Nav>
  );
}

export default NavBar;
