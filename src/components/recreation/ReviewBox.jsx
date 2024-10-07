import styled from "styled-components";
import React, { useState } from "react";
import yellowStar from "../../assets/recreation/yellowStar.svg";
import greyStar from "../../assets/recreation/greyStar.svg";
import { ReactComponent as GoodIcon } from "../../assets/recreation/good.svg";
import { ReactComponent as BadIcon } from "../../assets/recreation/bad.svg";

export default function ReviewBox({
  reviewId,
  starNum,
  nickname,
  date,
  review,
  like,
  dislike,
  likeState,
  dislikeState,
  handleLikeClick,
  handleDislikeClick,
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

  const slice_date = date.substring(0, 10);

  return (
    <ReviewBoxWrap>
      <ReviewStarsContainer>
        <StarsWrap>{Stars()}</StarsWrap>
        <StarNum>{starNum}/5</StarNum>
      </ReviewStarsContainer>
      <NickNameDateBox>
        <NickName>{nickname}</NickName>
        <Date>{slice_date}</Date>
      </NickNameDateBox>
      <ReviewContent>{review}</ReviewContent>
      <NickNameDateBox>
        <LikeDislikeBox
          active={likeState}
          marginRight="40px"
          onClick={() => handleLikeClick(reviewId)}
        >
          <LikeDislikeIcon active={like} />
          {like}
        </LikeDislikeBox>
        <LikeDislikeBox
          active={dislikeState}
          onClick={() => handleDislikeClick(reviewId)}
        >
          <LikeDislikeIcon as={BadIcon} active={dislike} />
          {dislike}
        </LikeDislikeBox>
      </NickNameDateBox>
    </ReviewBoxWrap>
  );
}

const ReviewBoxWrap = styled.div`
  margin-bottom: 35px;
`;

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
const LikeDislikeIcon = styled(GoodIcon)`
  margin-right: 8px;
  fill: none;
  stroke: ${(props) => (props.active ? "#1b1d1f" : "#9fa4a9")};
  transition: stroke 0.3s;
`;

const LikeDislikeBox = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  border-radius: 50px;
  border: 0.5px solid ${(props) => (props.active ? "#1b1d1f" : "#9fa4a9")};
  padding: 14px 21px;
  color: ${(props) => (props.active ? "#1b1d1f" : "#9fa4a9")};
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  margin-right: ${(props) => props.marginRight || "0px"};
  transition: all 0.3s;
  justify-content: center;
`;
