import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

import FavoritesBox from "../components/mypage/FavoritesBox";
import Pagination from "../components/pagination/Pagination.jsx";
import LogoutP from "../assets/mypage/LogoutImg.svg"
import NoneImg from "../assets/Footer/none.png"

import { privateAPI } from "../apis/user";

const ex = {
    isSuccess: true,
    code: "string",
    message: "string",
    result: {
      recreationList: [
        {
          id: 0,
          hashtagList: [
            "해시태그"
          ],
          title: "레크레이션 제목",
          totalStars: 4.1,
          keywordList: [
            "순발력", "창의력", "액티브"
          ],
          imageUrl: NoneImg,
          summary: "string",
          isFavorite: true
        }
      ],
      totalPages: 0
    }
};
export const exArray = [];
for (let i = 0; i < 46; i++) exArray.push(ex);

export default function FavoriteRecreation({ handleLogin, isLoggedIn }) {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleMyInfoClick = () => {
    navigate(`/mypage/myinfo`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleFavoritesClick = () => {
    navigate(`/mypage/favorites`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 데이터 가져오기
  const [datas, setDatas] = useState(exArray);
  // 데이터 불러오는 동안 로딩
  const [loading, setLoading] = useState(false);
  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지 당 데이터 수
  const datasPerPage = 6;

  // 처음 렌더링 시에만 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get("https://dev.avab.shop/api/users/me/favorites/recreations");
      setDatas(response.data);
      setLoading(false);
      console.log(datas);
    };
    fetchData();
  }, []);

  // 현재 페이지에서 마지막 데이터의 인덱스
  const indexOfLast = currentPage * datasPerPage;
  // 현재 페이지에서 첫번째 데이터의 인덱스
  const indexOfFirst = indexOfLast - datasPerPage;
  const currentDatas = (datas) => {
    let currentDatas = datas.slice(indexOfFirst, indexOfLast);
    return currentDatas;
  };

  // console.log(exArray);

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };
  
  const handleLogout = async () => {
    try {
      const response = await privateAPI.delete("/api/auth/logout");
      localStorage.clear();
    } catch (error) {
      console.log("로그아웃 요청 에러 : ", error);
    }
    handleLogin(false);
    setLogoutModalOpen(false);
  };

  return (
    <Container>
    {/*왼쪽 메뉴바*/}
      <SideBar>
        <Title>마이페이지</Title>
        <MenuList>
            <MenuItem onClick={handleMyInfoClick}>내 정보</MenuItem>
            <MenuItem style={{backgroundColor: "#B1BEFF"}} onClick={handleFavoritesClick}>즐겨 찾는 레크레이션</MenuItem>
            <MenuItem onClick={openLogoutModal}>로그아웃</MenuItem>
        </MenuList>
      </SideBar>

      {/*중앙 부분*/}
      <Content>
        <RecreationWrap>
          <RecreationTitle>레크레이션 찾기</RecreationTitle>
          <FavoritesParent>
            <FavoritesBox datas={currentDatas(exArray)} loading={loading}/>
          </FavoritesParent>
          <Pagination
            currentPage={currentPage}
            totalDatas={exArray.length}
            datasPerPage={datasPerPage}
            setCurrentPage={setCurrentPage}
          />
        </RecreationWrap>
      </Content>

      {/*우측 바*/}
      <RightSide/>

      {/*로그아웃 모달*/}
      {isLogoutModalOpen && (
        <LogoutModal>
          <ModalContent>
            <ModalTitle>로그아웃 하시게요?</ModalTitle>
            <SemiTitle>더 많은 혜택이 기다리고 있어요.</SemiTitle>
            <LogoutImg src={LogoutP}/>
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
  height: 714px;
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
  height: 1203px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RecreationTitle = styled.div`
  margin-top: 50px;
  font-size: 40px;
  font-weight: 600;
`;

const FavoritesParent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 370px);
  row-gap: 20px;
  column-gap: 30px;
  margin-top: 39px;
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
