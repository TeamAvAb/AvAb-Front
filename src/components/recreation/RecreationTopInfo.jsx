import styled from 'styled-components';
import React from 'react';
import RecreationContentBox from './RecreationContentBox';

export default function RecreationTopInfo({ recreationData }) {
  if (!recreationData || !recreationData.imageUrl) {
    return <WarningMessage>잘못된 접근입니다. 해당 레크레이션이 존재하지 않습니다.</WarningMessage>;
  }
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

  const keywords = recreationData ? matchKeywords(recreationData.keywordList) : [];
  return (
    <RecreationTopMenuContainer>
      <ImgMainWrap>
        <MainImage src={recreationData.imageUrl} alt={recreationData.title} />
        {/* 레크레이션 정보 */}
        <div>
          <RecreationContentBox
            recreationId={recreationData.recreationId}
            hashtag={recreationData.hashTagList}
            recreationTitle={recreationData.title}
            keywords={keywords}
            starRate={recreationData.totalStars}
            isFavorite={recreationData.isFavorite}
            viewCount={recreationData.viewCount}
          />
        </div>
      </ImgMainWrap>
    </RecreationTopMenuContainer>
  );
}

const RecreationTopMenuContainer = styled.div`
  padding: 3rem 0;
  background-color: ${({ theme }) => theme.color.main03};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgMainWrap = styled.div`
  display: flex;
  gap: 16rem;
`;

const MainImage = styled.img`
  width: 16rem;
`;

const WarningMessage = styled.div`
  color: #26282b;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  margin: 50px;
`;
