import styled from 'styled-components';
import React, { forwardRef, useEffect, useState } from 'react';
import RelatedRecreationCard from './RelatedRecreationCard';
import { privateAPI, publicAPI } from '../../apis/user';
import useLoginStore from '../../stores/loginStore.js';

const RelatedRecreationSection = forwardRef(({ recreationId }, ref) => {
  const [relatedData, setRelatedData] = useState([]);
  const { isLoggedIn } = useLoginStore((state) => state);
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const api = isLoggedIn ? privateAPI : publicAPI;
        const response = await api.get(`/api/recreations/${recreationId}/related/recreations`);
        setRelatedData(response.data.result);
        console.log('연관 레크레이션: ', response);
      } catch (error) {
        console.error('연관 레크레이션 오류: ', error);
      }
    };

    fetchRelated();
  }, [recreationId]);

  return (
    <RelatedRecreationContainer ref={ref}>
      <TitleText>연관 레크레이션</TitleText>
      <SubText>해당 레크레이션과 함께 사용할 수 있어요!</SubText>
      {relatedData.map((related) => (
        <RelatedRecreationCard key={related.id} recreation={related} />
      ))}
    </RelatedRecreationContainer>
  );
});

export default RelatedRecreationSection;

const RelatedRecreationContainer = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 1.25rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleText = styled.h3`
  ${({ theme }) => theme.text.h4}
`;

const SubText = styled.div`
  color: ${({ theme }) => theme.color.grayscale04};
  ${({ theme }) => theme.text.paragraph}
`;
