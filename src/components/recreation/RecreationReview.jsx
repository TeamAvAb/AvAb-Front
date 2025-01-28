import styled from 'styled-components';
import React, { useState } from 'react';
import yellowStar from '../../assets/recreation/yellowStar.svg';
import greyStar from '../../assets/recreation/greyStar.svg';
import { ReactComponent as GoodIcon } from '../../assets/recreation/good.svg';
import { ReactComponent as BadIcon } from '../../assets/recreation/bad.svg';
import { getRelativeTimeText } from '../../utils/time';
import { privateAPI } from '../../apis/user';
import useLoginModalStore from '../../stores/loginModalStore';
import useLoginStore from '../../stores/loginStore';
import Button from '../common/button/Button';

export default function RecreationReview({ review }) {
  const [recommendation, setRecommendation] = useState(review.recommendation);
  const { modalControl } = useLoginModalStore();
  const { isLoggedIn } = useLoginStore((state) => state);

  const handleRecommendationClick = async (type) => {
    if (isLoggedIn) {
      const response = await privateAPI.post(
        `/api/recreation-reviews/${review.reviewId}/recommendations`,
        {
          type,
        },
      );
      if (response.data?.code === 'COMMON201') {
        setRecommendation((prev) => ({ ...prev, type }));
      } else {
        console.log(response.data);
      }
    } else {
      modalControl();
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= review.stars) {
        stars.push(<img key={i} src={yellowStar} alt="star" />);
      } else {
        stars.push(<img key={i} src={greyStar} alt="star" />);
      }
    }

    return stars;
  };

  return (
    <div>
      <ReviewStarsContainer>
        <StarsWrap>{renderStars()}</StarsWrap>
        <StarNum>{review.stars}/5</StarNum>
      </ReviewStarsContainer>
      <NicknameDateBox>
        <Nickname>{review.author.username}</Nickname>
        <Divider />
        <CreatedAt>{getRelativeTimeText(review.createdAt)}</CreatedAt>
      </NicknameDateBox>
      <ReviewContent>{review.contents}</ReviewContent>
      <ReviewRecommendationButtonContainer>
        <RecommendationButton
          active={recommendation && recommendation.type === 'GOOD'}
          onClick={() => handleRecommendationClick('GOOD')}
        >
          <GoodIcon />
          {review.goodCount}
        </RecommendationButton>
        <RecommendationButton
          active={recommendation && recommendation.type === 'BAD'}
          onClick={() => handleRecommendationClick('BAD')}
        >
          <BadIcon />
          {review.badCount}
        </RecommendationButton>
      </ReviewRecommendationButtonContainer>
    </div>
  );
}

const ReviewStarsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
`;

const StarsWrap = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const StarNum = styled.span`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.text.small}
`;

const NicknameDateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Nickname = styled.span`
  color: ${({ theme }) => theme.color.grayscale03};
  ${({ theme }) => theme.text.h5};
`;

const Divider = styled.div`
  width: 1px;
  height: 1.6rem;
  background: ${({ theme }) => theme.color.grayscale05};
`;

const CreatedAt = styled.div`
  color: ${({ theme }) => theme.color.grayscale04};
  ${({ theme }) => theme.text.small}
`;

const ReviewContent = styled.div`
  margin: 1rem 0;
  ${({ theme }) => theme.text.paragraph}
`;

const RecommendationButton = styled(Button)`
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${({ theme, active }) => (active ? theme.color.secondary03 : theme.color.grayscale04)};
  color: ${({ theme, active }) => (active ? theme.color.main05 : theme.color.grayscale04)};
  gap: 0.5rem;
  background: ${({ theme, active }) => (active ? theme.color.secondary03 : 'transparent')};
`;

const ReviewRecommendationButtonContainer = styled.div`
  display: flex;
  gap: 2.5rem;
`;
