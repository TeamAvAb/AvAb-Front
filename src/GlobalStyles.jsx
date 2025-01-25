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

  :root {
    color: ${({ theme }) => theme.color.grayscale01};
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
`;

export default GlobalStyle;
