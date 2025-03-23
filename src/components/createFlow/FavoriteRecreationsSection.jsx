import { useEffect, useState } from 'react';
import { privateAPI } from '../../apis/user';
import RecreationCarousel from './RecreationCarousel';
import NoData from '../common/NoData';
import styled from 'styled-components';
import LoadingSpinner from '../common/LoadingSpinner';

export default function FavoriteRecreationsSection({
  onAddRecreationClick,
  addRecreationDisabled,
}) {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [recreations, setRecreations] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteRecreations = async () => {
      try {
        if (page > totalPages - 1) {
          return;
        }

        const response = await privateAPI.get('/api/users/me/favorites/recreations', {
          params: { page },
        });

        if (response.status === 200) {
          const {
            data: {
              result: { recreationList, totalPages },
            },
          } = response;
          setRecreations((prev) => [...prev, ...recreationList]);
          setTotalPages(totalPages);
        }

        setInitialLoading(false);
      } catch (error) {
        console.error('즐겨 찾는 레크레이션 불러오기 실패:', error);
      }
    };

    fetchFavoriteRecreations();
  }, [page]);

  const incrementPage = () => setPage((prev) => prev + 1);

  return (
    <>
      <SectionHeading>즐겨 찾는 레크레이션</SectionHeading>
      <Wrapper>
        {initialLoading ? (
          <LoadingSpinner />
        ) : !!recreations.length ? (
          <RecreationCarousel
            recreations={recreations}
            onAddRecreationClick={onAddRecreationClick}
            incrementPage={incrementPage}
            addRecreationDisabled={addRecreationDisabled}
          />
        ) : (
          <NoData variant="favoriteRecreation" />
        )}
      </Wrapper>
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
  height: 28rem;
`;
