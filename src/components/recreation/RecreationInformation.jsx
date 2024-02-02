import styled from "styled-components";
import React from "react";
import peopleIcon from "../../assets/recreation/peopleIcon.svg";
import fixIcon from "../../assets/recreation/fixIcon.svg";
import genderIcon from "../../assets/recreation/genderIcon.svg";
import timeIcon from "../../assets/recreation/timeIcon.svg";
import recreationImage from "../../assets/recreation/RecreationImage.png";
export default function RecreationInformation() {
  const recreationContent =
    "수건돌리기는 여러 명이서 즐길 수 있는 한국의 전통 민속 놀이이다. 일부 지역에서는 수건 찾기라고도 한다. 주로 충분한 공간이 확보되는 야외에서 하나, 방만 넓다면 실내에서도 할 수 있다. 규칙도 간단하고 적당한 공간만 있으면 쉽게 할 수 있으며 사람들이 모여 있어서 통제하기 쉽고 그럼에도 운동량은 많은 특성상 교육 현장에서 무척이나 선호되는 놀이이다. 웬만한 사람이라면 어릴 적에 한 번쯤은 해보았을 놀이이며, 아마 지금도 많은 어린이 혹은 어른이들이 이 놀이를 하고 있을 것이다.";
  const recreationWay = [
    "수건이나 천을 준비한다.",
    "술래를 제외한 사람들은 마주 보고 둥그렇게 앉는다.",
    "술래는 수건을 들고 사람들의 등 뒤를 빙글빙글 돈다.",
    "술래는 빙글빙글 돌다가 적절한 타이밍에 다른 사람의 등 뒤에 수건을 놓는다.",
    "한 바퀴를 돌아 술래가 수건을 내려 놓은 사람에게 돌아온다면, 그 사람은 탈락이다.",
    "탈락되지 않으려면, 술래를 잡거나 술래에게 잡히지 않으면 된다.",
    "탈락자가 나올 때까지 게임을 진행한다.",
  ];

  const recreationWayList = recreationWay.map((way, index) => (
    <ContentText key={index}>
      {index + 1}. {way}
    </ContentText>
  ));
  return (
    <RecreationInformationContainer>
      <ContentBox>
        <TitleText>레크레이션 소개</TitleText>
        <ContentText>{recreationContent}</ContentText>
      </ContentBox>
      <ContentBox>
        <TitleText>레크레이션 목적</TitleText>
        <PurposeBox>신년회</PurposeBox>
      </ContentBox>
      <ContentBox>
        <RecreationImg src={recreationImage} />
        <TitleText>레크레이션 방법</TitleText>
        {recreationWayList}
      </ContentBox>
      <IconBox>
        <Circle>
          <img src={peopleIcon}></img>
          <CircleText>조별 추천 인원</CircleText>
          <CircleSubText>5~20명</CircleSubText>
        </Circle>
        <Circle>
          <img src={fixIcon}></img>
          <CircleText>준비물</CircleText>
          <CircleSubText>수건이나 천</CircleSubText>
        </Circle>
        <Circle>
          <img src={genderIcon}></img>
          <CircleText>성별</CircleText>
          <CircleSubText>여성, 남성</CircleSubText>
        </Circle>
        <Circle>
          <img src={timeIcon}></img>
          <CircleText>연령대</CircleText>
          <CircleSubText>10대, 20대, 30대</CircleSubText>
        </Circle>
      </IconBox>
    </RecreationInformationContainer>
  );
}

const RecreationInformationContainer = styled.div`
  background-color: white;
  padding: 40px 44px;
  border-radius: 20px;
  border: 0.5px solid #cacdd2;
  margin-bottom: 60px;
`;

const TitleText = styled.div`
  color: #1b1d1f;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 28px;
`;

const ContentText = styled.div`
  color: #1b1d1f;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
`;

const ContentBox = styled.div`
  border-bottom: #cacdd2 0.5px solid;
  padding-bottom: 28px;
  margin-bottom: 60px;
`;

const IconBox = styled.div`
  padding-bottom: 28px;
  display: flex;
  justify-content: space-between;
`;

const Circle = styled.div`
  width: 220px;
  height: 220px;
  background-color: #f7f8f9;
  border-radius: 50%;
  filter: drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.1));
  justify-content: center;
  display: flex;
  text-align: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
`;
const CircleText = styled.div`
  color: #5b6bbe;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 18px;
`;

const CircleSubText = styled.div`
  color: #9fa4a9;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
`;

const PurposeBox = styled.div`
  display: inline-flex;
  padding: 16px 34px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background: #a0ddff;
  color: #1b1d1f;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const RecreationImg = styled.img`
  margin-bottom: 60px;
`;
