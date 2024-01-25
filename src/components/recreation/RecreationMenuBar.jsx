import styled from "styled-components";
import React from "react";

export default function RecreationMenuBar() {
  const MenuBar = [
    { idx: 0, name: "상세정보" },
    { idx: 1, name: "리뷰 및 평가" },
    { idx: 2, name: "연관 레크레이션" },
  ];

  return <RecreationMenuBarContainer>상세정보</RecreationMenuBarContainer>;
}

const RecreationMenuBarContainer = styled.div`
  border-bottom: 0.5px solid #cacdd2;
  color: #1b1d1f;
  font-size: 24px;
  font-weight: 400;
  display: flex;
  align-items: center;
  padding: 19px 0px 19px 88px;
`;
