import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { privateAPI } from "../apis/user";

import FavoritesBox from "../components/mypage/FavoritesBox";
import Pagination from "../components/pagination/Pagination";
import LogoutP from "../assets/mypage/LogoutImg.svg";
import noScrapImg from "../assets/scrapflow/noScrap.png";
import LoadingSpinner from "../components/LoadingSpinner";
import useLoginStore from "../stores/loginStore";

export default function FavoriteRecreation() {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const { setIsLoggedIn } = useLoginStore();
  const navigate = useNavigate();

  const handleMyInfoClick = () => {
    navigate(`/mypage/myinfo`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleFavoritesClick = () => {
    navigate(`/mypage/favorites`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await privateAPI.delete("/api/auth/logout");
      if (response.data.isSuccess === true) {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      console.log("로그아웃 요청 에러 : ", error);
    }
    setLogoutModalOpen(false);
  };

  // 데이터 가져오기
  const [datas, setDatas] = useState([]);
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
        `/api/users/me/favorites/recreations?page=${currentPage}`
      );
      setDatas(response.data.result.recreationList);
      setPages(response.data.result.totalPages);
      setLoading(false);
    } catch (error) {
      console.log("레크레이션 로드 요청 에러 : ", error);
    }
  };

  // 첫 렌더링 및 페이지 변경 시 데이터를 불러옴
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // 즐겨찾기를 해제해서 페이지 수가 줄어들 경우 처리
  useEffect(() => {
    if (datas.length === 0) {
      if (currentPage > 1) setCurrentPage((prev) => prev - 1);
      else setCurrentPage(0);
    }
  }, [datas]);

  // 즐겨찾기 변경 시 목록을 업데이트하는 함수
  const onFavoriteChange = () => {
    fetchData(); // 데이터를 다시 불러옴
  };

  return (
    <Container>
      {/*왼쪽 메뉴바*/}
      <SideBar>
        <Title>마이페이지</Title>
        <MenuList>
          <MenuItem onClick={handleMyInfoClick}>내 정보</MenuItem>
          <MenuItem
            style={{ backgroundColor: "#B1BEFF" }}
            onClick={handleFavoritesClick}
          >
            즐겨 찾는 레크레이션
          </MenuItem>
          <MenuItem onClick={openLogoutModal}>로그아웃</MenuItem>
        </MenuList>
      </SideBar>

      {/*중앙 부분*/}
      <Content>
        <RecreationWrap>
          <RecreationTitle id="move">레크레이션 찾기</RecreationTitle>
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
          ) : datas.length !== 0 ? (
            <>
              <FavoritesParent>
                {datas &&
                  datas.map((data) => (
                    <FavoritesBox
                      content={data}
                      onFavoriteChange={onFavoriteChange}
                    />
                  ))}
              </FavoritesParent>
              <Pagination
                currentPage={currentPage}
                pageNum={pages}
                setCurrentPage={setCurrentPage}
                scrollLocation={document.querySelector("#move").offsetTop}
              />
            </>
          ) : (
            <NoneWrap>
              <MyFlowNoneImg src={noScrapImg} />
              <NoneFavorite>즐겨찾기한 레크레이션이 없습니다</NoneFavorite>
            </NoneWrap>
          )}
        </RecreationWrap>
      </Content>

      {/*우측 바*/}
      <RightSide />

      {/*로그아웃 모달*/}
      {isLogoutModalOpen && (
        <LogoutModal>
          <ModalContent>
            <ModalTitle>로그아웃 하시게요?</ModalTitle>
            <SemiTitle>더 많은 혜택이 기다리고 있어요.</SemiTitle>
            <LogoutImg src={LogoutP} />
            <ModalBut>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
              <CloseButton onClick={closeLogoutModal}>닫기</CloseButton>
            </ModalBut>
          </ModalContent>
        </LogoutModal>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

//왼쪽 메뉴바
const SideBar = styled.div`
  width: 320px;
  height: 713px;
  box-sizing: border-box;
  font-size: 22px;
  border: solid #cacdd2 1px;
  border-bottom: none;
  border-right: none;
  color: #1b1d1f;
`;

const Title = styled.div`
  width: 260px;
  padding: 30px;
  font-size: 22px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid #cacdd2 1px;
  border-left: none;
  border-right: none;
`;

const MenuItem = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 20px;
  width: 280px;
  border-bottom: solid #cacdd2 1px;
`;

//중앙 부분
const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border: solid #cacdd2 1px;
  border-bottom: none;
`;

const RecreationWrap = styled.div`
  width: 1128px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RecreationTitle = styled.div`
  margin-top: 100px;
  font-size: 40px;
  font-weight: 600;
`;

const FavoritesParent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 284px);
  row-gap: 20px;
  column-gap: 30px;
  margin-top: 39px;
`;

const NoneWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyFlowNoneImg = styled.img`
  margin-top: 150px;
  width: 150px;
  height: 150px;
`;

const NoneFavorite = styled.div`
  width: 100%;
  margin-top: 20px;
  text-align: center;
  height: 150px;
  font-size: 30px;
`;

//오른쪽 바
const RightSide = styled.div`
  width: 5.7325%;
  background-color: #f7f8f9;
`;

//로그아웃 모달
const LogoutModal = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #f7f8f9;
  width: 400px;
  height: 395px;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 230px;
`;

const ModalTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

const SemiTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-top: 10px;
`;

const LogoutImg = styled.img`
  width: 200px;
  height: 210px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ModalBut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  border-top: solid gray 1px;
  width: 440px;
`;

const LogoutButton = styled.div`
  display: flex;
  justify-content: center;
  border: solid black 1px;
  padding: 12px 10px;
  border-radius: 30px;
  width: 110px;
  font-weight: 600;
  cursor: pointer;
`;

const CloseButton = styled(LogoutButton)`
  background-color: #4036ed;
  color: white;
  border: none;
  margin-left: 80px;
`;
