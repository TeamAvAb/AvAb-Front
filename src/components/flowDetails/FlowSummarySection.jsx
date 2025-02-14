import React from 'react';
import styled from 'styled-components';
import { getTranslatedPurposes } from '../../utils/purposeUtils';
import { getTranslatedKeywords } from '../../utils/keywordUtils';
import { getTranslatedGenders } from '../../utils/genderUtils';
import { getTranslatedAges } from '../../utils/ageUtils';

export default function FlowSummarySection({ flow }) {
  return (
    <Container>
      <SummaryTitleBox>
        <h2>기본정보</h2>
        <h2>세부정보</h2>
      </SummaryTitleBox>

      <SummaryBox>
        <Column>
          <InfoRow>
            <Label>목적</Label>
            <span>{getTranslatedPurposes(flow.purposeList).join(' ')}</span>
          </InfoRow>
          <InfoRow>
            <Label>플레이 시간</Label>
            <span>{flow.totalPlayTime}분</span>
          </InfoRow>
        </Column>

        <Line />

        <Column className="right">
          <InfoRow>
            <Label>키워드</Label>
            <span>{getTranslatedKeywords(flow.keywordList).join(' ')}</span>
          </InfoRow>
          <InfoRow>
            <Label>성별</Label>
            <span>{getTranslatedGenders(flow.gender).join(', ')}</span>
          </InfoRow>
          <InfoRow>
            <Label>연령대</Label>
            <span>{getTranslatedAges(flow.age).join(', ')}</span>
          </InfoRow>
          <InfoRow>
            <Label>인원</Label>
            <span>{flow.participants}명</span>
          </InfoRow>
        </Column>
      </SummaryBox>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 38rem;
`;

const SummaryTitleBox = styled.div`
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.text.h4};
  padding: 1.5rem 0;

  h2 {
    width: 50%;
    text-align: center;
  }
`;

const SummaryBox = styled.div`
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
  background: white;
  padding: 1.8rem 1.25rem;
  display: flex;
  align-items: center;
  height: 6.5rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 50%;

  &.right {
    margin-left: 1.25rem;
  }
`;

const InfoRow = styled.div`
  display: flex;
  gap: 0.5rem;
  ${({ theme }) => theme.text.small};
`;

const Label = styled.h3`
  ${({ theme }) => theme.text.smallBold};
`;

const Line = styled.div`
  border-left: 1px solid #cacdd2;
  height: 100%;
  width: 1px;
`;
