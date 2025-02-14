import React, { useEffect, useState } from 'react';
import { privateAPI, publicAPI } from '../apis/user';
import styled from 'styled-components';
import useModal from '../hooks/useModal';
import FlowDeleteModal from '../components/modal/FlowDeleteModal';
import useLoginStore from '../stores/loginStore';
import noFlowImg from '../assets/myflow/noFlow.png';
import Button from '../components/common/button/Button';
import FlowCardD from '../components/common/card/flowCard/FlowCardD';
import FlowTabLayout from '../components/flow/FlowTabLayout';

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
              <FlowCardD content={data} isOwner="true">
                <>
                  <Button backgroundColor="grayscale01" color="main05" border size="xs">
                    수정
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(data.id)}
                    backgroundColor="main05"
                    color="grayscale04"
                    border
                    size="xs"
                  >
                    삭제
                  </Button>
                </>
              </FlowCardD>
            ))}
            <ModalWrapper children={<FlowDeleteModal close={closeModal} refetch={fetchData} />} />
          </FlowBox>
        </>
      ) : (
        <NoneAlertBox>
          <NoneAlertImg src={noFlowImg} />
          <NoneAlertTextBox>
            <NoneAlertText className="title"> 내가 만든 일정플로우가 없습니다!</NoneAlertText>
            <NoneAlertText>위의 버튼을 눌러 나만의 일정플로우를 만들어 보세요.</NoneAlertText>
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
