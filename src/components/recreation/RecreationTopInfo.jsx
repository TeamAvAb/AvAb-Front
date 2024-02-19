import styled from "styled-components";
import React, { useEffect, useState } from "react";
import RecreationContentBox from "./RecreationContentBox";
import viewIcon from "../../assets/recreation/viewIcon.svg";

export default function RecreationTopInfo({ recreationData }) {
  if (!recreationData || !recreationData.imageUrl) {
    return (
      <WarningMessage>
        잘못된 접근입니다. 해당 레크레이션이 존재하지 않습니다.
      </WarningMessage>
    );
  }
  const matchKeywords = (kewords) => {
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
    const matchedWords = kewords.map((keyword) => keywordMap[keyword]);
    return matchedWords.filter(Boolean);
  };

  const kewords = recreationData
    ? matchKeywords(recreationData.keywordList)
    : [];
  return (
    <RecreationTopMenuContainer>
      <MainImage src={recreationData.imageUrl}></MainImage>
      {/* 레크레이션 정보 */}
      <div>
        <RecreationContentBox
          hashtag={recreationData.hashTagList}
          recreationTitle={recreationData.title}
          kewords={kewords}
          starRate={recreationData.totalStars}
          isFavorite={recreationData.isFavorite}
        />
        <ViewBox>
          <ViewIcon src={viewIcon} />
          <ViewText>{recreationData.viewCount}</ViewText>
        </ViewBox>
      </div>
    </RecreationTopMenuContainer>
  );
}

const RecreationTopMenuContainer = styled.div`
  height: 403px;
  background-color: #a0ddff;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  align-items: center;
`;
const ViewBox = styled.div`
  margin: 51px 17px 0px 0px;
  display: flex;
  justify-content: end;
  align-items: center;
`;
const ViewIcon = styled.img`
  margin-right: 8px;
  float: right;
`;
const ViewText = styled.div`
  color: #26282b;
  text-align: right;
  font-size: 16px;
  font-weight: 400;
`;

const MainImage = styled.img`
  width: 250px;
  margin-left: 377px;
  margin-right: 251px;
`;

const WarningMessage = styled.div`
  color: #26282b;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  margin: 50px;
`;
