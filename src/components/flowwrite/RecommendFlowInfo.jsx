import React from "react";
import styled from "styled-components";

const keywordMap = {
  QUICKNESS: "순발력",
  SENSIBLE: "센스",
  COOPERATIVE: "창의력",
  ACTIVE: "협동",
  BRAIN: "액티브",
  PSYCHOLOGICAL: "두뇌",
  LUCK: "심리",
  COMMON_SENSE: "행운",
  PREPARATION: "상식",
};

export default function RecommendFlowInfo({ recreations }) {
  const mapKeywordsToKorean = (keywords) => {
    return keywords.map(keyword => keywordMap[keyword]).filter(Boolean);
  };

    return (
      <div>
        {recreations.map((recreation, index) => (
          <div key={index}  style={{ display: "flex"}}>
            <Line time={recreation.playTime}></Line>
            <InfoBox time={recreation.playTime}>
              {/* 레크레이션 제목 */}
              <RecreationTitle>
                <Number>{index + 1}</Number>
                <div style={{ fontSize: "20px", fontStyle: "normal", fontWeight: "700" }}>{recreation.title}</div>
              </RecreationTitle>
      
              {/* 레크레이션 키워드 */}
              {/* <KeywordBox>
                {recreation.keywordList && recreation.keywordList.map((keyword, keywordIndex) => (
                  <Keyword key={keywordIndex}>{keyword}</Keyword>
                ))}
              </KeywordBox> */}

              <KeywordBox>
              {recreation.keywordList && mapKeywordsToKorean(recreation.keywordList).map((keyword, keywordIndex) => (
                <Keyword key={keywordIndex}>{keyword}</Keyword>
              ))}
            </KeywordBox>
      
              {/* 레크레이션 소요 시간 */}
              <PlayTime>
                <div style={{ fontSize: "16px", fontStyle: "normal", fontWeight: "400", color: "#9FA4A9" }}>플레이까지</div>
                <div style={{ fontSize: "16px", fontStyle: "normal", fontWeight: "600" }}>{recreation.playTime}분</div>
              </PlayTime>
            </InfoBox>
          </div>
        ))}
      </div>
    );
  }  

const Line = styled.div`
  width: 0px;
  height: ${(props) => `${(props.time / 10) * 119.004}px`};
  border: 4px solid #b1beff;
  border-radius: 20px;
  margin-right: 21px;
  margin-bottom: 4px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 100%;
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
  max-width: 500px;
  flex-wrap: wrap;
`;

const Keyword = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 5px 18px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #e9ebed;
  width: 111px;
`;

const PlayTime = styled.div`
  display: flex;
  gap: 21px;
`;
