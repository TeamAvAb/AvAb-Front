import styled from "styled-components";
import React, {useState} from "react";
import yellowStar from "../../assets/recreation/yellowStar.svg";
import greyStar from "../../assets/recreation/greyStar.svg";
import ReviewStars from "./ReviewStars";
export default function RecreationReview() {
  const reviewNum = 17;

  return (
    <RecreationReviewContainer>
      <TitleText>리뷰 및 평가 ({reviewNum})</TitleText>
      <StarBox>
      <SelectStar>별점을 선택해주세요</SelectStar>
      <ReviewStars></ReviewStars>
      </StarBox>
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
  margin-bottom: 13px;
`;

const StarBox = styled.div`
  display: flex;
`


const SelectStar = styled.div`
color: #9FA4A9;
font-size: 20px;
font-weight: 400;
line-height: 30px; 
`;
