import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { privateAPI } from '../apis/user';
import Pagination from '../components/pagination/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import RecreationCardWHashtag from '../components/common/card/recreationCard/RecreationCardWHashtag';
import SideNavLayout from '../layout/SideNavLayout';
import NoData from '../components/common/NoData';
import PageMetadata from '@/components/helmet/PageMetadata.js';
import SITE_URL from '@/constants/url.js';

export default function MyFavoriteRecreations() {
  // 데이터 가져오기
  const [recreations, setRecreations] = useState([]);
  // 데이터 불러오는 동안 로딩
  const [loading, setLoading] = useState(false);
  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(0);
  //전체 페이지 수
  const [pages, setPages] = useState(1);

  // 데이터를 다시 불러오는 함수
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await privateAPI.get(
        `/api/users/me/favorites/recreations?page=${currentPage}`,
      );
      setRecreations(response.data.result.recreationList);
      setPages(response.data.result.totalPages);
      setLoading(false);
    } catch (error) {
      console.log('레크레이션 로드 요청 에러 : ', error);
    }
  };

  useEffect(() => {
    if (recreations.length === 0) {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        setCurrentPage(0);
      }
    }
  }, [recreations]);

  // 첫 렌더링 및 페이지 변경 시 데이터를 불러옴
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <>
      <PageMetadata
        title="즐겨 찾는 레크레이션 | AvAb - 아브아브"
        description="AvAb 아브아브에서 좋아하는 레크레이션을 즐겨찾기하고, 빠르게 찾아보세요."
        keywords="즐겨찾기"
        url={SITE_URL.MY_FAVORITE_RECREATIONS}
      />
      <SideNavLayout selectedPage="favorites" parentTab="my-page">
        <RecreationWrap>
          <RecreationTitle id="move">즐겨 찾는 레크레이션</RecreationTitle>
          {loading ? (
            <LoadingSpinner />
          ) : recreations.length !== 0 ? (
            <RecreationList>
              <FavoriteRecreations>
                {recreations.map((data) => (
                  <RecreationCardWHashtag key={data.id} content={data} refetch={fetchData} />
                ))}
              </FavoriteRecreations>
              <Pagination
                currentPage={currentPage}
                pageNum={pages}
                setCurrentPage={setCurrentPage}
                scrollLocation={document.querySelector('#move').offsetTop}
              />
            </RecreationList>
          ) : (
            <NoData variant="favoriteRecreation" />
          )}
        </RecreationWrap>
      </SideNavLayout>
    </>
  );
}

const RecreationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const RecreationTitle = styled.h1`
  ${({ theme }) => theme.text.h2};
  padding: 3rem 0;
`;

const FavoriteRecreations = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 18rem);
  row-gap: 1.2rem;
  column-gap: 1.4rem;
`;

const RecreationList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.5rem;
  padding-bottom: 2rem;
`;
