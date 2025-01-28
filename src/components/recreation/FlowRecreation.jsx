import React from 'react';
import styled from 'styled-components';
import KeywordChip from '../chip/KeywordChip';
import { getTranslatedKeywords } from '../../constants/keyword';

export default function FlowRecreation({ index, recreationTitle, keywords, playTime }) {
  const renderKeywords = () =>
    getTranslatedKeywords(keywords).map((keyword) => <KeywordChip key={keyword} text={keyword} />);

  const height = (playTime / 10) * 8;
  return (
    <FlowRecreationContainer height={height}>
      <PlayTimeBar height={height} />
      <RecreationContent>
        <TitleBox>
          <NumCircle>{index + 1}</NumCircle> {/* 번호 */}
          <Title>{recreationTitle}</Title> {/* 레크레이션 제목 */}
        </TitleBox>
        <KeywordBox>
          {renderKeywords()} {/* 키워드 리스트 */}
        </KeywordBox>
        <PlayText>
          플레이까지
          <Time>{playTime}분</Time>
        </PlayText>
      </RecreationContent>
    </FlowRecreationContainer>
  );
}
const PlayTimeBar = styled.div`
  background: ${({ theme }) => theme.color.secondary04};
  width: 0.5rem;
  height: ${({ height }) => `${height}rem`};
  border-radius: 9999px;
`;

const FlowRecreationContainer = styled.li`
  display: flex;
  gap: 1.2rem;
`;

const RecreationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const KeywordBox = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

const NumCircle = styled.span`
  background-color: ${({ theme }) => theme.color.secondary04};
  width: 2.6rem;
  height: 2.6rem;
  ${({ theme }) => theme.text.h4};
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) => theme.text.h4}
`;

const PlayText = styled.span`
  color: ${({ theme }) => theme.color.grayscale04};
  margin-top: 1rem;
`;

const Time = styled.span`
  margin-left: 1.2rem;
  color: ${({ theme }) => theme.color.grayscale01};
  font-weight: 700;
`;
