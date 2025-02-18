import React from 'react';
import styled from 'styled-components';
import RecreationCardS from '../common/card/recreationCard/RecreationCardS';
import Button from '../common/button/Button';

export default function RecreationCard({ content, handleAddRecommendFlow, handleAddScrapFlow }) {
  return (
    <Container>
      <Wrapper>
        <RecreationCardS content={content} />
        <Summary>
          <Title>레크레이션 소개</Title>
          <Subtitle>{content.title}</Subtitle>
          <Content>{content.summary}</Content>
        </Summary>
      </Wrapper>
      <Button color="main05" backgroundColor="secondary02">
        추가하기
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 1.25rem;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Summary = styled.dl`
  position: absolute; /* 포지션을 절대적으로 변경 */
  height: 100%;
  top: 0;
  left: 0;
  color: white;
  background-color: ${({ theme }) => theme.color.grayscale01}CD;
  border-radius: 1.25rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 1.25rem 2.5rem;
  box-sizing: border-box;

  ${Wrapper}:hover & {
    opacity: 1;
  }
`;

const Title = styled.h4`
  ${({ theme }) => theme.text.small};
  margin-bottom: 0.2rem;
`;

const Subtitle = styled.dt`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 2.5rem;
`;

const Content = styled.dd`
  ${({ theme }) => theme.text.paragraph};
  line-height: 1.8rem;
  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
`;
