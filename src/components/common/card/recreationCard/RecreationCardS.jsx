import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import yellowStar from '../../../../assets/recreation/yellowStar.svg';
import FavBtn from '../../button/FavBtn';
import arrowIcon from '../../../../assets/Card/arrowIcon.svg';
import { scrollToTop } from '../../../../utils/windowUtils';
import { getTranslatedKeywords } from '../../../../utils/keywordUtils';

export default function RecreationCardS({ content }) {
  const navigate = useNavigate();
  const toRecreationDetail = (recreationId, e) => {
    e.stopPropagation();
    navigate(`/recreation/detail/${recreationId}`);
    scrollToTop();
  };

  const handleDetailClick = (e) => {
    e.stopPropagation();
    toRecreationDetail(content.id);
  };

  const renderKeywords = () => getTranslatedKeywords(content.keywordList).join(', ');

  return (
    <CardLayout>
      <CardContent>
        <img src={content.imageUrl} />
        <FavBtn recreationId={content.id} isFav={content.isFavorite} />
      </CardContent>
      <CardSection onClick={handleDetailClick}>
        <TitleDiv>
          <Title>{content.title} </Title>
          <img src={arrowIcon} />
        </TitleDiv>
        <KeywordsAndRateBox>
          <Keywords>{renderKeywords()}</Keywords>
          <RateDiv>
            <img src={yellowStar} alt="star icon" width={16} height={16} />
            <Rate>{parseFloat(content.totalStars).toFixed(1)}</Rate>
          </RateDiv>
        </KeywordsAndRateBox>
      </CardSection>
    </CardLayout>
  );
}

export const CardSection = styled.div`
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.19rem;
  padding: 0 1.25rem;
  border-radius: 0 0 1.25rem 1.25rem;
  background-color: ${({ theme }) => theme.color.secondary04};
  cursor: pointer;
  transition: background-color 0.2s;
`;

const CardLayout = styled.div`
  width: 17.5rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.color.grayscale07};
  box-shadow: 0 10px 30px 3px ${({ theme }) => theme.color.grayscale01}33;

  &:hover ${CardSection} {
    background-color: ${({ theme }) => theme.color.main03};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  flex: 1;
  padding: 2rem 1rem 0;

  img {
    width: 7.5rem;
    margin: 0 auto;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;
const Title = styled.h5`
  ${({ theme }) => theme.text.h5}
`;
const KeywordsAndRateBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Keywords = styled.div`
  display: flex;
  ${({ theme }) => theme.text.small}
`;

const RateDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  img {
    padding: 4px;
    vertical-align: bottom;
  }
`;

const Rate = styled.span`
  ${({ theme }) => theme.text.small}
`;
