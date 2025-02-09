import { createGlobalStyle } from 'styled-components';
import Pretendard from './assets/font/Pretendard-Regular.woff';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Pretendard";
    src: local('Pretendard Regular') url(${Pretendard}) format("woff");
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ${reset}
  :root {
    font-family: "Pretendard", sans-serif;
    color: ${({ theme }) => theme.color.grayscale01};
  }

  :root {
    color: ${({ theme }) => theme.color.grayscale01};
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-family: inherit;
  }
`;

export default GlobalStyle;
