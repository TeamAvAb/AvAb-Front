import styled from 'styled-components';
import React from 'react';
import yellowStar from '../../assets/recreation/yellowStar.svg';
import viewIcon from '../../assets/recreation/viewIcon.svg';
import HashtagChip from '../common/chip/HashtagChip';
import FavBtn from '../common/button/FavBtn';
import KeywordChip from '../common/chip/KeywordChip';
import { getTranslatedKeywords } from '../../utils/keywordUtils';

export default function RecreationPreview({ recreation, showViewCount = true }) {
  const formattedStarRate = parseFloat(recreation.totalStars).toFixed(1);

  console.log(recreation);

  return (
    <RecreationOverview>
      <Top>
        <HashTagFavBtn>
          <HashtagChip text={recreation.hashtagList} />
          <FavBtn recreationId={recreation.id} isFav={recreation.isFavorite} />
        </HashTagFavBtn>
        <TitleStar>
          <RecreationTitle>{recreation.title}</RecreationTitle> {/* 레크레이션 제목 */}
          <Star>
            <img src={yellowStar} alt="star icon" />
            {formattedStarRate}
          </Star>
          {/* 별점*/}
        </TitleStar>
        <Keywords>
          {getTranslatedKeywords(recreation.keywordList).map((keyword) => (
            <KeywordChip text={keyword} key={keyword} />
          ))}
        </Keywords>
      </Top>

      {/* 키워드 */}
      {showViewCount && (
        <ViewBox>
          <ViewIcon src={viewIcon} />
          <ViewText>{recreation.viewCount}</ViewText>
        </ViewBox>
      )}
    </RecreationOverview>
  );
}

const RecreationOverview = styled.div`
  width: 24rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const RecreationTitle = styled.h2`
  ${({ theme }) => theme.text.h4};
`;

const TitleStar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Star = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const HashTagFavBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const Keywords = styled.div`
  display: flex;
  gap: 1rem;
`;

const ViewBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const ViewIcon = styled.img`
  margin-right: 0.5rem;
`;

const ViewText = styled.div`
  color: #26282b;
  text-align: right;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 1.2rem;
`;
