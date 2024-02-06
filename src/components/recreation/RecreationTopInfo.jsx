import styled from "styled-components";
import React from "react";
import recreationMainIllustration from "../../assets/recreation/recreationMainIllustration.png";
import RecreationContentBox from "./RecreationContentBox";
import viewIcon from "../../assets/recreation/viewIcon.svg";
export default function RecreationInfo() {
  const hashtag = "#해시태그";
  const recreationTitle = "레크레이션 제목";
  const kewords = ["키워드1", "키워드2", "키워드3"];
  const starRate = 4.5;

  return (
    <RecreationTopMenuContainer>
      <MainImage src={recreationMainIllustration}></MainImage>
      {/* 레크레이션 정보 */}
      <div>
        <RecreationContentBox
          hashtag={hashtag}
          recreationTitle={recreationTitle}
          kewords={kewords}
          starRate={starRate}
        />
        <ViewBox>
          <ViewIcon src={viewIcon} />
          <ViewText>2,232</ViewText>
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
  margin-top: 51px;
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
