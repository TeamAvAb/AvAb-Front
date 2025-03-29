import React, { useEffect, useState } from 'react';
import { privateAPI, publicAPI } from '../apis/user';
import styled from 'styled-components';
import useModal from '../hooks/useModal';
import FlowDeleteModal from '../components/modal/FlowDeleteModal';
import useLoginStore from '../stores/loginStore';
import FlowCardD from '../components/common/card/flowCard/FlowCardD';
import FlowTabLayout from '../components/flow/FlowTabLayout';
import NoData from '../components/common/NoData';
import PageMetadata from '@/components/helmet/PageMetadata.js';
import SITE_URL from '@/constants/url.js';

export default function MyFlow() {
  const { isLoggedIn } = useLoginStore((state) => state);
  const { ModalWrapper, openModal, closeModal } = useModal();

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
    if (isLoggedIn) {
      const response = await privateAPI.get(`/api/users/me/flows?page=${currentPage}`);
      setDatas(response.data.result.flowList);
      setTotalPages(response.data.result.totalPages);
    } else {
      const response = await publicAPI.get(`/api/users/me/flows?page=${currentPage}`);
      setDatas(response.data.result.flowList);
      setTotalPages(response.data.result.totalPages);
    }
    setLoading(false);
  };

  const handleDeleteClick = (flowId) => {
    openModal();
    localStorage.setItem('flowDeleteTarget', flowId);
  };

  // 초기 렌더링 및 페이지 변경에 따른 데이터 페칭
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <>
      <PageMetadata
        title="내가 만든 일정 플로우 | AvAb 아브아브"
        description="AvAb 아브아브에서 나만의 레크레이션 일정을 만들고, 다른 사람들과 공유해보세요."
        keywords="계획, 일정, 플로우"
        url={SITE_URL.MY_FLOW}
      />
      <FlowTabLayout
        selectedPage="my-flow"
        isloading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePaginationClick={setCurrentPage}
      >
        {!loading && datas && datas.length > 0 ? (
          <>
            <FlowBox>
              {datas.map((data) => (
                <FlowCardD key={data.id} content={data} isOwner onDeleteClick={handleDeleteClick} />
              ))}
              <ModalWrapper>
                <FlowDeleteModal close={closeModal} refetch={fetchData} />
              </ModalWrapper>
            </FlowBox>
          </>
        ) : (
          <NoData variant="myFlow" />
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
