import styled from 'styled-components';
import React, { forwardRef, useEffect, useState } from 'react';
import ReviewStars from './ReviewStars';
import RecreationReview from './RecreationReview';
import { privateAPI, publicAPI } from '@/apis/user.js';
import useLoginModalStore from '../../stores/loginModalStore';
import useLoginStore from '../../stores/loginStore';
import Pagination from '../pagination/Pagination';
import { Tooltip } from 'react-tooltip';
import AlertIcon from '@/assets/common/alert.svg?react';
import theme from '../../styles/theme';

const RecreationReviewSection = forwardRef(({ recreationId }, ref) => {
  const { modalControl } = useLoginModalStore();
  const { isLoggedIn } = useLoginStore((state) => state);
  const [reviewListData, setReviewListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [reviewData, setReviewData] = useState(0);
  const [reviewInput, setReviewInput] = useState('');
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarClick = (starCount) => {
    if (!isLoggedIn) {
      modalControl();
      return;
    }

    setSelectedStars(starCount);
  };

  // 리뷰 목록 받아오기
  const fetchReviews = async () => {
    console.log('리뷰 목록 다시 받기');
    try {
      const api = isLoggedIn ? privateAPI : publicAPI;
      const response = await api.get(
        `/api/recreations/${recreationId}/reviews?page=${currentPage}`,
      );
      console.log(response);
      setReviewListData(response.data.result.reviewList);
      console.log('리뷰 리스트 데이터: ', response.data.result.reviewList);
      setReviewData(response.data.result);
    } catch (error) {
      console.error('리뷰데이터', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage, recreationId]);

  // 리뷰 작성
  const handleReviewSubmit = async () => {
    if (!isLoggedIn) {
      modalControl();
      return;
    }

    if (selectedStars === 0) {
      return;
    }

    try {
      await privateAPI.post(
        `/api/recreations/${recreationId}/reviews`,
        {
          stars: selectedStars,
          contents: reviewInput,
        },
        {
          headers: {
            Accept: '*/*',
          },
        },
      );

      // 리뷰 목록 업데이트
      fetchReviews();

      alert('리뷰가 등록되었습니다');
      setSelectedStars(0);
      setReviewInput('');
    } catch (error) {
      console.error(error);
      alert('리뷰 등록에 실패했습니다');
    }
  };

  return (
    <ReviewSection ref={ref}>
      <TitleText>리뷰 및 평가 ({reviewData.totalReviews})</TitleText>
      <StarBox>
        <SelectStar>별점을 선택해주세요.</SelectStar>
        <ReviewStars onStarClick={handleStarClick} selectedStars={selectedStars} />
      </StarBox>

      <ReviewInputWrap>
        <ReviewInputBox
          placeholder={
            isLoggedIn ? '리뷰 내용을 입력해주세요.' : '로그인 한 후 리뷰를 작성할 수 있습니다.'
          }
          value={reviewInput}
          onChange={(e) => setReviewInput(e.target.value)}
          disabled={!isLoggedIn}
        />
        <ReviewInputButton onClick={handleReviewSubmit} data-tooltip-id="review-submit">
          등록
        </ReviewInputButton>
        {isLoggedIn && selectedStars === 0 && (
          <ReviewInputWarningTooltip id="review-submit" openOnClick offset={5} opacity={1}>
            <TooltipContent>
              <AlertIcon alt="경고" fill={theme.color.main04} />
              별점을 선택해주세요!
            </TooltipContent>
          </ReviewInputWarningTooltip>
        )}
      </ReviewInputWrap>
      <ReviewsContainer>
        <ReviewList>
          {reviewListData.map((review) => (
            <RecreationReview key={review.reviewId} review={review} />
          ))}
        </ReviewList>
        {/* 리뷰 리스트가 있을 때만 페이지네이션 표시 */}
        {reviewListData.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageNum={reviewData.totalPages}
            />
          </div>
        )}
      </ReviewsContainer>
    </ReviewSection>
  );
});
export default RecreationReviewSection;

const ReviewSection = styled.section`
  background-color: ${({ theme }) => theme.color.main05};
  padding: 2.5rem;
  border-radius: 1.2rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
`;

const TitleText = styled.h3`
  ${({ theme }) => theme.text.h4}
  margin-bottom: 1rem;
`;

const StarBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const SelectStar = styled.div`
  color: ${({ theme }) => theme.color.grayscale04};
  ${({ theme }) => theme.text.paragraph}
`;

const ReviewInputWrap = styled.div`
  height: 4rem;
  margin: 2rem 0;
`;

const ReviewInputBox = styled.input`
  width: 56rem;
  padding: 0 1.2rem;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.color.grayscale04} inset;
  border: none;
  ${({ theme }) => theme.text.paragraph}
  border-top-left-radius: 1.2rem;
  border-bottom-left-radius: 1.2rem;
  outline: none;
  height: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale04};
  }
`;

const ReviewInputButton = styled.button`
  width: 7.5rem;
  border-radius: 0 1.2rem 1.2rem 0;
  background: ${({ theme }) => theme.color.secondary03};
  color: ${({ theme }) => theme.color.main05};
  text-align: center;
  ${({ theme }) => theme.text.button};
  height: 100%;
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ReviewInputWarningTooltip = styled(Tooltip)`
  background: ${({ theme }) => theme.color.grayscale03} !important;
  padding: 1.2rem !important;
  border-radius: 1.2rem !important;
`;

const TooltipContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.color.main04};
`;
