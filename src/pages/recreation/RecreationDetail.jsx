import React, { useRef } from "react";
import RecreationTopInfo from "../../components/recreation/RecreationTopInfo";
import RecreationMenuBar from "../../components/recreation/RecreationMenuBar";
import RecreationInformation from "../../components/recreation/RecreationInformation";
import RecreationReview from "../../components/recreation/RecreationReview";
import RecreationRelated from "../../components/recreation/RecreationRelated";
import RecreationFlow from "../../components/recreation/RecreationFlow";
import styled from "styled-components";
import Header from "../../components/Header";
export default function RecreationDetail() {
  const infoRef = useRef(null);
  const reviewRef = useRef(null);
  const relatedRef = useRef(null);
  const flowRef = useRef(null);
  const scrollRefs = useRef([infoRef, reviewRef, relatedRef, flowRef]);
  return (
    <>
      <FixedBox>
        <Header />
        <RecreationTopInfo /> {/* 상단 정보란 */}
        <RecreationMenuBar scrollRefs={scrollRefs} /> {/* 메뉴바 */}
      </FixedBox>
      <RecreationDetailContainer>
        <RecreationInformation ref={infoRef} />{" "}
        {/* 레크레이션 소개, 목적, 방법 */}
        <RecreationReview ref={reviewRef} /> {/* 리뷰 및 평가 */}
        <RecreationRelated ref={relatedRef} /> {/* 연관 레크레이션 */}
        <RecreationFlow ref={flowRef} /> {/* 연관 플로우 */}
      </RecreationDetailContainer>
    </>
  );
}

const RecreationDetailContainer = styled.div`
  background-color: #e9ebed;
  padding: 32px 89px 60px 89px;
  margin-top: 470px;
`;
const FixedBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: white;
`;
