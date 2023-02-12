import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { useEffect } from "react";
import { lightTheme, darkTheme } from "./theme";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  boardModalState,
  cardModalState,
  darkState,
  modalState,
} from "./atoms";
import Nav from "./routes/NavBar";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
//add
*{
  box-sizing: border-box;
}
body{
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  /* color:${(props) => props.theme.textColor}; */
  color: black;
  line-height: 1.2;
}
a{
  text-decoration: none;
  color: inherit;
}`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding-left: 50px;
  /* max-width: 850px; */
  width: 100%;
  /* position: relative; */
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const isDark = useRecoilValue(darkState);
  const [modal, setModal] = useRecoilState(modalState);
  const setBoardModal = useSetRecoilState(boardModalState);
  const setCardModal = useSetRecoilState(cardModalState);

  const closeModal = () => {
    setModal(false);
    setBoardModal(false);
    setCardModal(false);
  };

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        {modal && <Overlay onClick={closeModal}></Overlay>}
        <Wrapper>
          <Router />
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
