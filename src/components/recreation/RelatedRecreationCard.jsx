import styled from 'styled-components';
import React from 'react';
import RecreationPreview from './RecreationPreview';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/windowUtils';

export default function RelatedRecreationCard({ recreation }) {
  return (
    <RelatedRecreationContainer>
      <BoxWrap>
        <RecreationPreview recreation={recreation} showViewCount={false} />
      </BoxWrap>
      <DetailLinkButton to={`/recreation/detail/${recreation.id}`} onClick={scrollToTop}>
        상세 페이지 보러가기 {'>'}
      </DetailLinkButton>
    </RelatedRecreationContainer>
  );
}

const RelatedRecreationContainer = styled.div`
  display: flex;
  border-radius: 1.2rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
`;

const BoxWrap = styled.div`
  display: flex;
  border-radius: 1.2rem;
  padding: 1.8rem 0 1.8rem 2.5rem;
`;

const DetailLinkButton = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 0 1.2rem 1.2rem 0;
  background: ${({ theme }) => theme.color.secondary04};
  border: none;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: auto;
  padding: 0 5rem;
`;
