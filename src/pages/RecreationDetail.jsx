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
import { Helmet } from "react-helmet"; // react-helmet 임포트

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
      <Helmet>
        <title>{recreationData.title} - 레크레이션 상세정보</title>
        <meta
          name="description"
          content={`레크레이션 정보: ${
            recreationData.summary
          }. ${recreationData.purposeList
            .map((purpose) => {
              const purposeMap = {
                WORKSHOP: "워크샵",
                SPORTS_DAY: "체육대회",
                MT: "MT",
                GATHERING: "모임",
                RETREAT: "수련회",
              };
              return purposeMap[purpose] || purpose;
            })
            .join(", ")} 진행 시간: ${recreationData.playTime}분`}
        />
        <meta
          name="keywords"
          content={`레크레이션, ${
            recreationData.title
          }, ${recreationData.keywordList
            .map((keyword) => {
              const keywordMap = {
                QUICKNESS: "순발력",
                SENSIBLE: "센스",
                COOPERATIVE: "창의력",
                ACTIVE: "협동",
                BRAIN: "액티브",
                PSYCHOLOGICAL: "두뇌",
                LUCK: "심리",
                COMMON_SENSE: "행운",
                PREPARATION: "상식",
              };
              return keywordMap[keyword] || keyword;
            })
            .join(", ")}`}
        />
        <meta
          property="og:title"
          content={`${recreationData.title} - 레크레이션 상세정보`}
        />
        <meta
          property="og:description"
          content={`레크레이션 정보: ${
            recreationData.summary
          }. ${recreationData.purposeList
            .map((purpose) => {
              const purposeMap = {
                WORKSHOP: "워크샵",
                SPORTS_DAY: "체육대회",
                MT: "MT",
                GATHERING: "모임",
                RETREAT: "수련회",
              };
              return purposeMap[purpose] || purpose;
            })
            .join(", ")} 진행 시간: ${recreationData.playTime}분`}
        />
        <meta property="og:image" content={recreationData.imageUrl} />
        <meta
          property="og:url"
          content={`https://teamavab.github.io/AvAb-Front/recreation/${recreationData.recreationId}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="AvAb 아브아브" />
      </Helmet>
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
