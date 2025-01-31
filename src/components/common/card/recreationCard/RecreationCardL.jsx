import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import yellowStar from '../../../../assets/recreation/yellowStar.svg';
import BaseFavBtn from '../../button/FavBtn';
import HashtagChip from '../../chip/HashtagChip';
import KeywordChip from '../../chip/KeywordChip';
import arrowIcon from '../../../../assets/Card/arrowIcon.svg';
import { getTranslatedKeywords } from '../../../../utils/keywordUtils';
import SITE_URL from '../../../../constants/url';
import { scrollToTop } from '../../../../utils/windowUtils';

export default function RecreationCardL({ content }) {
  const renderKeywords = () =>
    getTranslatedKeywords(content.keywordList).map((keyword) => (
      <KeywordChip key={keyword} text={keyword} />
    ));

  const navigate = useNavigate();
  const toRecreationDetail = (recreationId) => {
    navigate(SITE_URL.RECREATION_DETAIL(recreationId));
    scrollToTop();
  };

  const handleDetailClick = (e) => {
    e.stopPropagation();
    toRecreationDetail(content.id);
  };

  return (
    <CardContainer>
      <CardContent>
        <HashtagChip text={content.hashtagList[0]} />
        <CardRow1>
          <CardTitle>{content.title}</CardTitle>
          <RateDiv>
            <img src={yellowStar} alt="star icon" width={16} />
            <Rate>{parseFloat(content.totalStars).toFixed(1)}</Rate>
          </RateDiv>
        </CardRow1>
        <Keywords>{renderKeywords()}</Keywords>
        <CardRow2>
          <img src={content.imageUrl} alt="레크레이션 이미지" />
          <FavBtn recreationId={content.id} isFav={content.isFavorite} />
        </CardRow2>
      </CardContent>
      <MoreDetailBtn onClick={handleDetailClick}>
        자세히 보기
        <img src={arrowIcon} alt="" />
      </MoreDetailBtn>
    </CardContainer>
  );
}

const MoreDetailBtn = styled.button`
  height: 4.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  background-color: ${({ theme }) => theme.color.secondary04};
  color: ${({ theme }) => theme.color.grayscale01};
  ${({ theme }) => theme.text.button};
  border-radius: 0 0 1.25rem 1.25rem;
  transition: background-color 0.2s;
`;

const CardContainer = styled.div`
  width: 27.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.color.main05};
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);

  &:hover ${MoreDetailBtn} {
    background-color: ${({ theme }) => theme.color.main03};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.8rem 0;
  gap: 1.5rem;
`;

const CardRow1 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Keywords = styled.div`
  display: flex;
  gap: 1rem;
`;

const CardTitle = styled.h4`
  ${({ theme }) => theme.text.h4}
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

const CardRow2 = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;

  img {
    width: 9rem;
    margin: 0 auto;
  }
`;

const FavBtn = styled(BaseFavBtn)`
  position: absolute;
  bottom: 0;
  right: 0;
`;
