import React, { useState } from "react";
import styled from "styled-components";
import blankImg from "../assets/watchflow/blank.png";
import Flow from "../components/flow/FlowBox.jsx";
import LeftButton from "../assets/watchflow/moveLeft.png";
import RightButton from "../assets/watchflow/moveRight.png";

export default function WatchFlow() {
  const [scrapColor, setScrapColor] = useState("#E9EBED");
  const scrapping = () => {
    scrapColor === "#E9EBED" ? setScrapColor("#FFAA29") : setScrapColor("#E9EBED");
  };

  return (
    <MyFlowWrap>
      {/* 플로우 왼쪽 메뉴바 */}
      <MyFlowMenuContainer>
        <MyFlowMenuTitle>일정플로우</MyFlowMenuTitle>
        <MyFlowMenuBox style={{ backgroundColor: "#B1BEFF", fontWeight: "bold" }}>플로우 구경하기</MyFlowMenuBox>
        <MyFlowMenuBox>내가 만든 일정플로우</MyFlowMenuBox>
        <MyFlowMenuBox>스크랩 일정 플로우</MyFlowMenuBox>
      </MyFlowMenuContainer>

      {/* 플로우 구경하기 */}
      <MyFlowContainer>
        <MyFlowBoxContainer>
          <MyFlowBoxImage src={blankImg} />
          <TitleBox>
            <MyFlowBoxTitle>일정플로우 만들기</MyFlowBoxTitle>
          </TitleBox>
        </MyFlowBoxContainer>

        {/* 플로우 데이터 불러온 부분 - Component */}
        <Flow />

        {/* 페이지번호 */}
        <PageNumberContainer>
          <ImageBox>
            <ButtonImage src={LeftButton} alt="왼쪽 버튼" />
          </ImageBox>
          <PageNumber style={{ marginLeft: "14px", backgroundColor: "#8896DF", borderRadius: "50%", color: "white" }}>
            1
          </PageNumber>
          <PageNumber>2</PageNumber>
          <PageNumber>3</PageNumber>
          <PageNumber>4</PageNumber>
          <PageNumber>5</PageNumber>
          <PageNumber>6</PageNumber>
          <PageNumber>7</PageNumber>
          <PageNumber style={{ marginRight: "14px" }}>8</PageNumber>
          <ImageBox>
            <ButtonImage src={RightButton} alt="오른쪽 버튼" />
          </ImageBox>
        </PageNumberContainer>
      </MyFlowContainer>
    </MyFlowWrap>
  );
}

const MyFlowWrap = styled.div`
  display: flex;
  background-color: #f7f8f9;
  width: 1536px;
  height: 1921px;
`;

// 일정플로우-구경하기 왼쪽메뉴바 > ~ MyFlowMenuBox
const MyFlowMenuContainer = styled.div`
  background-color: white;
  border: 0.5px solid #cacdd2;
  width: 320px;
  height: 1771px;
  font-size: 24px;
`;

const MyFlowMenuTitle = styled.div`
  padding: 2.5vh 0vh 2.5vh 3vh;
`;

const MyFlowMenuBox = styled.div`
  border-top: 0.5px solid #cacdd2;
  text-align: center;
  justify-content: center;
  padding: 1.5vh 3vh;
  cursor: pointer;
`;

const MyFlowContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: 1128px;
  height: 1771px;
  padding-top: 30px;
  padding-left: 126px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

// 일정플로우 만들기 부분
const MyFlowBoxContainer = styled.div`
  display: flex;
`;

const MyFlowBoxImage = styled.img`
  width: 199.65px;
  height: 199.65px;
  z-index: 2;
`;

const TitleBox = styled.div`
  position: absolute;
  left: 301px;
  top: 76px;
  background-color: #19297c;
  border-radius: 15vh;
  width: 527px;
  height: 109px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: pointer;

  &:hover {
    background-color: #4036ed;
    transition: 0.2s;
  }
`;

const MyFlowBoxTitle = styled.div`
  color: white;
  width: 343px;
  height: 57px;
  font-weight: bold;
  font-size: 47px;
`;

const PageNumberContainer = styled.div`
  display: flex;
  position: absolute;
  top: 1617px;
  left: 0;
  width: 100%;
  height: 42px;
  justify-content: center;
  align-items: center;
`;

const PageNumber = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 42px;
  height: 42px;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ImageBox = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 42px;
  height: 42px;
`;

const ButtonImage = styled.img`
  width: 42px;
  height: 42px;
  cursor: pointer;
`;
