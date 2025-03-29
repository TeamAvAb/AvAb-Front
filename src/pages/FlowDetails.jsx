import React, { useEffect, useState } from 'react';
import { privateAPI, publicAPI } from '../apis/user';
import styled from 'styled-components';
import useLoginStore from '../stores/loginStore';
import { useLocation } from 'react-router-dom';
import FlowInfoSection from '../components/flowDetails/FlowInfoSection';
import FlowSummarySection from '../components/flowDetails/FlowSummarySection';
import FlowTimelineSection from '../components/flowDetails/FlowTimelineSection';
import NotFound from './NotFound';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PageMetadata from '@/components/helmet/PageMetadata.js';
import SITE_URL from '@/constants/url.js';
import PURPOSE from '@/constants/enum/purpose.js';

export default function FlowDetails() {
  const { isLoggedIn } = useLoginStore((state) => state);

  const location = useLocation();
  const id = location.pathname.split('/')[3];

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = isLoggedIn ? privateAPI : publicAPI;
        const response = await api.get(`/api/flows/${id}`);
        setData(response.data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, isLoggedIn]);

  if (isLoading) {
    return <LoadingSpinner height="lg" />;
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <>
      <PageMetadata
        title={`${data.flowDetail.title}`}
        description={`${data.flowDetail.title} 일정 플로우에 대한 상세 정보`}
        keywords={data.flowDetail.purposeList.map((purpose) => PURPOSE[purpose].value).join(', ')}
        url={SITE_URL.FLOW_DETAIL(id)}
        image={data.flowDetail.imageUrl}
        type="article"
      />
      <FlowInfoSection flow={data.flowDetail} />
      <FlowDetailsMainSection>
        <FlowSummarySection flow={data.flowDetail} />
        <FlowTimelineSection flowTitle={data.flowDetail.title} recreations={data.recreations} />
      </FlowDetailsMainSection>
    </>
  );
}

const FlowDetailsMainSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0 8rem;
  background-color: ${({ theme }) => theme.color.grayscale07};
  gap: 2.5rem;
`;
