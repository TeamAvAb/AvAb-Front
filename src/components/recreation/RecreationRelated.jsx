import styled from "styled-components";
import React, { useState } from "react";
import RelatedRecreationBox from "./RelatedRecreationBox";
export default function RecreationRelated() {
  const hashtag = "#해시태그";
  const recreationTitle = "레크레이션 제목";
  const kewords = ["키워드1", "키워드2", "키워드3"];
  const starRate = 4.5;

  return (
    <RecreationReviewContainer>
      <TitleText>연관 레크레이션</TitleText>
      <SubText>해당 레크레이션과 함께 사용할 수 있어요!</SubText>
      <RelatedRecreationBox
        hashtag={hashtag}
        recreationTitle={recreationTitle}
        kewords={kewords}
        starRate={starRate}
      />
    </RecreationReviewContainer>
  );
}

const RecreationReviewContainer = styled.div`
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
  margin-bottom: 7px;
`;

const SubText = styled.div`
  color: #9fa4a9;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 31px;
  line-height: 30px;
`;
