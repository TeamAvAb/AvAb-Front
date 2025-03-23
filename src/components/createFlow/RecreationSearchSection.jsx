import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { privateAPI } from '../../apis/user';
import useDebouncedEffect from '../../hooks/useDebouncedEffect';
import searchIconImg from '../../assets/common/searchIcon.svg';
import RecreationCarousel from './RecreationCarousel';
import NoData from '../common/NoData';
import styled from 'styled-components';

export default function RecreationSearchSection({ onAddRecreationClick, addRecreationDisabled }) {
  const [recreations, setRecreations] = useState([]);
  const [page, setPage] = useState(0);

  const { register, watch } = useForm({
    defaultValues: {
      searchKeyword: '',
    },
  });

  const incrementPage = () => setPage((prev) => prev + 1);

  const fetchRecreations = async (refresh) => {
    try {
      const response = await privateAPI.get('/api/recreations', {
        params: { page, searchKeyword: watch('searchKeyword') },
      });

      if (response.status === 200) {
        const {
          data: {
            result: { recreationList },
          },
        } = response;

        if (refresh) {
          setRecreations(recreationList);
        } else {
          setRecreations((prev) => [...prev, ...recreationList]);
        }
      }
    } catch (error) {
      console.error('즐겨 찾는 레크레이션 불러오기 실패:', error);
    }
  };

  useDebouncedEffect(
    () => {
      setPage(0);
      fetchRecreations(true);
    },
    300,
    [watch('searchKeyword')],
  );

  useEffect(() => {
    fetchRecreations(false);
  }, [page]);

  return (
    <>
      <SearchBox>
        <SearchInput
          placeholder="오늘 MT 레크레이션 할 때 뭐하지?"
          {...register('searchKeyword')}
        />
        <SearchIcon src={searchIconImg} alt="검색" />
      </SearchBox>
      {!!recreations.length ? (
        <RecreationCarousel
          recreations={recreations}
          onAddRecreationClick={onAddRecreationClick}
          incrementPage={incrementPage}
          addRecreationDisabled={addRecreationDisabled}
        />
      ) : (
        <NoDataContainer>
          <NoData variant="search" />
        </NoDataContainer>
      )}
    </>
  );
}

const SearchBox = styled.form`
  width: 100%;
  display: flex;
  position: relative;
`;

const SearchInput = styled.input`
  ${({ theme }) => theme.text.paragraph};
  border-radius: 1.25rem;
  padding: 1.25rem 4rem 1.25rem 2rem;
  border: 2px solid ${({ theme }) => theme.color.main01};
  flex: 1;

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale04};
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
`;

const NoDataContainer = styled.div`
  height: 25rem;
`;
