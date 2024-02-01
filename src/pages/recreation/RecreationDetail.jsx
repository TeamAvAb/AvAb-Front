import React from "react";
import RecreationTopInfo from "../../components/recreation/RecreationTopInfo";
import RecreationMenuBar from "../../components/recreation/RecreationMenuBar";
import RecreationInformation from "../../components/recreation/RecreationInformation";
import RecreationReview from "../../components/recreation/RecreationReview";
import RecreationRelated from "../../components/recreation/RecreationRelated";
import RecreationFlow from "../../components/recreation/RecreationFlow";
import styled from "styled-components";

export default function RecreationDetail() {
  return (
    <>
      <RecreationTopInfo /> {/* 상단 정보란 */}
      <RecreationMenuBar /> {/* 메뉴바 */}
      <RecreationDetailContainer>
        <RecreationInformation /> {/* 레크레이션 소개, 목적, 방법 */}
        <RecreationReview /> {/* 리뷰 및 평가 */}
        <RecreationRelated /> {/* 연관 레크레이션 */}
        <RecreationFlow /> {/* 연관 플로우 */}
      </RecreationDetailContainer>
    </>
  );
}

const RecreationDetailContainer = styled.div`
  background-color: #e9ebed;
  padding: 32px 89px 60px 89px;
`;
