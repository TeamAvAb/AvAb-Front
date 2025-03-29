import React, { useEffect, useState } from 'react';
import { privateAPI, publicAPI } from '../apis/user.js';
import styled from 'styled-components';
import useLoginStore from '../stores/loginStore.js';
import SortControl from '../components/common/SortControl';
import FlowCardD from '../components/common/card/flowCard/FlowCardD';
import FlowTabLayout from '../components/flow/FlowTabLayout.jsx';
import NoData from '../components/common/NoData';
import PageMetadata from '@/components/helmet/PageMetadata.js';
import SITE_URL from '@/constants/url.js';

export default function WatchFlow() {
  const { isLoggedIn, userId } = useLoginStore((state) => state);

  // 데이터 가져오기
  const [datas, setDatas] = useState([]);
  // 데이터 불러오는 동안 로딩
  const [loading, setLoading] = useState(false);
  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(0);
  // 전체 페이지 수
  const [totalPages, setTotalPages] = useState(1);
  // 필터링 옵션
  const [order, setOrder] = useState('RECENT');

  // 로딩 상태 변화시키면서 데이터 가져오기
  const getData = async () => {
    setLoading(true);
    if (isLoggedIn) {
      try {
        const response = await privateAPI.get(`/api/flows?page=${currentPage}&sortBy=${order}`);
        setDatas(response.data.result.flowList);
        setTotalPages(response.data.result.totalPages);
      } catch (error) {
        throw new Error('플로우 구경하기 데이터 받아오기 실패');
      }
    } else {
      try {
        const response = await publicAPI.get(`/api/flows?page=${currentPage}&sortBy=${order}`);
        setDatas(response.data.result.flowList);
        setTotalPages(response.data.result.totalPages);
      } catch (error) {
        throw new Error('플로우 구경하기 데이터 받아오기 실패');
      }
    }
    setLoading(false);
  };

  // 초기 렌더링 및 페이지, 정렬 옵션 변경에 따른 데이터 페칭
  useEffect(() => {
    getData();
  }, [currentPage, order]);

  return (
    <>
      <PageMetadata
        title="플로우 구경하기 | AvAb - 아브아브"
        description="AvAb 아브아브에서 플로우를 구경하고 MT, 수련회, 파티, 이벤트에서 다 함께 즐겨보세요."
        keywords="플로우, 구경"
        url={SITE_URL.FLOW}
      />
      <FlowTabLayout
        selectedPage="watch-flow"
        isloading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePaginationClick={setCurrentPage}
      >
        <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
          <SortControl setOption={setOrder} selectedOption={order} isFlow />
        </div>
        {!loading && datas && datas.length > 0 ? (
          <>
            <FlowBox>
              {datas.map((data) => (
                <FlowCardD key={data.id} content={data} isOwner={data.author.id === userId} />
              ))}
            </FlowBox>
          </>
        ) : (
          <NoData variant="flowError" />
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
