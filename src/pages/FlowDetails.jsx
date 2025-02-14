import React, { useEffect, useState } from 'react';
import { privateAPI, publicAPI } from '../apis/user';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import useLoginStore from '../stores/loginStore';
import { useLocation } from 'react-router-dom';
import FlowInfoSection from '../components/flowDetails/FlowInfoSection';
import FlowSummarySection from '../components/flowDetails/FlowSummarySection';
import FlowRecreationSection from '../components/flowDetails/FlowRecreationSection';
import NotFound from './NotFound';
import LoadingSpinner from '../components/common/LoadingSpinner';

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
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner height="lg" />;
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    data.length !== 0 && (
      <>
        <Helmet>
          <title>{`${data.flowDetail.title} - AvAb | 레크레이션 플로우 공유`}</title>
          <meta
            name="description"
            content={`${data.flowDetail.title} 플로우에 대한 상세 정보입니다. AvAb에서 다양한 레크레이션 정보를 확인하고, 자신만의 플로우를 만들어 공유하세요.`}
          />
        </Helmet>

        <FlowInfoSection flow={data.flowDetail} />
        <FlowDetailsMainSection>
          <FlowSummarySection flow={data.flowDetail} />
          <FlowRecreationSection flowTitle={data.flowDetail.title} recreations={data.recreations} />
        </FlowDetailsMainSection>
      </>
    )
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
