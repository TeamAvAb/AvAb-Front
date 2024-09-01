import styled from "styled-components";
import React, { forwardRef, useState, useEffect } from "react";
import RelatedRecreationBox from "./RelatedRecreationBox";
import { publicAPI } from "../../apis/user";
const RecreationRelated = forwardRef(({ recreationId }, ref) => {
  const [relatedData, setRelatedData] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await publicAPI.get(
          `/api/recreations/${recreationId}/related/recreations`
        );
        setRelatedData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [recreationId]);
  return (
    <RecreationRelatedContainer ref={ref}>
      <TitleText>연관 레크레이션</TitleText>
      <SubText>해당 레크레이션과 함께 사용할 수 있어요!</SubText>
      {relatedData.map((related) => (
        <RelatedRecreationBox
          hashtag={related.hashtagList}
          recreationTitle={related.title}
          kewords={related.keywordList}
          starRate={related.totalStars}
          isFavorite={related.isFavorite}
          relatedId={related.id}
        />
      ))}
    </RecreationRelatedContainer>
  );
});

export default RecreationRelated;

const RecreationRelatedContainer = styled.div`
  background-color: white;
  padding: 40px 44px 20px 44px;
  border-radius: 20px;
  border: 0.5px solid #cacdd2;
  margin-bottom: 60px;
`;

const TitleText = styled.div`
  color: #1b1d1f;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 7px;
`;

const SubText = styled.div`
  color: #9fa4a9;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 31px;
  line-height: 30px;
`;
