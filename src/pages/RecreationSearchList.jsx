import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Search from '../components/main/Search';
import Pagination from '../components/pagination/Pagination';
import { Helmet } from 'react-helmet';
import useLoginStore from '../stores/loginStore';
import { privateAPI, publicAPI } from '../apis/user';
import LoadingSpinner from '../components/common/LoadingSpinner';
import RecreationCardL from '../components/common/card/recreationCard/RecreationCardL';
import qs from 'qs';
import SortControl from '../components/common/SortControl';
import NoData from '../components/common/NoData';
import { useQuery } from '@tanstack/react-query';
import cryinAvb from '../assets/character/cryingAvb.png';

export default function RecreationSearchList() {
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(0);
  // 정렬 옵션
  const [order, setOrder] = useState('LIKE');

  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const location = useLocation();

  const initialParams = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true, parseArrays: true }),
    [location.search],
  );

  const params = { ...initialParams, page: currentPage, sortBy: order };

  const getRecreationList = async (isLoggedIn, params) => {
    const requestURL = `/api/recreations`;
    const api = isLoggedIn ? privateAPI : publicAPI;
    try {
      const response = await api.get(requestURL, { params });
      if (response.status === 200) {
        return response.data.result;
      } else {
        console.log('Error Accrued', response);
      }
    } catch (error) {
      console.log('Error Accrued', error);
    }
  };

  const resetPage = () => {
    setCurrentPage(0);
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['recreationList', isLoggedIn, params],
    queryFn: () => getRecreationList(isLoggedIn, params),
    staleTime: 60 * 1000 * 5, // 5분
    gcTime: 60 * 1000 * 10, // 10분
  });

  return (
    <>
      <Helmet>
        <title>AvAb | 레크레이션 검색 결과</title>
        <meta
          name="description"
          content="다양한 레크레이션을 검색하고 찾을 수 있습니다. 원하는 레크레이션을 찾아보세요."
        />
        <meta property="og:title" content="레크레이션 검색 결과" />
        <meta
          property="og:description"
          content="다양한 레크레이션을 검색하고 찾을 수 있습니다. 원하는 레크레이션을 찾아보세요."
        />
      </Helmet>
      <Container>
        <Search filtersOpen initialParams={params} resetPage={resetPage} />
        <RecreationsContainer>
          <ResultHeaderContainer>
            <ResultHeader id="move">레크레이션 찾기</ResultHeader>
            <SortControl setOption={setOrder} selectedOption={order} isFlow={false} />
          </ResultHeaderContainer>
          {isLoading ? (
            <LoadingSpinner height="lg" />
          ) : error ? (
            <ErroAlert>
              <AlertImg src={cryinAvb} />
              <TextContainer>
                <h2>에러가 발생했습니다!</h2>
                <p>다시 시도해주세요.</p>
              </TextContainer>
            </ErroAlert>
          ) : data.recreationList.length === 0 ? (
            <NoData variant="search" />
          ) : (
            <>
              <RecreationWrapper>
                {data.recreationList.map((recreation) => (
                  <RecreationCardL content={recreation} key={recreation.id} />
                ))}
              </RecreationWrapper>
              <Pagination
                currentPage={currentPage}
                pageNum={data.totalPages}
                setCurrentPage={setCurrentPage}
                scrollLocation={document.querySelector('#move')?.offsetTop ?? 0}
              />
            </>
          )}
        </RecreationsContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const RecreationsContainer = styled.div`
  width: 86rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5rem;
`;

const ResultHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3.5rem;
`;

const ResultHeader = styled.h1`
  ${({ theme }) => theme.text.h2}
  margin-bottom: 3rem;
`;

//레크레이션 찾기
const RecreationWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 1.2rem;
  column-gap: 1.8rem;
  margin-bottom: 3rem;
`;

const ErroAlert = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 100%;
`;

const AlertImg = styled.img`
  width: 12rem;
`;

const TextContainer = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

  h2 {
    ${({ theme }) => theme.text.h4}
    line-height: normal;
  }

  p {
    ${({ theme }) => theme.text.paragraph}
    line-height: normal;
  }
`;
