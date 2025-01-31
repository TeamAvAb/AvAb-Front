import styled from 'styled-components';
import React from 'react';
import RecreationPreview from './RecreationPreview';

export default function RecreationTopInfo({ recreationData }) {
  if (!recreationData || !recreationData.imageUrl) {
    return <WarningMessage>잘못된 접근입니다. 해당 레크레이션이 존재하지 않습니다.</WarningMessage>;
  }

  return (
    <RecreationTopMenuContainer>
      <ImgMainWrap>
        <MainImage src={recreationData.imageUrl} alt={recreationData.title} />
        {/* 레크레이션 정보 */}
        <div>
          <RecreationPreview recreation={recreationData} />
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
