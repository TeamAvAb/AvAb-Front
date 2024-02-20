import { createGlobalStyle } from "styled-components";
import Pretendard from "./assets/font/Pretendard-Regular.woff";
import PretendardSubset from "./assets/font/Pretendard-Bold.subset.woff";

const GlobalStyle = createGlobalStyle`
@font-face { 
  font-family: "Pretendard";
  src: local('Pretendard Regular') url(${Pretendard}) format("woff");
}
@font-face {
	font-family: 'Pretendard Bold';
	src: local('Pretendard Bold'), url(${PretendardSubset}) format('woff');
}

* {
    font-family: 'Pretendard';
    margin: 0px;
}


`;

export default GlobalStyle;
