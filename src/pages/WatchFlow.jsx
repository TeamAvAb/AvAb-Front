import React from "react";
import styled from "styled-components";
import blankImg from "../assets/watchflow/blank.png";
import Flow from "../components/flow/FlowBox.jsx";
import LeftButton from "../assets/watchflow/moveLeft.png";
import RightButton from "../assets/watchflow/moveRight.png";
import { useNavigate } from "react-router-dom";

export default function WatchFlow() {
  const navigate = useNavigate();
  const moveToMy = () => {
    navigate(`/flow/my`);
  };
  const moveToScrap = () => {
    navigate(`/flow/scrap`);
  };
  const moveToMakeFlow = () => {
    navigate(`/flow/write`);
  };

  return (
    <MyFlowWrap>
      {/* 플로우 왼쪽 메뉴바 */}
      <MyFlowMenuContainer>
        <MyFlowMenuTitle>일정플로우</MyFlowMenuTitle>
        <MyFlowMenuBox style={{ backgroundColor: "#B1BEFF", fontWeight: "bold" }}>플로우 구경하기</MyFlowMenuBox>
        <MyFlowMenuBox onClick={moveToMy}>내가 만든 일정플로우</MyFlowMenuBox>
        <MyFlowMenuBox onClick={moveToScrap}>스크랩 일정 플로우</MyFlowMenuBox>
      </MyFlowMenuContainer>

      {/* 플로우 구경하기 */}
      <MyFlowContainer>
        <MyFlowBoxContainer>
          <MyFlowBoxImage src={blankImg} />
          <TitleBox>
            <MyFlowBoxTitle onClick={moveToMakeFlow}>일정플로우 만들기</MyFlowBoxTitle>
          </TitleBox>
        </MyFlowBoxContainer>

        {/* 플로우 데이터 불러온 부분 - Component */}
        <WatchFlowBoxParent>
          <Flow />
          <Flow />
          <Flow />
        </WatchFlowBoxParent>

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
      <RightSide />
    </MyFlowWrap>
  );
}

const MyFlowWrap = styled.div`
  display: flex;
  background-color: #f7f8f9;
`;

const RightSide = styled.div`
  width: 5.7325%;
  background-color: #f7f8f9;
`;

// 일정플로우-구경하기 왼쪽메뉴바 > ~ MyFlowMenuBox
const MyFlowMenuContainer = styled.div`
  box-sizing: border-box;
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
  text-align: center;
  justify-content: center;
  padding: 1.5vh 3vh;
  cursor: pointer;
`;

const MyFlowContainer = styled.div`
  background-color: white;
  padding-top: 30px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  border-right: 0.5px solid #cacdd2;
`;

// 일정플로우 만들기 부분
const MyFlowBoxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MyFlowBoxImage = styled.img`
  width: 199.65px;
  height: 199.65px;
  z-index: 2;
`;

const TitleBox = styled.div`
  background-color: #19297c;
  border-radius: 15vh;
  width: 527px;
  height: 109px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: relative;
  left: -23.65px;
  cursor: pointer;

  &:hover {
    background-color: #4036ed;
    transition: 0.2s;
  }
`;

// 플로우 박스 - Grid
const WatchFlowBoxParent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 370px);
  row-gap: 20px;
  column-gap: 120px;
  margin-top: 31px;
`;

const MyFlowBoxTitle = styled.div`
  color: white;
  width: 343px;
  height: 57px;
  font-weight: bold;
  font-size: 47px;
`;

// 페이지 번호
const PageNumberContainer = styled.div`
  display: flex;
  margin-top: 82px;
  margin-bottom: 113px;
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
