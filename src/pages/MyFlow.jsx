import React, { useState } from "react";
import styled from "styled-components";
import blankImg from "../assets/myflow/blank.png";
import LeftButton from "../assets/myflow/moveLeft.png";
import RightButton from "../assets/myflow/moveRight.png";
import MadeFlowBox from "../components/flow/MadeFlowBox";
import { useNavigate } from "react-router-dom";

export default function MyFlow() {
  const navigate = useNavigate();
  const moveToWatch = () => {
    navigate(`/flow/watch`);
  };

  // 내가 만든 일정플로우 개수에 따른 렌더링 화면 확인용
  const flowN = 1;

  return (
    <MyFlowWrap>
      {/* 플로우 왼쪽 메뉴바 */}
      <MyFlowMenuContainer>
        <MyFlowMenuTitle>일정플로우</MyFlowMenuTitle>
        <MyFlowMenuBox onClick={moveToWatch}>플로우 구경하기</MyFlowMenuBox>
        <MyFlowMenuBox style={{ backgroundColor: "#B1BEFF", fontWeight: "bold" }}>내가 만든 일정플로우</MyFlowMenuBox>
        <MyFlowMenuBox>스크랩 일정 플로우</MyFlowMenuBox>
      </MyFlowMenuContainer>

      {/* 내가 만든 일정플로우 - Title */}
      <MyFlowContainer>
        <MyFlowBoxContainer>
          <MyFlowBoxImage src={blankImg} />
          <TitleBox>
            <MyFlowBoxTitle>일정플로우 만들기</MyFlowBoxTitle>
          </TitleBox>
        </MyFlowBoxContainer>

        {/* 내가 만든 일정플로우 - Grid */}
        {flowN ? (
          <MadeFlowBox />
        ) : (
          <MyFlowNoneBox>
            <MyFlowNoneImg src={blankImg} />
            <MyFlowNoneDetail>
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>내가 만든 일정플로우가 없습니다!</div>
              <div style={{ fontSize: "20px", marginTop: "8px" }}>
                위의 버튼을 눌러 나만의 일정플로우를 만들어 보세요.
              </div>
            </MyFlowNoneDetail>
          </MyFlowNoneBox>
        )}

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
  height: 100%;
`;

// 일정플로우-구경하기 왼쪽메뉴바 > ~ MyFlowMenuBox
const MyFlowMenuContainer = styled.div`
  background-color: white;
  border: 0.5px solid #cacdd2;
  width: 320px;
  font-size: 24px;
`;

const MyFlowMenuTitle = styled.div`
  padding: 2.5vh 0vh 2.5vh 3vh;
`;

const MyFlowMenuBox = styled.div`
  border: 0.5px solid #cacdd2;
  border-right: 0px;
  border-left: 0px;
  text-align: center;
  justify-content: center;
  padding: 1.5vh 3vh;
  cursor: pointer;
`;

const MyFlowContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: 1128px;
  padding-top: 30px;
  padding-left: 126px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

// 내가 만든 일정 플로우 - Title
const MyFlowBoxContainer = styled.div`
  display: flex;
`;

const MyFlowBoxImage = styled.img`
  width: 199.65px;
  height: 199.65px;
  z-index: 2;
  position: absolute;
  top: 30px;
  left: 126px;
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

// 내가 만든 일정 플로우 - None
const MyFlowNoneBox = styled.div`
  width: 315px;
  top: 237px;
  margin-top: 237px;
  margin-left: 286.5px;
  text-align: center;
`;

const MyFlowNoneImg = styled.img`
  width: 120px;
  height: 120px;
`;

const MyFlowNoneDetail = styled.div`
  width: 315px;
  height: 85px;
  margin-top: 40px;
  text-align: center;
`;

// 페이지 번호
const PageNumberContainer = styled.div`
  display: flex;
  margin-top: 82px;
  margin-left: 186px;
  margin-bottom: 112px;
  height: 42px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 42px;
  height: 42px;
`;

const ButtonImage = styled.img`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0px 5px 10px rgba(27, 29, 31, 0.15));
  cursor: pointer;
`;
