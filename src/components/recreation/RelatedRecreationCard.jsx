import styled from 'styled-components';
import React from 'react';
import RecreationContentBox from './RecreationContentBox';
import { Link, useNavigate } from 'react-router-dom';

export default function RelatedRecreationCard({
  hashtag,
  recreationTitle,
  keywords,
  starRate,
  relatedId,
  isFavorite,
}) {
  const navigate = useNavigate();
  const matchKeywords = (keywords) => {
    const keywordMap = {
      QUICKNESS: '순발력',
      SENSIBLE: '센스',
      COOPERATIVE: '창의력',
      ACTIVE: '협동',
      BRAIN: '액티브',
      PSYCHOLOGICAL: '두뇌',
      LUCK: '심리',
      COMMON_SENSE: '행운',
      PREPARATION: '상식',
    };
    const matchedWords = keywords.map((keyword) => keywordMap[keyword]);
    return matchedWords.filter(Boolean);
  };

  const translatedKeywords = keywords ? matchKeywords(keywords) : [];
  return (
    <RelatedRecreationContainer>
      <BoxWrap>
        <RecreationContentBox
          recreationId={relatedId}
          hashtag={hashtag}
          recreationTitle={recreationTitle}
          keywords={translatedKeywords}
          starRate={starRate}
          isFavorite={isFavorite}
        />
      </BoxWrap>
      <DetailLinkButton
        to={'/recreation/detail/' + relatedId}
        onClick={() => {
          window.scrollTo(0, 0); // 페이지 이동 전에 스크롤을 맨 위로 이동
        }}
      >
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
