import styled from "styled-components";
import React from "react";
import recreationMainIllustration from "../../assets/recreation/recreationMainIllustration.png";
import starIcon from "../../assets/recreation/mingcute_star-fill.svg";

export default function RecreationTopMenu() {
  const hashtag = "#해시태그";
  const recreationTitle = "레크레이션 제목";
  const kewords = ["키워드1", "키워드2", "키워드3"];
  const kewordList = kewords.map((keyword) => (
    <KeywordBox keyword={keyword}>{keyword}</KeywordBox>
  ));
  const StarRate = 4.5;

  return (
    <RecreationTopMenuContainer>
      <MainImage src={recreationMainIllustration}></MainImage>
      {/* 레크레이션 정보 */}
      <ContentBox>
        <HashTagBox>{hashtag}</HashTagBox> {/* 해시태그 */}
        <TitleStar>
          <RecreationTitle>{recreationTitle}</RecreationTitle>{" "}
          {/* 레크레이션 제목 */}
          <Star>
            <img src={starIcon}></img> <StarRating>{StarRate}</StarRating>
          </Star>
          {/* 별점*/}
        </TitleStar>
        {kewordList}
        {/* 키워드 */}
      </ContentBox>
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

const MainImage = styled.img`
  width: 250px;
  margin-left: 277px;
`;

const ContentBox = styled.div`
  margin-left: 250px;
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
