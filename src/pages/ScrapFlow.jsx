import React, { useEffect, useState } from 'react';
import { privateAPI, publicAPI } from '../apis/user';
import styled from 'styled-components';
import useLoginStore from '../stores/loginStore';
import LoadingSpinner from '../components/common/LoadingSpinner';
import FlowCardD from '../components/common/card/flowCard/FlowCardD';
import FlowTabLayout from '../components/flow/FlowTabLayout';
import NoData from '../components/common/NoData';
import PageMetadata from '@/components/helmet/PageMetadata.js';
import SITE_URL from '@/constants/url.js';

export default function ScrapFlow() {
  const { isLoggedIn } = useLoginStore((state) => state);

  // 데이터 가져오기
  const [datas, setDatas] = useState([]);
  // 데이터 불러오는 동안 로딩
  const [loading, setLoading] = useState(false);
  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(0);
  // 전체 페이지 수
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    setLoading(true);

    const api = isLoggedIn ? privateAPI : publicAPI;
    const response = await api.get(`/api/users/me/scraps/flows?page=${currentPage}`);
    setDatas(response.data.result.flowList);
    setTotalPages(response.data.result.totalPages);

    setLoading(false);
  };

  // 초기 렌더링 및 페이지 변경에 따른 데이터 페칭
  useEffect(() => {
    fetchData();
  }, [currentPage, fetchData]);

  // 스크랩을 해제해서 페이지 수가 줄어들 경우 처리
  useEffect(() => {
    if (totalPages === 1) {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        setCurrentPage(0);
      }
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <PageMetadata
        title="내가 스크랩한 플로우 | AvAb - 아브아브"
        description="아브아브에서 좋아하는 일정 플로우를 스크랩하고 빠르게 찾아보세요."
        keywords="스크랩, 플로우, 일정"
        url={SITE_URL.MY_SCRAP_FLOW}
      />
      <FlowTabLayout
        selectedPage="scrap-flow"
        isloading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePaginationClick={setCurrentPage}
      >
        {loading ? (
          <LoadingSpinner />
        ) : datas && datas.length > 0 ? (
          <>
            <FlowBox>
              {datas.map((data) => (
                <FlowCardD key={data.id} content={data} refetch={fetchData} />
              ))}
            </FlowBox>
          </>
        ) : (
          <NoData variant="scrapFlow" />
        )}
      </FlowTabLayout>
    </>
  );
}

// 플로우 박스 - Grid
const FlowBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1.25rem;
  column-gap: 7.5rem;
  margin: 2.44rem 0 5.08rem;
`;
