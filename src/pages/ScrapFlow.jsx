import React, { useEffect, useState } from 'react';
import { privateAPI, publicAPI } from '../apis/user';
import styled from 'styled-components';
import useLoginStore from '../stores/loginStore';
import useLoginModalStore from '../stores/loginModalStore';
import LoadingSpinner from '../components/common/LoadingSpinner';
import FlowCardD from '../components/common/card/flowCard/FlowCardD';
import FlowTabLayout from '../components/flow/FlowTabLayout';
import NoData from '../components/common/NoData';

export default function ScrapFlow() {
  const { modalControl } = useLoginModalStore();
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
  }, [currentPage]);

  // 스크랩을 해제해서 페이지 수가 줄어들 경우 처리
  useEffect(() => {
    if (totalPages === 1) {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        setCurrentPage(0);
      }
    }
  }, [totalPages]);

  return (
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
