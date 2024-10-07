import styled from "styled-components";
import React, { useState, forwardRef, useEffect } from "react";
import ReviewStars from "./ReviewStars";
import ReviewBox from "./ReviewBox";
import RecreationPagination from "./RecreationPagination";
import { publicAPI } from "../../apis/user";
import { isLoggedIn, privateAPI } from "../../apis/user";
const RecreationReview = forwardRef(({ recreationId }, ref) => {
  const [reviewListData, setReviewListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewData, setReviewData] = useState(0);
  const [reviewInput, setReviewInput] = useState("");
  const [selectedStars, setSelectedStars] = useState(0);

  const [likeState, setLikeState] = useState(false);
  const [dislikeState, setDislikeState] = useState(false);

  const handleStarClick = (starCount) => {
    setSelectedStars(starCount);
  };

  const itemsPerPage = 2;
  // 리뷰 목록 받아오기
  const fetchReviews = async () => {
    console.log("리뷰 목록 다시 받기");
    try {
      const response = await publicAPI.get(
        `/api/recreations/${recreationId}/reviews?page=${currentPage - 1}`
      );
      setReviewListData(response.data.result.reviewList);
      setReviewData(response.data.result);
    } catch (error) {
      console.log("리뷰데이터");

      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage, recreationId]);

  // 리뷰 작성
  const handleReviewSubmit = async () => {
    if (isLoggedIn()) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        await privateAPI.post(
          `/api/recreations/${recreationId}/reviews`,
          {
            stars: selectedStars,
            contents: reviewInput,
          },
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // 리뷰 목록 업데이트
        fetchReviews();

        alert("리뷰가 등록되었습니다");
        setSelectedStars(0);

        setReviewInput("");
      } catch (error) {
        console.error(error);
        alert("리뷰 등록에 실패했습니다");
      }
    }
  };

  // 좋아요 클릭 핸들러
  const handleLikeClick = async (id) => {
    console.log("좋아요");
    if (localStorage.getItem("accessToken")) {
      const response = await privateAPI.post(
        `/api/recreation-reviews/${id}/recommendations`,
        {
          type: "GOOD",
        }
      );
      if (response.data?.code === "COMMON201") {
        setLikeState(true); // 좋아요 클릭 상태 변경
        setDislikeState(false); // 싫어요 해제

        fetchReviews();
      } else {
        console.log(response.data);
      }
    } else alert("로그인이 필요한 기능입니다.");
  };

  // 싫어요 클릭 핸들러
  const handleDislikeClick = async (id) => {
    console.log("싫어요");
    if (localStorage.getItem("accessToken")) {
      const response = await privateAPI.post(
        `/api/recreation-reviews/${id}/recommendations`,
        {
          type: "BAD",
        }
      );
      if (response.data?.code === "COMMON201") {
        setLikeState(false); // 좋아요 해제
        setDislikeState(true); // 싫어요 클릭 상태 변경
        fetchReviews();
      } else {
        console.log(response.data);
      }
    } else alert("로그인이 필요한 기능입니다.");
  };

  return (
    <RecreationReviewContainer ref={ref}>
      <TitleText>리뷰 및 평가 ({reviewListData.totalReviews})</TitleText>
      <StarBox>
        <SelectStar>별점을 선택해주세요</SelectStar>
        <ReviewStars
          onStarClick={handleStarClick}
          selectedStars={selectedStars}
        />
      </StarBox>

      <ReviewInputWrap>
        {isLoggedIn() ? (
          <>
            <ReviewInputBox
              placeholder="리뷰를 작성하세요."
              value={reviewInput}
              onChange={(e) => setReviewInput(e.target.value)}
            ></ReviewInputBox>
            <ReviewInputButton onClick={handleReviewSubmit}>
              등록
            </ReviewInputButton>
          </>
        ) : (
          <>
            <ReviewInputBox placeholder="로그인 한 후 리뷰를 작성할 수 있습니다."></ReviewInputBox>
            <ReviewInputButton>등록</ReviewInputButton>
          </>
        )}
      </ReviewInputWrap>

      {reviewListData.map((review) => (
        <ReviewBox
          reviewId={review.reviewId}
          starNum={review.stars}
          nickname={review.author.username}
          date={review.createdAt}
          review={review.contents}
          like={review.goodCount}
          dislike={review.badCount}
          handleLikeClick={handleLikeClick}
          handleDislikeClick={handleDislikeClick}
          likeState={likeState}
          dislikeState={dislikeState}
        />
      ))}
      <RecreationPagination
        itemsPerPage={itemsPerPage}
        totalItems={reviewData.totalReviews}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPageNum={reviewData.totalPages}
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
