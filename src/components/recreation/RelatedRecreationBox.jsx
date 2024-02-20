import styled from "styled-components";
import React, { useState } from "react";
import RecreationContentBox from "./RecreationContentBox";
import { Link, useNavigate } from "react-router-dom";
export default function RelatedRecreationBox({
  hashtag,
  recreationTitle,
  kewords,
  starRate,
  relatedId,
}) {
  const navigate = useNavigate();
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

  const translatedKewords = kewords ? matchKeywords(kewords) : [];
  return (
    <RelatedRecreationContainer>
      <BoxWrap>
        <RecreationContentBox
          recreationId={relatedId}
          hashtag={hashtag}
          recreationTitle={recreationTitle}
          kewords={translatedKewords}
          starRate={starRate}
        />
      </BoxWrap>
      <DetailLinkButton
        to={"/recreation/detail/" + relatedId}
        onClick={() => {
          window.scrollTo(0, 0); // 페이지 이동 전에 스크롤을 맨 위로 이동
          navigate("/recreation/detail/" + relatedId);
        }}
      >
        상세 페이지 보러가기 {">"}
      </DetailLinkButton>
    </RelatedRecreationContainer>
  );
}

const RelatedRecreationContainer = styled.div`
  display: flex;
  border-radius: 20px;
  border: 0.5px solid #9fa4a9;
  margin-bottom: 20px;
`;
const BoxWrap = styled.div`
  display: flex;
  border-radius: 20px;
  padding: 30px 0px 30px 40px;
`;
const DetailLinkButton = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 0px 20px 20px 0px;
  background: #b1beff;
  border: none;
  cursor: pointer;
  color: #1b1d1f;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-left: auto;
  padding: 0px 82px;
`;
