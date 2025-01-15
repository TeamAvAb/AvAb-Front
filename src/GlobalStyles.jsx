import { createGlobalStyle } from 'styled-components';
import Pretendard from './assets/font/Pretendard-Regular.woff';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Pretendard";
    src: local('Pretendard Regular') url(${Pretendard}) format("woff");
  }

  ${reset}
  :root {
    font-family: "Pretendard";
    color: ${({ theme }) => theme.color.grayscale01};
    ${({ theme }) => theme.text.paragraph}
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
`;

export default GlobalStyle;
