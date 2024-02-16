import styled from "styled-components";
import React, { useState } from "react";
import yellowStar from "../../assets/recreation/yellowStar.svg";
import { ReactComponent as Icon } from "../../assets/recreation/heartIcon.svg";
export default function RecreationContentBox({
  hashtag,
  recreationTitle,
  kewords,
  starRate,
  isFavorite,
}) {
  const kewordList = kewords.map((keyword) => (
    <KeywordBox keyword={keyword}>{keyword}</KeywordBox>
  ));
  const [isheartToggle, SetIsheartToggle] = useState(false);
  const onHandleScrap = () => {
    isheartToggle ? SetIsheartToggle(false) : SetIsheartToggle(true);
  };

  const heartIconColor = isheartToggle ? "#E54B4B" : "#E9EBED";
  return (
    <>
      <ContentBox>
        <HashTagBox>#{hashtag}</HashTagBox> {/* 해시태그 */}
        <HeartIconWrap onClick={onHandleScrap}>
          <Icon fill={heartIconColor} />
        </HeartIconWrap>
        <TitleStar>
          <RecreationTitle>{recreationTitle}</RecreationTitle>{" "}
          {/* 레크레이션 제목 */}
          <Star>
            <img src={yellowStar}></img> <StarRating>{starRate}</StarRating>
          </Star>
          {/* 별점*/}
        </TitleStar>
        {kewordList}
        {/* 키워드 */}
      </ContentBox>
    </>
  );
}

const ContentBox = styled.div`
  width: 378px;
`;

const HashTagBox = styled.div`
  background-color: #5b6bbe;
  color: white;
  border-radius: 50px;
  padding: 16px 35px;

  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: inline-block;
`;

const RecreationTitle = styled.div`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 21px 0px;
  display: inline-block;
`;
const HeartIconWrap = styled.div`
  float: right;
  margin-top: 5px;
  margin-right: 15px;
  cursor: pointer;
`;
const TitleStar = styled.div`
  display: flex;
`;
const Star = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 20px;
`;
const StarRating = styled.div`
  color: #26282b;
  font-size: 16px;
  font-weight: 400;
  margin-left: 4px;
`;
const KeywordBox = styled.div`
  border-radius: 5px;
  background: #e9ebed;
  padding: 5px 29px;
  text-align: center;
  display: inline-block;
  margin-right: 17px;
`;
