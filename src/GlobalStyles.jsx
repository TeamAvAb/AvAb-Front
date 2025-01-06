import { createGlobalStyle } from 'styled-components';
import Pretendard from './assets/font/Pretendard-Regular.woff';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Pretendard";
    src: local('Pretendard Regular') url(${Pretendard}) format("woff");
  }

  ${reset}
  #root, #modal, button {
    font-family: "Pretendard";
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
    border: none;
  }
`;

export default GlobalStyle;
