import styled from "styled-components";
import React, { forwardRef, useEffect, useState } from "react";
import FlowBox from "./FlowBox";
import axios from "axios";
const RecreationFlow = forwardRef(({ recreationId }, ref) => {
  const [flowData, setFlowData] = useState(null);
  const [flowFirstRecreations, setFlowFirstRecreations] = useState(null);
  const [flowSecondRecreations, setFlowSecondRecreations] = useState(null);

  useEffect(() => {
    const fetchFlows = async () => {
      try {
        const response = await axios.get(
          `https://dev.avab.shop/api/recreations/${recreationId}/related/flows`
        );
        setFlowData(response.data.result.flowDetail);
        setFlowFirstRecreations(response.data.result.flowDetail.recreations[0]);
        setFlowSecondRecreations(
          response.data.result.flowDetail.recreations[1]
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchFlows();
  }, [recreationId]);
  return (
    <RecreationFlowContainer ref={ref}>
      <TitleText>연관 플로우</TitleText>

      <SubText>해당 레크레이션과 관련된 플로우를 제공해드려요!</SubText>
      <FlowBoxWrap>
        <FlowBox
          num={1}
          marginRight="110px"
          flowRecreations={flowFirstRecreations}
        ></FlowBox>
        <FlowBox
          num={2}
          marginRight="0px"
          flowRecreations={flowSecondRecreations}
        ></FlowBox>
      </FlowBoxWrap>
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

const FlowBoxWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export default RecreationFlow;
