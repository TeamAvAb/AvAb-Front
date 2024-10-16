import React, { useState, useEffect } from "react";
import { publicAPI, privateAPI } from "../apis/user";
import styled from "styled-components";
import penguinImg from "../assets/scrapflow/penguin.png";
import noScrapImg from "../assets/scrapflow/noScrap.png";
import { useNavigate } from "react-router-dom";
import ScrapFlowBox from "../components/flow/ScrapFlowBox";
import Pagination from "../components/pagination/Pagination";

export default function ScrapFlow() {
  const navigate = useNavigate();
  const moveToWatch = () => {
    if (localStorage.getItem("accessToken")) navigate(`/flow/watch`);
    else alert("로그인이 필요한 페이지입니다.");
  };
  const moveToMy = () => {
    if (localStorage.getItem("accessToken")) navigate(`/flow/my`);
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
        const response = await privateAPI.get(
          `/api/users/me/scraps/flows?page=${currentPage}`
        );
        setDatas(response.data.result.flowList);
        setPages(response.data.result.totalPages);
      } else {
        const response = await publicAPI.get(
          `/api/users/me/scraps/flows?page=${currentPage}`
        );
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
        <MyFlowMenuBox onClick={moveToWatch}>플로우 구경하기</MyFlowMenuBox>
        <MyFlowMenuBox onClick={moveToMy}>내가 만든 일정플로우</MyFlowMenuBox>
        <MyFlowMenuBox style={{ backgroundColor: "#B1BEFF" }}>
          스크랩 일정 플로우
        </MyFlowMenuBox>
      </MyFlowMenuContainer>

      {/* 내가 만든 일정플로우 - Title */}
      <MyFlowContainer>
        <div>
          <MyFlowBoxContainer>
            <MyFlowBoxImage src={penguinImg} />
            <TitleBox>
              <MyFlowBoxTitle onClick={moveToMakeFlow}>
                일정플로우 만들기
              </MyFlowBoxTitle>
            </TitleBox>
          </MyFlowBoxContainer>

          {/* 내가 만든 일정플로우 - Grid */}
          {datas.length !== 0 ? (
            <ScrapFlowBoxParent>
              {datas && <ScrapFlowBox datas={datas} setScrap={setScrap} />}
            </ScrapFlowBoxParent>
          ) : (
            <MyFlowNoneBox>
              <MyFlowNoneImg src={noScrapImg} />
              <MyFlowNoneDetail>
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  스크랩한 일정플로우가 없습니다!
                </div>
                <div style={{ fontSize: "20px", marginTop: "8px" }}>
                  지금 바로 플로우를 구경해보세요.
                </div>
              </MyFlowNoneDetail>
            </MyFlowNoneBox>
          )}
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
  background-color: white;
  width: 320px;
  height: 713px;
  box-sizing: border-box;
  font-size: 22px;
  border: solid #cacdd2 1px;
  border-bottom: none;
  border-right: 0.5px solid #cacdd2;
  color: #1b1d1f;
`;

const MyFlowMenuTitle = styled.div`
  width: 260px;
  padding: 30px;
  font-size: 22px;
  border-bottom: solid #cacdd2 1px;
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
