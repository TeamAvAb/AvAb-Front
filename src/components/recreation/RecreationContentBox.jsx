import styled from 'styled-components';
import React from 'react';
import yellowStar from '../../assets/recreation/yellowStar.svg';
import HashtagChip from '../chip/HashtagChip';
import FavBtn from '../button/FavBtn';
import KeywordChip from '../chip/KeywordChip';
import viewIcon from '../../assets/recreation/viewIcon.svg';

export default function RecreationContentBox({
  recreationId,
  hashtag,
  recreationTitle,
  keywords,
  starRate,
  isFavorite,
  viewCount,
}) {
  const formattedStarRate = parseFloat(starRate).toFixed(1);

  return (
    <RecreationOverview>
      <Top>
        <HashTagFavBtn>
          <HashtagChip text={hashtag} />
          <FavBtn recreationId={recreationId} isFav={isFavorite} />
        </HashTagFavBtn>
        <TitleStar>
          <RecreationTitle>{recreationTitle}</RecreationTitle> {/* 레크레이션 제목 */}
          <Star>
            <img src={yellowStar} alt="star icon" />
            {formattedStarRate}
          </Star>
          {/* 별점*/}
        </TitleStar>
        <Keywords>
          {keywords.map((keyword) => (
            <KeywordChip text={keyword} key={keyword} />
          ))}
        </Keywords>
      </Top>

      {/* 키워드 */}
      {viewCount && (
        <ViewBox>
          <ViewIcon src={viewIcon} />
          <ViewText>{viewCount}</ViewText>
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
