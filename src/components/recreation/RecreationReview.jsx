import styled from "styled-components";
import React, { useState, forwardRef, useEffect } from "react";
import ReviewStars from "./ReviewStars";
import ReviewBox from "./ReviewBox";
import RecreationPagination from "./RecreationPagination";
import axios from "axios";

const RecreationReview = forwardRef(({ recreationId }, ref) => {
  const [reviewsData, setReviewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);

  const itemsPerPage = 2;
  const totalItems = totalPageNum * itemsPerPage;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://dev.avab.shop/api/recreations/${recreationId}/reviews?page=${
            currentPage - 1
          }`
        );
        setReviewsData(response.data.result.reviewList);
        setTotalPageNum(response.data.result.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [currentPage, recreationId]);
  return (
    <RecreationReviewContainer ref={ref}>
      <TitleText>리뷰 및 평가 ({itemsPerPage})</TitleText>
      <StarBox>
        <SelectStar>별점을 선택해주세요</SelectStar>
        <ReviewStars></ReviewStars>
      </StarBox>
      <ReviewInputWrap>
        <ReviewInputBox placeholder="로그인 한 후 리뷰를 작성할 수 있습니다."></ReviewInputBox>
        <ReviewInputButton>등록</ReviewInputButton>
      </ReviewInputWrap>
      {reviewsData.map((review) => (
        <ReviewBox
          key={review.reviewId}
          starNum={review.stars}
          nickname={review.author.username}
          date={review.createdAt}
          review={review.contents}
          like={review.goodCount}
          dislike={review.badCount}
        />
      ))}
      <RecreationPagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPageNum={totalPageNum}
      />
    </RecreationReviewContainer>
  );
});
export default RecreationReview;

const RecreationReviewContainer = styled.div`
  background-color: white;
  padding: 40px 44px;
  border-radius: 20px;
  border: 0.5px solid #cacdd2;
  margin-bottom: 60px;
`;

const TitleText = styled.div`
  color: #1b1d1f;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 13px;
`;

const StarBox = styled.div`
  display: flex;
`;

const SelectStar = styled.div`
  color: #9fa4a9;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
`;

const ReviewInputWrap = styled.div`
  margin: 29px 0px;
`;
const ReviewInputBox = styled.input`
  width: 897px;
  padding: 16px 19px;
  border: 0.5px solid #9fa4a9;
  font-size: 20px;
  font-weight: 400;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  outline: none;
`;

const ReviewInputButton = styled.button`
  width: 124px;
  height: 69px;
  flex-shrink: 0;
  border-radius: 0px 20px 20px 0px;
  background: #8896df;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  border: none;
  height: 58px;
  cursor: pointer;
`;
