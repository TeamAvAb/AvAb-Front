import styled from "styled-components";
import React from "react";

export default function RecreationReview() {
  return (
    <RecreationReviewContainer>
      <TitleText>리뷰 및 평가</TitleText>
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
  margin-bottom: 28px;
`;
