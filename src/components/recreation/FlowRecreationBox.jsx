import React from "react";
import styled from "styled-components";

export default function FlowRecreationBox({
  index,
  recreationTitle,
  kewords,
  time,
}) {
  const kewordList = kewords.map((keyword) => (
    <KeywordBox keyword={keyword}>{keyword}</KeywordBox>
  ));
  const height = (time / 10) * 128;
  return (
    <FlowRecreationBoxWrap height={height}>
      <LeftTimeBar height={height}></LeftTimeBar>
      <div>
        <TitleBox>
          <NumCircle>{index}</NumCircle>
          <Title>{recreationTitle}</Title>
        </TitleBox>
        {kewordList}
        <TimeTextWrap>
          <PlayText>플레이까지</PlayText>
          <Time>{time}분</Time>
        </TimeTextWrap>
      </div>
    </FlowRecreationBoxWrap>
  );
}
const LeftTimeBar = styled.div`
  background-color: #b1beff;
  width: 8px;
  height: ${(props) => (props.height ? props.height + "px" : "128px")};
  border-radius: 50px;
  margin-right: 20px;
`;
const FlowRecreationBoxWrap = styled.div`
  display: flex;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0px 12px 0px;
`;

const NumCircle = styled.div`
  background-color: #b1beff;
  width: 42px;
  height: 42px;
  color: #1b1d1f;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;
const Title = styled.div`
  display: flex;
  width: 126px;
  height: 24px;
  flex-direction: column;
  justify-content: center;
  color: #1b1d1f;
  font-size: 20px;
  font-weight: 700;
`;
const KeywordBox = styled.div`
  border-radius: 5px;
  background: #e9ebed;
  padding: 5px 29px;
  text-align: center;
  display: inline-block;
  margin: 0px 17px 21px 0px;
`;
const TimeTextWrap = styled.div`
  display: flex;
`;
const PlayText = styled.div`
  color: #9fa4a9;
  font-size: 16px;
  font-weight: 400;
  margin-right: 21px;
`;
const Time = styled.div`
  color: #1b1d1f;
  font-size: 16px;
  font-weight: 600;
`;
