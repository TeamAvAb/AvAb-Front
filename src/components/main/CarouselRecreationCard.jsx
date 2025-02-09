import React from 'react';
import styled from 'styled-components';
import RecreationCardS, { CardSection } from '../common/card/recreationCard/RecreationCardS';
import HashtagChip from '../common/chip/HashtagChip';
import { useNavigate } from 'react-router';
import { scrollToTop } from '../../utils/windowUtils';

export default function CarouselRecreationCard({ content }) {
  const navigate = useNavigate();
  const toRecreationDetail = (recreationId) => {
    navigate(`/recreation/detail/${recreationId}`);
    scrollToTop();
  };

  const handleCardClick = () => {
    toRecreationDetail(content.id);
  };

  return (
    <Container onClick={handleCardClick}>
      <HashtagChip text={content.hashtagList[0]} />
      <RecreationCardS content={content} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 1.2rem;

  &:hover ${CardSection} {
    background-color: ${({ theme }) => theme.color.main03};
  }
`;
