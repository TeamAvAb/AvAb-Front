import React from "react";
import styled from "styled-components";

export default function RecreationInfo({ time, num }) {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "end",marginBottom:'8px'}}>
      <Line time={time}></Line>
      <InfoBox time={time}>
        {/* 레크레이션 제목 */}
        <RecreationTitle>
          <Number>{num}</Number>
          <div style={{ fontSize: "20px", fontStyle: "normal", fontWeight: "700" }}>레크레이션 제목</div>
        </RecreationTitle>

        {/* 레크레이션 키워드 */}
        <KeywordBox>
          <Keyword>키워드 1</Keyword>
          <Keyword>키워드 2</Keyword>
          <Keyword>키워드 3</Keyword>
        </KeywordBox>

        {/* 레크레이션 소요 시간 */}
        <PlayTime>
          <div style={{ fontSize: "16px", fontStyle: "normal", fontWeight: "400", color: "#9FA4A9" }}>플레이까지</div>
          <div style={{ fontSize: "16px", fontStyle: "normal", fontWeight: "600" }}>{time}분</div>
        </PlayTime>
      </InfoBox>
    </div>
  );
}

const Line = styled.div`
  width: 0px;
  height: ${(props) => `${(props.time / 10) * 119.004}px`};
  border: 8px solid #b1beff;
  border-radius: 20px;
  margin-right: 21px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  top: ${(props) => `${-(props.time / 10 - 1) * 119.04}px`};
`;

const RecreationTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const Number = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b1beff;
  border-radius: 50%;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin-right: 8px;
`;

const KeywordBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 17px;
  margin-bottom: 21px;
`;

const Keyword = styled.div`
  display: flex;
  padding: 5px 29px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #e9ebed;
`;

const PlayTime = styled.div`
  display: flex;
  gap: 21px;
`;
