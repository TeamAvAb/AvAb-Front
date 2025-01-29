import React from 'react';
import styled from 'styled-components';
import FlowRecreation from './FlowRecreation';
import ScrapBtn from '../button/ScrapBtn';

export default function FlowCard({ index, flowData, flowRecreations }) {
  return (
    <FlowCardContainer>
      <TitleWrap>
        <NumberBox>{index}안</NumberBox>
        <FlowTitle>{flowData?.title}</FlowTitle>
        <ScrapButton flowId={flowData.id} isScrap={flowData.isFavorite} />
      </TitleWrap>
      <RecreationList>
        {flowRecreations.map((recreations, index) => (
          <FlowRecreation
            key={index}
            index={index}
            recreationTitle={recreations.title}
            keywords={recreations.keywordList}
            playTime={recreations.playTime}
          />
        ))}
      </RecreationList>
    </FlowCardContainer>
  );
}

const FlowCardContainer = styled.div`
  align-items: center;
  justify-content: center;
  width: 32rem;
  border-radius: 1.2rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale04};
  padding: 2rem;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
`;

const FlowTitle = styled.span`
  text-align: center;
  ${({ theme }) => theme.text.h4};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const NumberBox = styled.div`
  width: 5.5rem;
  padding: 0.3rem 0;
  text-align: center;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.color.grayscale01};
  ${({ theme }) => theme.text.button};
`;

const ScrapButton = styled(ScrapBtn)`
  width: 5.5rem;
  display: flex;
  justify-content: end;
`;

const RecreationList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 4rem 0 2rem;
`;
