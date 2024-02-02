import { createGlobalStyle } from "styled-components";
import Pretendard from "./assets/font/Pretendard-Regular.woff";

const GlobalStyle = createGlobalStyle`
@font-face { 
  font-family: "Pretendard";
  src: url(${Pretendard}) format("woff");
}

* {
    font-family: 'Pretendard';
    margin: 0px;
}


`;

export default GlobalStyle;
