import React, { useEffect, useRef, useState } from 'react';
import RecreationTopInfo from '../components/recreation/RecreationTopInfo';
import RecreationMenuBar from '../components/recreation/RecreationMenuBar';
import RecreationInfoSection from '../components/recreation/RecreationInfoSection';
import RecreationReviewSection from '../components/recreation/RecreationReviewSection';
import RelatedRecreationSection from '../components/recreation/RelatedRecreationSection';
import RecreationRelatedFlowSection from '../components/recreation/RecreationRelatedFlowSection';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { privateAPI, publicAPI } from '../apis/user';
import useLoginStore from '../stores/loginStore';
import NotFound from './NotFound';
import PageMetadata from '@/components/helmet/PageMetadata.js';
import KEYWORD from '@/constants/enum/keyword.js';
import SITE_URL from '@/constants/url.js';
import PURPOSE from '@/constants/enum/purpose.js';

export default function RecreationDetail() {
  const { recreationId } = useParams();
  const infoRef = useRef(null);
  const reviewRef = useRef(null);
  const relatedRef = useRef(null);
  const flowRef = useRef(null);
  const scrollRefs = useRef([infoRef, reviewRef, relatedRef, flowRef]);
  const { isLoggedIn } = useLoginStore((state) => state);
  const [recreationData, setRecreationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // isLoggedIn()이 true면 privateAPI, false면 publicAPI 사용
        const api = isLoggedIn ? privateAPI : publicAPI;
        const response = await api.get(`/api/recreations/${recreationId}`);
        setRecreationData(response.data.result);
        console.log('레크레이션 데이터 ', response.data.result);
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

  if (!recreationData) {
    return <NotFound />;
  }

  return (
    <>
      <PageMetadata
        title={`${recreationData.title} 레크레이션 상세 정보 | AvAb - 아브아브`}
        description={`${recreationData.purposeList
          .map((purpose) => PURPOSE[purpose].value)
          .join(', ')} ${recreationData.summary}`}
        keywords={recreationData.keywordList.map((keyword) => KEYWORD[keyword].value).join(', ')}
        url={SITE_URL.RECREATION_DETAIL(recreationId)}
        image={recreationData.imageUrl}
        type="article"
      />
      <RecreationTopInfo recreationData={recreationData} />
      <RecreationMenuBar scrollRefs={scrollRefs} />
      <RecreationDetailContainer>
        {recreationData ? (
          <>
            <RecreationInfoSection ref={infoRef} recreationData={recreationData} />
            <RecreationReviewSection ref={reviewRef} recreationId={recreationId} />
            <RelatedRecreationSection ref={relatedRef} recreationId={recreationId} />
            <RecreationRelatedFlowSection ref={flowRef} recreationId={recreationId} />
          </>
        ) : (
          <div></div> // 데이터가 없는 경우
        )}
      </RecreationDetailContainer>
    </>
  );
}
const RecreationDetailContainer = styled.div`
  background-color: ${({ theme }) => theme.color.grayscale07};
  padding: 2rem 5.5rem 4rem 5.5rem;
  display: flex;
  gap: 3.5rem;
  flex-direction: column;
`;
