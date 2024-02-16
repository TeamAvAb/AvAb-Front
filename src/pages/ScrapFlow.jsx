import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import penguinImg from "../assets/scrapflow/penguin.png";
import noScrapImg from "../assets/scrapflow/noScrap.png";
import { useNavigate } from "react-router-dom";
import ScrapFlowBox from "../components/flow/ScrapFlowBox";
import Pagination from "../components/pagination/Pagination";

// 임시 데이터
const ex = {
  isSuccess: true,
  code: "string",
  message: "string",
  result: {
    flowList: [
      {
        id: 0,
        purpose: ["WORKSHOP"],
        title: "string",
        totalPlayTime: 0,
        viewCount: 0,
        author: {
          userId: 0,
          username: "string",
        },
        scrapCount: 0,
        isScraped: true,
      },
    ],
    totalPages: 0,
  },
};
export const exArray = [];
for (let i = 0; i < 17; i++) exArray.push(ex);

export default function ScrapFlow() {
  const navigate = useNavigate();
  const moveToWatch = () => {
    navigate(`/flow/watch`);
  };
  const moveToMy = () => {
    navigate(`/flow/my`);
  };
  const moveToMakeFlow = () => {
    navigate(`/flow/write`);
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
      const response = await axios.get("https://dev.avab.shop/api/flows");
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

  return (
    <MyFlowWrap>
      {/* 플로우 왼쪽 메뉴바 */}
      <MyFlowMenuContainer>
        <MyFlowMenuTitle>일정플로우</MyFlowMenuTitle>
        <MyFlowMenuBox onClick={moveToWatch}>플로우 구경하기</MyFlowMenuBox>
        <MyFlowMenuBox onClick={moveToMy}>내가 만든 일정플로우</MyFlowMenuBox>
        <MyFlowMenuBox style={{ backgroundColor: "#B1BEFF", fontWeight: "bold" }}>스크랩 일정 플로우</MyFlowMenuBox>
      </MyFlowMenuContainer>

      {/* 내가 만든 일정플로우 - Title */}
      <MyFlowContainer>
        <div>
          <MyFlowBoxContainer>
            <MyFlowBoxImage src={penguinImg} />
            <TitleBox>
              <MyFlowBoxTitle onClick={moveToMakeFlow}>일정플로우 만들기</MyFlowBoxTitle>
            </TitleBox>
          </MyFlowBoxContainer>

          {/* 내가 만든 일정플로우 - Grid */}
          {exArray.length !== 0 ? (
            <ScrapFlowBoxParent>
              <ScrapFlowBox datas={currentDatas(exArray)} loading={loading} />
            </ScrapFlowBoxParent>
          ) : (
            <MyFlowNoneBox>
              <MyFlowNoneImg src={noScrapImg} />
              <MyFlowNoneDetail>
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>내가 만든 일정플로우가 없습니다!</div>
                <div style={{ fontSize: "20px", marginTop: "8px" }}>
                  위의 버튼을 눌러 나만의 일정플로우를 만들어 보세요.
                </div>
              </MyFlowNoneDetail>
            </MyFlowNoneBox>
          )}
        </div>

        {/* 페이지번호 */}
        <Pagination
          currentPage={currentPage}
          totalDatas={exArray.length}
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
  border-right: 0px;
  border-left: 0px;
  text-align: center;
  justify-content: center;
  padding: 1.5vh 3vh;
  cursor: pointer;
`;

const MyFlowContainer = styled.div`
  background-color: white;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  border-right: 0.5px solid #cacdd2;
`;

// 내가 만든 일정 플로우 - Title
const MyFlowBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const MyFlowBoxImage = styled.img`
  width: 199.65px;
  height: 199.65px;
  z-index: 2;
`;

const TitleBox = styled.div`
  position: relative;
  left: -23.65px;
  background-color: #19297c;
  border-radius: 15vh;
  width: 527px;
  height: 109px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: pointer;

  &:hover {
    background-color: #4036ed;
    transition: 0.2s;
  }
`;

const MyFlowBoxTitle = styled.div`
  color: white;
  width: 343px;
  height: 57px;
  font-weight: bold;
  font-size: 47px;
`;

// 플로우 박스 - Grid
const ScrapFlowBoxParent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 370px);
  row-gap: 20px;
  column-gap: 120px;
  margin-top: 39px;
`;

// 내가 만든 일정 플로우 - None
const MyFlowNoneBox = styled.div`
  width: 100%;
  text-align: center;
`;

const MyFlowNoneImg = styled.img`
  width: 120px;
  height: 120px;
`;

const MyFlowNoneDetail = styled.div`
  width: 100%;
  margin-top: 40px;
  text-align: center;
`;
