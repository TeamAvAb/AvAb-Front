import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import PenguinImg from "../assets/watchflow/penguin.png";
import Flow from "../components/flow/FlowBox.jsx";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/pagination/Pagination.jsx";

const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiaWF0IjoxNzA3Mjk1MzkzLCJleHAiOjE5MDcyOTg5OTN9.yEvU_V98IMhnC09lEL_BdxU7aQTx69BclrAd9zjZL64";

export default function WatchFlow() {
  const navigate = useNavigate();
  const moveToMy = () => {
    navigate(`/flow/my`);
  };
  const moveToScrap = () => {
    navigate(`/flow/scrap`);
  };
  const moveToMakeFlow = () => {
    navigate(`/flow/write`);
  };

  // 데이터 가져오기
  const [datas, setDatas] = useState([]);
  // 데이터 불러오는 동안 로딩
  const [loading, setLoading] = useState(false);
  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(0);
  // 한 페이지 당 데이터 수
  const datasPerPage = 6;
  // 스크랩 변화 감지 함수
  const [scrap, setScrap] = useState(false);

  // 처음 렌더링 시에만 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(`https://dev.avab.shop/api/flows?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      setDatas(response.data.result.flowList);
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
        <MyFlowMenuBox style={{ backgroundColor: "#B1BEFF", fontWeight: "bold" }}>플로우 구경하기</MyFlowMenuBox>
        <MyFlowMenuBox onClick={moveToMy}>내가 만든 일정플로우</MyFlowMenuBox>
        <MyFlowMenuBox onClick={moveToScrap}>스크랩 일정 플로우</MyFlowMenuBox>
      </MyFlowMenuContainer>

      {/* 플로우 구경하기 */}
      <MyFlowContainer>
        <div>
          <MyFlowBoxContainer>
            <MyFlowBoxImage src={PenguinImg} />
            <TitleBox>
              <MyFlowBoxTitle onClick={moveToMakeFlow}>일정플로우 만들기</MyFlowBoxTitle>
            </TitleBox>
          </MyFlowBoxContainer>

          {/* 플로우 데이터 불러온 부분 - Component */}
          <WatchFlowBoxParent>{datas && <Flow datas={datas} setScrap={setScrap} />}</WatchFlowBoxParent>
        </div>

        {/* 페이지번호 */}
        <Pagination
          currentPage={currentPage}
          totalDatas={datas.length}
          datasPerPage={datasPerPage}
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
  box-sizing: border-box;
  background-color: white;
  border: 0.5px solid #cacdd2;
  border-bottom: 0;
  width: 320px;
  font-size: 24px;
`;

const MyFlowMenuTitle = styled.div`
  padding: 2.5vh 0vh 2.5vh 3vh;
`;

const MyFlowMenuBox = styled.div`
  border: 0.5px solid #cacdd2;
  text-align: center;
  justify-content: center;
  padding: 1.5vh 3vh;
  cursor: pointer;
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
