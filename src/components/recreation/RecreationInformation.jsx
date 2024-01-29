import styled from "styled-components";
import React from "react";

export default function RecreationInformation() {
  const recreationContent =
    "수건돌리기는 여러 명이서 즐길 수 있는 한국의 전통 민속 놀이이다. 일부 지역에서는 수건 찾기라고도 한다. 주로 충분한 공간이 확보되는 야외에서 하나, 방만 넓다면 실내에서도 할 수 있다. 규칙도 간단하고 적당한 공간만 있으면 쉽게 할 수 있으며 사람들이 모여 있어서 통제하기 쉽고 그럼에도 운동량은 많은 특성상 교육 현장에서 무척이나 선호되는 놀이이다. 웬만한 사람이라면 어릴 적에 한 번쯤은 해보았을 놀이이며, 아마 지금도 많은 어린이 혹은 어른이들이 이 놀이를 하고 있을 것이다.";

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
      <TitleText>레크레이션 방법</TitleText>
      <ContentText></ContentText>
      <ContentText></ContentText>
    </RecreationInformationContainer>
  );
}

const RecreationInformationContainer = styled.div`
  background-color: white;
  padding: 40px 44px;
  border-radius: 20px;
  border: 0.5px solid #cacdd2;
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
  margin-bottom: 28px;
`;

const ContentBox = styled.div`
  border-bottom: #cacdd2 0.5px solid;
  margin-bottom: 60px;
`;

const PurposeBox = styled.div`
  margin-bottom: 28px;
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
