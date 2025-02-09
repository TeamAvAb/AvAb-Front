import React, { useEffect, useState } from 'react';
import { privateAPI, publicAPI } from '../apis/user';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../components/pagination/Pagination';
import useLoginStore from '../stores/loginStore';
import useLoginModalStore from '../stores/loginModalStore';
import penguinImg from '../assets/scrapflow/penguin.png';
import noScrapImg from '../assets/scrapflow/noScrap.png';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ScrapBtn from '../components/common/button/ScrapBtn';
import FlowCardD from '../components/common/card/flowCard/FlowCardD';

export default function ScrapFlow() {
  const { modalControl } = useLoginModalStore();
  const { isLoggedIn } = useLoginStore((state) => state);

  const navigate = useNavigate();
  const moveToWatch = () => {
    if (isLoggedIn) {
      navigate(`/flow/watch`);
    } else {
      modalControl();
    }
  };
  const moveToMy = () => {
    if (isLoggedIn) {
      navigate(`/flow/my`);
    } else {
      modalControl();
    }
  };
  const moveToMakeFlow = () => {
    if (isLoggedIn) {
      navigate(`/flow/write`);
    } else {
      modalControl();
    }
  };

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
      const response = await privateAPI.get(`/api/users/me/scraps/flows?page=${currentPage}`);
      setDatas(response.data.result.flowList);
      setTotalPages(response.data.result.totalPages);
    } else {
      const response = await publicAPI.get(`/api/users/me/scraps/flows?page=${currentPage}`);
      setDatas(response.data.result.flowList);
      setTotalPages(response.data.result.totalPages);
    }
    setLoading(false);
  };

  const handleScrapBtnClick = async (id) => {
    if (isLoggedIn) {
      try {
        const response = await privateAPI.post(`/api/flows/${id}/scraps`);
        if (response.status === 200) {
          fetchData();
          return;
        } else {
          console.log('플로우 스크랩 실패', response.data);
        }
      } catch (error) {
        throw new Error('ScrapBtn Error in WatchFlow', error);
      }
    } else {
      modalControl();
    }
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
    <Page>
      {/* 플로우 왼쪽 메뉴바 */}
      <SubNavbar>
        <NavbarTitle>일정플로우</NavbarTitle>
        <NavbarOption onClick={moveToWatch}>플로우 구경하기</NavbarOption>
        <NavbarOption onClick={moveToMy}>내가 만든 일정플로우</NavbarOption>
        <NavbarOption className="current">스크랩 일정 플로우</NavbarOption>
      </SubNavbar>
      {/* 스크랩 플로우 구경하기 */}
      <MainSection>
        <FlowMakeBox>
          <FlowMakeCharacter src={penguinImg} />
          <FlowMakeBtn onClick={moveToMakeFlow}>일정플로우 만들기</FlowMakeBtn>
        </FlowMakeBox>
        {loading ? (
          <LoadingSpinner
            comment={
              <span>
                데이터를 불러오는 중입니다.
                <br />
                잠시만 기다려주세요.
              </span>
            }
          />
        ) : datas && datas.length > 0 ? (
          <>
            <FlowBox>
              {datas.map((data) => (
                <FlowCardD content={data}>
                  <ScrapBtn
                    flowId={data.id}
                    isScrap={data.isScraped}
                    onClick={() => handleScrapBtnClick(data.id)}
                  />
                </FlowCardD>
              ))}
            </FlowBox>
            <Pagination
              currentPage={currentPage}
              pageNum={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <NoneAlertBox>
            <NoneAlertImg src={noScrapImg} />
            <NoneAlertTextBox>
              <NoneAlertText className="title">스크랩한 일정플로우가 없습니다!</NoneAlertText>
              <NoneAlertText>지금 바로 플로우를 구경해보세요.</NoneAlertText>
            </NoneAlertTextBox>
          </NoneAlertBox>
        )}
      </MainSection>
      <PageMarginRight />
    </Page>
  );
}

const Page = styled.div`
  display: flex;
`;

// 왼쪽 네비게이션바
const SubNavbar = styled.aside`
  width: 20rem;
  box-sizing: border-box;
  border: 0.5px solid ${({ theme }) => theme.color.grayscale05};
  border-bottom: none;
  background-color: ${({ theme }) => theme.color.main05};
  font-size: ${({ theme }) => theme.text.nav.fontSize};
  font-weight: ${({ theme }) => theme.text.nav.fontWeight};
  color: ${({ theme }) => theme.color.grayscale01};
`;
const NavbarTitle = styled.div`
  height: 5.56rem;
  box-sizing: border-box;
  padding: 1.87rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayscale05};
`;
const NavbarOption = styled.div`
  width: 20rem;
  height: 4.18rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.5px solid ${({ theme }) => theme.color.grayscale05};
  box-sizing: border-box;
  cursor: pointer;

  &.current {
    background-color: ${({ theme }) => theme.color.secondary04};
    font-weight: 700;
  }
`;

const MainSection = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 1.88rem 8.38rem 7rem;
  border-right: 0.5px solid ${({ theme }) => theme.color.grayscale05};
`;

// 플로우 만들기 (캐릭터 + 버튼)
const FlowMakeBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: auto;
`;
const FlowMakeCharacter = styled.img`
  width: 12.47rem;
  z-index: 2;
`;
const FlowMakeBtn = styled.button`
  position: absolute;
  left: 10.94rem;
  width: 32.93rem;
  height: 6.81rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border-radius: 6.25rem;
  background-color: ${({ theme }) => theme.color.main01};
  font-size: ${({ theme }) => theme.text.h2.fontSize};
  font-weight: ${({ theme }) => theme.text.h2.fontWeight};
  color: ${({ theme }) => theme.color.main05};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.main02};
    transition: 0.2s;
  }
`;

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

// 오른쪽 여백
const PageMarginRight = styled.div`
  width: 5.7325%;
  background-color: #f7f8f9;
`;
