import React, { useEffect, useState } from 'react';
import { privateAPI, publicAPI } from '../apis/user.js';
import styled from 'styled-components';
import useLoginModalStore from '../stores/loginModalStore.js';
import noScrapImg from '../assets/scrapflow/noScrap.png';
import useLoginStore from '../stores/loginStore.js';
import SortControl from '../components/common/SortControl';
import ScrapBtn from '../components/common/button/ScrapBtn';
import FlowCardD from '../components/common/card/flowCard/FlowCardD';
import FlowTabLayout from '../components/flow/FlowTabLayout.jsx';

export default function WatchFlow() {
  const { modalControl } = useLoginModalStore();
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

  // 로딩 상태 변화 없이 데이터 가져오기(스크랩 후 페칭 시 사용)
  const fetchData = async () => {
    if (isLoggedIn) {
      const response = await privateAPI.get(`/api/flows?page=${currentPage}&sortBy=${order}`);
      setDatas(response.data.result.flowList);
      setTotalPages(response.data.result.totalPages);
    } else {
      const response = await publicAPI.get(`/api/flows?page=${currentPage}&sortBy=${order}`);
      setDatas(response.data.result.flowList);
      setTotalPages(response.data.result.totalPages);
    }
  };

  // 초기 렌더링 및 페이지, 정렬 옵션 변경에 따른 데이터 페칭
  useEffect(() => {
    getData();
  }, [currentPage, order]);

  return (
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
        <NoneAlertBox>
          <NoneAlertImg src={noScrapImg} />
          <NoneAlertTextBox>
            <NoneAlertText className="title"> 일정플로우가 없습니다!</NoneAlertText>
            <NoneAlertText>지금 바로 일정플로우를 만들어보세요.</NoneAlertText>
          </NoneAlertTextBox>
        </NoneAlertBox>
      )}
    </FlowTabLayout>
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

// 일정플로우 없는 경우
const NoneAlertBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  text-align: center;
`;
const NoneAlertImg = styled.img`
  width: 7.5rem;
`;
const NoneAlertTextBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const NoneAlertText = styled.span`
  font-size: ${({ theme }) => theme.text.paragraph.fontSize};
  font-weight: ${({ theme }) => theme.text.paragraph.fontWeight};

  &.title {
    font-size: ${({ theme }) => theme.text.h4.fontSize};
    font-weight: ${({ theme }) => theme.text.h4.fontWeight};
  }
`;
