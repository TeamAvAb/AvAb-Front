import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Search from '../components/main/Search';
import Pagination from '../components/pagination/Pagination';

import useLoginStore from '../stores/loginStore';
import { privateAPI, publicAPI } from '../apis/user';
import LoadingSpinner from '../components/common/LoadingSpinner';
import RecreationCardL from '../components/common/card/recreationCard/RecreationCardL';
import qs from 'qs';
import SortControl from '../components/common/SortControl';
import NoData from '../components/common/NoData';
import PageMetadata from '@/components/helmet/PageMetadata.js';
import SITE_URL from '@/constants/url.js';

export default function RecreationSearchList() {
  const { isLoggedIn } = useLoginStore((state) => state);
  const location = useLocation();
  const initialParams = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true, parseArrays: true }),
    [location.search],
  );

  // 데이터 가져오기
  const [datas, setDatas] = useState([]);
  // 데이터 불러오는 동안 로딩
  const [loading, setLoading] = useState(false);
  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(0);
  //전체 페이지 수
  const [pages, setPages] = useState(1);
  // 정렬 옵션
  const [order, setOrder] = useState('LIKE');

  // 처음 렌더링 시에만 데이터 불러오기
  useEffect(() => {
    const requestURL = `/api/recreations`;

    const call = async () => {
      setLoading(true);
      try {
        const api = isLoggedIn ? privateAPI : publicAPI;
        const params = { ...initialParams, page: currentPage, sortBy: order };

        const response = await api.get(requestURL, { params });
        setDatas(response.data.result.recreationList);
        setPages(response.data.result.totalPages);

        setLoading(false);
      } catch (error) {
        console.log('레크레이션 로드 요청 에러 : ', error);
      }
    };
    call();
  }, [currentPage, order, isLoggedIn, initialParams]);
  return (
    <>
      <PageMetadata
        title="레크레이션 검색 결과 | AvAb - 아브아브"
        description="AvAb 아브아브에서 다양한 레크레이션을 손쉽게 검색하고 찾아보세요."
        keywords="검색, 결과"
        url={SITE_URL.RECREATION_SEARCH_LIST}
      />
      <Container>
        <Search filtersOpen initialParams={initialParams} />
        <RecreationsContainer>
          <ResultHeaderContainer>
            <ResultHeader id="move">레크레이션 찾기</ResultHeader>
            <SortControl setOption={setOrder} selectedOption={order} isFlow={false} />
          </ResultHeaderContainer>
          {loading ? (
            <LoadingSpinner height="lg" />
          ) : datas.length === 0 ? (
            <NoData variant="search" />
          ) : (
            <>
              <RecreationWrapper>
                {datas.map((data) => (
                  <RecreationCardL content={data} key={data.id} />
                ))}
              </RecreationWrapper>

              <Pagination
                currentPage={currentPage}
                pageNum={pages}
                setCurrentPage={setCurrentPage}
                scrollLocation={document.querySelector('#move').offsetTop}
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
