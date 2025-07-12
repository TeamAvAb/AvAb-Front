import React, { useEffect, useRef, useState } from 'react';
import RecreationTopInfo from '../components/recreation/RecreationTopInfo';
import RecreationMenuBar from '../components/recreation/RecreationMenuBar';
import RecreationInfoSection from '../components/recreation/RecreationInfoSection';
import RecreationReviewSection from '../components/recreation/RecreationReviewSection';
import RelatedRecreationSection from '../components/recreation/RelatedRecreationSection';
import RecreationRelatedFlowSection from '../components/recreation/RecreationRelatedFlowSection';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { privateAPI, publicAPI } from '../apis/user';
import useLoginStore from '../stores/loginStore';
import NotFound from './NotFound';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ReviewPostSuccessModal from '@/components/modal/ReviewPostSuccessModal';

export default function RecreationDetail() {
  const infoRef = useRef(null);
  const reviewRef = useRef(null);
  const relatedRef = useRef(null);
  const flowRef = useRef(null);
  const scrollRefs = useRef([infoRef, reviewRef, relatedRef, flowRef]);

  const { recreationId } = useParams();
  const { isLoggedIn } = useLoginStore((state) => state);
  const [recreationData, setRecreationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewPostSuccessModalOpen, setReviewPostSuccessModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const api = isLoggedIn ? privateAPI : publicAPI;
        const response = await api.get(`/api/recreations/${recreationId}`);
        setRecreationData(response.data.result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error('GET Recreation Detail Error');
      }
    };

    fetchData();

    return setRecreationData(null);
  }, [recreationId]);

  if (loading) {
    return <LoadingSpinner height="lg" />;
  }

  if (!recreationData) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{recreationData.title} - 레크레이션 상세정보</title>
        <meta
          name="description"
          content={`레크레이션 정보: ${recreationData.summary}. ${recreationData.purposeList
            .map((purpose) => {
              const purposeMap = {
                WORKSHOP: '워크샵',
                SPORTS_DAY: '체육대회',
                MT: 'MT',
                GATHERING: '모임',
                RETREAT: '수련회',
              };
              return purposeMap[purpose] || purpose;
            })
            .join(', ')} 진행 시간: ${recreationData.playTime}분`}
        />
        <meta
          name="keywords"
          content={`레크레이션, ${recreationData.title}, ${recreationData.keywordList
            .map((keyword) => {
              const keywordMap = {
                QUICKNESS: '순발력',
                SENSIBLE: '센스',
                COOPERATIVE: '창의력',
                ACTIVE: '협동',
                BRAIN: '액티브',
                PSYCHOLOGICAL: '두뇌',
                LUCK: '심리',
                COMMON_SENSE: '행운',
                PREPARATION: '상식',
              };
              return keywordMap[keyword] || keyword;
            })
            .join(', ')}`}
        />
        <meta property="og:title" content={`${recreationData.title} - 레크레이션 상세정보`} />
        <meta
          property="og:description"
          content={`레크레이션 정보: ${recreationData.summary}. ${recreationData.purposeList
            .map((purpose) => {
              const purposeMap = {
                WORKSHOP: '워크샵',
                SPORTS_DAY: '체육대회',
                MT: 'MT',
                GATHERING: '모임',
                RETREAT: '수련회',
              };
              return purposeMap[purpose] || purpose;
            })
            .join(', ')} 진행 시간: ${recreationData.playTime}분`}
        />
        <meta property="og:image" content={recreationData.imageUrl} />
        <meta
          property="og:url"
          content={`https://avab.site/recreation/${recreationData.recreationId}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="AvAb 아브아브" />
      </Helmet>
      <RecreationTopInfo recreationData={recreationData} />
      <RecreationMenuBar scrollRefs={scrollRefs} />
      <RecreationDetailContainer>
        {recreationData && (
          <>
            <RecreationInfoSection ref={infoRef} recreationData={recreationData} />
            <RecreationReviewSection
              ref={reviewRef}
              recreationId={recreationId}
              handleModal={setReviewPostSuccessModalOpen}
            />
            <RelatedRecreationSection ref={relatedRef} recreationId={recreationId} />
            <RecreationRelatedFlowSection ref={flowRef} recreationId={recreationId} />
          </>
        )}
      </RecreationDetailContainer>
      {reviewPostSuccessModalOpen && (
        <ReviewPostSuccessModal handleModal={setReviewPostSuccessModalOpen} />
      )}
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
