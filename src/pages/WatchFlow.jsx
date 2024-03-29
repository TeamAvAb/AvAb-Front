import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PenguinImg from "../assets/watchflow/penguin.png";
import Flow from "../components/flow/FlowBox.jsx";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/pagination/Pagination.jsx";
import { publicAPI, privateAPI } from "../apis/user.js";

export default function WatchFlow() {
  const navigate = useNavigate();
  const moveToMy = () => {
    if (localStorage.getItem("accessToken")) navigate(`/flow/my`);
    else alert("로그인이 필요한 페이지입니다.");
  };
  const moveToScrap = () => {
    if (localStorage.getItem("accessToken")) navigate(`/flow/scrap`);
    else alert("로그인이 필요한 페이지입니다.");
  };
  const moveToMakeFlow = () => {
    if (localStorage.getItem("accessToken")) navigate(`/flow/write`);
    else alert("로그인이 필요한 페이지입니다.");
  };

  // 데이터 가져오기
  const [datas, setDatas] = useState([]);
  // 데이터 불러오는 동안 로딩
  const [loading, setLoading] = useState(false);
  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(0);
  // 전체 페이지 수
  const [pages, setPages] = useState(1);
  // 스크랩 변화 감지 함수
  const [scrap, setScrap] = useState(false);

  // 처음 렌더링 시에만 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (localStorage.getItem("accessToken")) {
        const response = await privateAPI.get(`/api/flows?page=${currentPage}`);
        setDatas(response.data.result.flowList);
        setPages(response.data.result.totalPages);
      } else {
        const response = await publicAPI.get(`/api/flows?page=${currentPage}`);
        setDatas(response.data.result.flowList);
        setPages(response.data.result.totalPages);
      }
      setLoading(false);
    };
    fetchData();
    setScrap(false);
  }, [currentPage, scrap]);

  useEffect(() => {
    console.log(datas);
  }, [datas]);

  return (
    <MyFlowWrap>
      {/* 플로우 왼쪽 메뉴바 */}
      <MyFlowMenuContainer>
        <MyFlowMenuTitle>일정플로우</MyFlowMenuTitle>
        <MyFlowMenuBox style={{ backgroundColor: "#B1BEFF" }}>
          플로우 구경하기
        </MyFlowMenuBox>
        <MyFlowMenuBox onClick={moveToMy}>내가 만든 일정플로우</MyFlowMenuBox>
        <MyFlowMenuBox onClick={moveToScrap}>스크랩 일정 플로우</MyFlowMenuBox>
      </MyFlowMenuContainer>

      {/* 플로우 구경하기 */}
      <MyFlowContainer>
        <div>
          <MyFlowBoxContainer>
            <MyFlowBoxImage src={PenguinImg} />
            <TitleBox>
              <MyFlowBoxTitle onClick={moveToMakeFlow}>
                일정플로우 만들기
              </MyFlowBoxTitle>
            </TitleBox>
          </MyFlowBoxContainer>

          {/* 플로우 데이터 불러온 부분 - Component */}
          <WatchFlowBoxParent>
            {datas && <Flow datas={datas} setScrap={setScrap} />}
          </WatchFlowBoxParent>
        </div>

        {/* 페이지번호 */}
        <Pagination
          currentPage={currentPage}
          pageNum={pages}
          setCurrentPage={setCurrentPage}
        />
      </MyFlowContainer>
      <RightSide />
    </MyFlowWrap>
  );
}

const MyFlowWrap = styled.div`
  display: flex;
  background-color: #f7f8f9;
`;

const RightSide = styled.div`
  width: 5.7325%;
  background-color: #f7f8f9;
`;

// 일정플로우-구경하기 왼쪽메뉴바 > ~ MyFlowMenuBox
const MyFlowMenuContainer = styled.div`
  width: 320px;
  height: 713px;
  box-sizing: border-box;
  font-size: 22px;
  border: solid #cacdd2 1px;
  border-bottom: none;
  border-right: solid #cacdd2 1px;
  color: #1b1d1f;
  background-color: white;
`;

const MyFlowMenuTitle = styled.div`
  width: 260px;
  padding: 30px;
  font-size: 22px;
`;

const MyFlowMenuBox = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 20px;
  width: 280px;
  border-bottom: solid #cacdd2 1px;
`;

const MyFlowContainer = styled.div`
  background-color: white;
  padding-top: 30px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  border-right: 0.5px solid #cacdd2;
`;

// 일정플로우 만들기 부분
const MyFlowBoxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MyFlowBoxImage = styled.img`
  width: 199.65px;
  height: 199.65px;
  z-index: 2;
`;

const TitleBox = styled.div`
  background-color: #19297c;
  border-radius: 15vh;
  width: 527px;
  height: 109px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: relative;
  left: -23.65px;
  cursor: pointer;

  &:hover {
    background-color: #4036ed;
    transition: 0.2s;
  }
`;

// 플로우 박스 - Grid
const WatchFlowBoxParent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 370px);
  row-gap: 20px;
  column-gap: 120px;
  margin-top: 39px;
`;

const MyFlowBoxTitle = styled.div`
  color: white;
  width: 343px;
  height: 57px;
  font-weight: bold;
  font-size: 47px;
`;
