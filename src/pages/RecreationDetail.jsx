import React, { useRef, useEffect, useState } from "react";
import RecreationTopInfo from "../components/recreation/RecreationTopInfo";
import RecreationMenuBar from "../components/recreation/RecreationMenuBar";
import RecreationInformation from "../components/recreation/RecreationInformation";
import RecreationReview from "../components/recreation/RecreationReview";
import RecreationRelated from "../components/recreation/RecreationRelated";
import RecreationFlow from "../components/recreation/RecreationFlow";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RecreationDetail() {
  const { recreationId } = useParams();
  const infoRef = useRef(null);
  const reviewRef = useRef(null);
  const relatedRef = useRef(null);
  const flowRef = useRef(null);
  const scrollRefs = useRef([infoRef, reviewRef, relatedRef, flowRef]);

  const [recreationData, setRecreationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dev.avab.shop/api/recreations/${recreationId}`
        );
        setRecreationData(response.data.result);

        setLoading(false); // 데이터 받아오기 성공
      } catch (error) {
        console.error(error);
        setLoading(false); // 데이터 받아오기 실패
      }
    };

    fetchData();
  }, [recreationId]);

  if (loading) {
    return <div></div>; // 로딩 중일 때
  }

  return (
    <>
      <RecreationTopInfo recreationData={recreationData} />
      <RecreationMenuBar scrollRefs={scrollRefs} />
      <RecreationDetailContainer>
        {recreationData ? (
          <>
            <RecreationInformation
              ref={infoRef}
              recreationData={recreationData}
            />
            <RecreationReview ref={reviewRef} recreationId={recreationId} />
            <RecreationRelated ref={relatedRef} recreationId={recreationId} />
            <RecreationFlow ref={flowRef} recreationId={recreationId} />
          </>
        ) : (
          <div></div> // 데이터가 없는 경우
        )}
      </RecreationDetailContainer>
    </>
  );
}
const RecreationDetailContainer = styled.div`
  background-color: #e9ebed;
  padding: 32px 89px 60px 89px;
`;
