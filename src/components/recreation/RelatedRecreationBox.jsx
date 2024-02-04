import styled from "styled-components";
import React, { useState } from "react";
import RecreationContentBox from "./RecreationContentBox";
import { Link } from "react-router-dom";
export default function RelatedRecreationBox({
  hashtag,
  recreationTitle,
  kewords,
  starRate,
}) {
  return (
    <RelatedRecreationContainer>
      <BoxWrap>
        <RecreationContentBox
          hashtag={hashtag}
          recreationTitle={recreationTitle}
          kewords={kewords}
          starRate={starRate}
        />
      </BoxWrap>
      <DetailLinkButton>상세 페이지 보러가기 {">"}</DetailLinkButton>
    </RelatedRecreationContainer>
  );
}

const RelatedRecreationContainer = styled.div`
  display: flex;
  border-radius: 20px;
  border: 0.5px solid #9fa4a9;
`;
const BoxWrap = styled.div`
  display: flex;
  border-radius: 20px;
  padding: 30px 0px 30px 40px;
`;
const DetailLinkButton = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 0px 20px 20px 0px;
  background: #b1beff;
  border: none;
  cursor: pointer;
  color: #1b1d1f;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-left: auto;
  padding: 0px 82px;
`;
