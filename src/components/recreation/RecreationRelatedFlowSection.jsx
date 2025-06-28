import styled from 'styled-components';
import React, { forwardRef, useEffect, useState } from 'react';
import FlowCard from './FlowCard';
import { publicAPI } from '../../apis/user';
import NoData from '../common/NoData';

const RecreationRelatedFlowSection = forwardRef(({ recreationId }, ref) => {
  const [relatedFlowsData, setRelatedFlowsData] = useState([]);

  useEffect(() => {
    const fetchFlows = async () => {
      try {
        const response = await publicAPI.get(`/api/recreations/${recreationId}/related/flows`);
        console.log('플로우: ', response.data);
        setRelatedFlowsData(response.data.result);
      } catch (error) {
        console.error('플로우 에러 발생', error);
      }
    };

    fetchFlows();
  }, [recreationId]);

  return (
    <RelatedFlowContainer ref={ref}>
      <TitleText>연관 플로우</TitleText>
      <SubText>해당 레크레이션과 관련된 플로우를 제공해드려요!</SubText>
      <FlowBoxWrap>
        {relatedFlowsData.length !== 0 ? (
          relatedFlowsData.map((flow, index) => (
            <FlowCard
              key={flow.flowDetail.id}
              index={index + 1}
              flowData={flow.flowDetail}
              flowRecreations={flow.recreations}
            />
          ))
        ) : (
          <NoData variant="relatedFlow" />
        )}
      </FlowBoxWrap>
    </RelatedFlowContainer>
  );
});

const RelatedFlowContainer = styled.div`
  background-color: ${({ theme }) => theme.color.main05};
  padding: 2.5rem;
  border-radius: 1.2rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleText = styled.h3`
  ${({ theme }) => theme.text.h4}
`;

const SubText = styled.div`
  color: ${({ theme }) => theme.color.grayscale04};
  ${({ theme }) => theme.text.paragraph};
  margin-bottom: 1rem;
`;

const FlowBoxWrap = styled.div`
  min-height: 25rem;
  display: flex;
  gap: 8.5rem;
  justify-content: center;
  align-items: center;
`;

export default RecreationRelatedFlowSection;
