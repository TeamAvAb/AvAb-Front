import styled from "styled-components";
import React, { useState } from "react";
import yellowStar from "../../assets/recreation/yellowStar.svg";
import greyStar from "../../assets/recreation/greyStar.svg";

export default function ReviewBox({
  starNum,
  nickname,
  date,
  review,
  like,
  dislike,
}) {
  const Stars = () => {
    for (let i = 1; i <= 5; i++) {
      if (i <= starNum) {
        <img src={yellowStar} alt="star" />;
      } else {
        <img src={greyStar} alt="star" />;
      }
    }
  };

  return (
    <>
      <ReviewStarstainer>
        <StarsWrap>{Stars}</StarsWrap>
      </ReviewStarstainer>
      <StarNum>{starNum}/5</StarNum>
    </>
  );
}

const ReviewStarstainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 20px;
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
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;
