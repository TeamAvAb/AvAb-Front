import styled from "styled-components";
import React, { forwardRef } from "react";

const RecreationFlow = forwardRef((props, ref) => {
  return (
    <RecreationFlowContainer ref={ref}>
      <TitleText>연관 플로우</TitleText>
      <SubText>해당 레크레이션과 관련된 플로우를 제공해드려요!</SubText>
    </RecreationFlowContainer>
  );
});

const RecreationFlowContainer = styled.div`
  background-color: white;
  padding: 40px 44px;
  border-radius: 20px;
  border: 0.5px solid #cacdd2;
  margin-bottom: 60px;
`;

const TitleText = styled.div`
  color: #1b1d1f;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 7px;
`;

const SubText = styled.div`
  color: #9fa4a9;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 31px;
  line-height: 30px;
`;

export default RecreationFlow;
