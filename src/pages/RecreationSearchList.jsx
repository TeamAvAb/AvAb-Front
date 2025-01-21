import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Search from '../components/main/Search';
import Pagination from '../components/pagination/Pagination';
import SortControl from '../components/SortControl';
import noScrapImg from '../assets/scrapflow/noScrap.png';

import { Helmet } from 'react-helmet';

import LoadingSpinner from '../components/LoadingSpinner';
import useLoginStore from '../stores/loginStore';
import RecreationCardL from '../components/card/recreationCard/RecreationCardL';
import { privateAPI, publicAPI } from '../apis/user';

export default function RecreationSearchList({}) {
  const { isLoggedIn } = useLoginStore((state) => state);
  const location = useLocation();
  const param = location.search + '&';

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
        if (location.search === '') {
          if (isLoggedIn) {
            const response = await privateAPI.get(
              `/api/recreations?page=${currentPage}&sortBy=${order}`,
            );
            console.log('전체 레크:', response);
            setDatas(response.data.result.recreationList);
            setPages(response.data.result.totalPages);
          } else {
            const response = await publicAPI.get(
              `/api/recreations?page=${currentPage}&sortBy=${order}`,
            );
            console.log('전체 레크:', response);
            setDatas(response.data.result.recreationList);
            setPages(response.data.result.totalPages);
          }
        } else {
          if (isLoggedIn) {
            const response = await privateAPI.get(
              requestURL + param + `sortBy=${order}&page=${currentPage}`,
            );
            console.log('전체 레크:', response);
            setDatas(response.data.result.recreationList);
            setPages(response.data.result.totalPages);
          } else {
            const response = await publicAPI.get(
              requestURL + param + `sortBy=${order}&page=${currentPage}`,
            );
            console.log('전체 레크:', response);
            setDatas(response.data.result.recreationList);
            setPages(response.data.result.totalPages);
          }
        }
        setLoading(false);
      } catch (error) {
        console.log('레크레이션 로드 요청 에러 : ', error);
      }
    };
    call();
  }, [location, currentPage, order]);
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
        <Search filtersOpen />
        <RecreationsContainer>
          <ResultHeaderContainer>
            <ResultHeader id="move">레크레이션 찾기</ResultHeader>
            <SortControl
              setOption={setOrder}
              selectedOption={order}
              marginright="43px"
              isFlow={false}
            />
          </ResultHeaderContainer>
          {loading ? (
            <LoadingSpinner
              comment={
                <span>
                  레크레이션을 불러오고 있습니다.
                  <br />
                  잠시만 기다려주세요.
                </span>
              }
            />
          ) : datas.length === 0 ? (
            <NoData>
              <NoDataImg src={noScrapImg} />
              <NoDataDescription>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>검색 결과가 없습니다!</div>
                <div style={{ marginTop: '0.5rem', fontSize: '1.25rem' }}>
                  다른 조건으로 검색해보세요.
                </div>
              </NoDataDescription>
            </NoData>
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
`;

const ResultHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3.5rem;
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

//검색 결과가 없는 경우
const NoData = styled.div`
  width: 100%;
  text-align: center;
`;

const NoDataImg = styled.img`
  width: 9rem;
`;

const NoDataDescription = styled.div`
  width: 100%;
  margin-top: 1rem;
  text-align: center;
`;
