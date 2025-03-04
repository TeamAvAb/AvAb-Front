import { useEffect, useState } from 'react';
import { privateAPI } from '../../apis/user';
import RecreationCarousel from './RecreationCarousel';
import styled from 'styled-components';
import LoadingSpinner from '../common/LoadingSpinner';

export default function RecommendedRecreationSection({
  purposes,
  totalPlayTime,
  onAddRecreationClick,
}) {
  const [recreations, setRecreations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // API 호출 함수
    const fetchRecreationData = async () => {
      try {
        const response = await privateAPI.get('/api/recreations/recommended', {
          params: {
            playTime: totalPlayTime,
            purpose: purposes.map((purpose) => purpose.key).join(','),
          },
        });

        // API 응답에서 필요한 데이터만 추출하여 recreationData 상태를 업데이트
        setRecreations(
          response.data.result.map((item) => ({
            id: item.id,
            title: item.title,
            totalStars: Math.round(item.totalStars * 10) / 10,
            keywordList: item.keywordList,
            imageUrl: item.imageUrl,
            summary: item.summary,
            isFavorite: item.isFavorite,
            playTime: item.playTime,
          })),
        );

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recreation data:', error);
      }
    };

    // API 호출 함수 호출
    fetchRecreationData();
  }, []);

  return (
    <>
      <SectionHeading>추천 레크레이션</SectionHeading>
      {!isLoading ? (
        <RecreationCarousel recreations={recreations} onAddRecreationClick={onAddRecreationClick} />
      ) : (
        <Wrapper>
          <LoadingSpinner />
        </Wrapper>
      )}
    </>
  );
}

const SectionHeading = styled.h3`
  ${({ theme }) => theme.text.h5};
  padding: 1rem 0;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.color.grayscale07};
  text-align: center;
`;

const Wrapper = styled.div`
  height: 25rem;
`;
