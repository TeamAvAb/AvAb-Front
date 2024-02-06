import React from "react";
import styled from "styled-components";
import FlowRecreationBox from "./FlowRecreationBox";
export default function FlowBox({ num, marginRight }) {
  const kewords = ["키워드1", "키워드2", "키워드3"];
  return (
    <FlowBoxWrap marginRight={marginRight}>
      <TitleWrap>
        <NumberBox>{num}안</NumberBox>
        <FlowTitle>플로우 제목</FlowTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
        >
          <path
            d="M11.75 35.0624V35.0618V9.74991C11.75 8.94892 12.0613 8.18403 12.6102 7.62267C13.1585 7.06187 13.8986 6.75 14.6667 6.75H29.3333C30.1014 6.75 30.8415 7.06187 31.3898 7.62267C31.9387 8.18404 32.25 8.94892 32.25 9.74991V35.0618V35.0624C32.25 35.0981 32.2409 35.1323 32.2247 35.1615C32.2085 35.1906 32.1863 35.2128 32.162 35.2276C32.1378 35.2423 32.1116 35.2495 32.0859 35.25C32.0602 35.2504 32.034 35.2441 32.0096 35.2304L32.0088 35.23L22.3655 29.8489L22 29.645L21.6345 29.8489L11.9912 35.23L11.9904 35.2304C11.966 35.2441 11.9398 35.2504 11.9141 35.25C11.8884 35.2495 11.8622 35.2423 11.838 35.2276C11.8137 35.2128 11.7915 35.1906 11.7753 35.1615C11.7591 35.1323 11.75 35.0981 11.75 35.0624Z"
            fill="#E9EBED"
            stroke="#1B1D1F"
            stroke-width="1.5"
          />
        </svg>
      </TitleWrap>
      <FlowRecreationBox
        index={1}
        recreationTitle={"레크레이션 제목"}
        kewords={kewords}
        time={10}
      ></FlowRecreationBox>
    </FlowBoxWrap>
  );
}

const FlowBoxWrap = styled.div`
  border-radius: 20px;
  border: 0.5px solid #9fa4a9;
  padding: 30px 34px;
  margin-right: ${(props) => props.marginRight || "0px"};
`;
const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
`;
const FlowTitle = styled.div`
  color: #1b1d1f;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin: 0px 150px 0px 85px;
`;

const NumberBox = styled.div`
  display: inline-flex;
  width: 30px;
  height: 29px;
  padding: 2px 31px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 0.5px solid #1b1d1f;
`;
