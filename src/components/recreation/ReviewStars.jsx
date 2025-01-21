import styled from 'styled-components';
import React from 'react';
import yellowStar from '../../assets/recreation/yellowStar.svg';
import greyStar from '../../assets/recreation/greyStar.svg';

export default function ReviewStars({ onStarClick, selectedStars }) {
  // 별점 기본값 설정
  // 별을 5개로 표현하기 위한 더미 배열
  const stars = [1, 2, 3, 4, 5];

  // 별점 변경 함수
  const starScore = (index) => {
    onStarClick(index);
  };

  // 현재 선택한 별점 개수

  return (
    <Container>
      <StarsWrap>
        {stars.map((starIndex) => (
          <img
            key={starIndex}
            onClick={() => starScore(starIndex)}
            src={starIndex <= selectedStars ? yellowStar : greyStar} // clicked 배열이 true이면 yellowStar, false이면 greyStar을 출력
            alt="starIcon"
          />
        ))}
      </StarsWrap>
      <StarNum>{selectedStars}/5</StarNum>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const StarsWrap = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

const StarNum = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.grayscale02};
  ${({ theme }) => theme.text.paragraph}
`;
