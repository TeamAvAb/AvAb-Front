import styled from "styled-components";
import React, { useState } from "react";
import yellowStar from "../../assets/recreation/yellowStar.svg";
import greyStar from "../../assets/recreation/greyStar.svg";
import good from "../../assets/recreation/good.svg";
import bad from "../../assets/recreation/bad.svg";

export default function ReviewBox({
  starNum,
  nickname,
  date,
  review,
  like,
  dislike,
}) {
  const Stars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= starNum) {
        stars.push(<img key={i} src={yellowStar} alt="star" />);
      } else {
        stars.push(<img key={i} src={greyStar} alt="star" />);
      }
    }
    return stars;
  };

  return (
    <>
      <ReviewStarsContainer>
        <StarsWrap>{Stars()}</StarsWrap>
        <StarNum>{starNum}/5</StarNum>
      </ReviewStarsContainer>
      <NickNameDateBox>
        <NickName>{nickname}</NickName>
        <Date>{date}</Date>
      </NickNameDateBox>
      <ReviewContent>{review}</ReviewContent>
      <NickNameDateBox>
        <LikeDislikeBox marginRight="0px">
          <LikeDislikeIcon src={good} alt="good" />
          10
        </LikeDislikeBox>
        <LikeDislikeBox>
          <LikeDislikeIcon src={bad} alt="good" />
          10
        </LikeDislikeBox>
      </NickNameDateBox>
    </>
  );
}

const ReviewStarsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const StarsWrap = styled.div`
  width: 112px;
  display: flex;
  justify-content: space-between;
`;

const StarNum = styled.div`
  display: flex;
  align-items: center;
  color: #26282b;
  font-size: 16px;
  font-weight: 400;
  align-items: center;
  margin-left: 12px;
`;
const NickNameDateBox = styled.div`
  display: flex;
  align-items: center;
`;
const NickName = styled.div`
  width: fit-content;
  color: var(--gray-scale-464-c-52, #464c52);
  font-size: 20px;
  font-weight: 700;
  padding-right: 13px;
  margin-right: 13px;
  border-right: #464c52 0.25px solid;
`;
const Date = styled.div`
  color: #9fa4a9;
  font-size: 16px;
  font-weight: 400;
`;
const ReviewContent = styled.div`
  margin: 17px 0px;
  color: #1b1d1f;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
`;

const LikeDislikeIcon = styled.img`
  margin-right: 8px;
`;

const LikeDislikeBox = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  border-radius: 50px;
  border: 0.5px solid #9fa4a9;
  padding: 14px 21px;
  align-items: flex-start;
  color: #9fa4a9;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  margin-right: ${(props) => props.marginRight || "0px"};
`;
