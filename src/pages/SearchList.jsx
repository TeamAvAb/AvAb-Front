import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { privateAPI, publicAPI } from "../apis/user";
import Search from "../components/main/Search";
import Recreation from "../components/Search/Recreation";
import Pagination from "../components/pagination/Pagination";

import noScrapImg from "../assets/scrapflow/noScrap.png";
import { Helmet } from "react-helmet";

export default function SearchList({}) {
  const location = useLocation();
  const param = location.search;

  // 데이터 가져오기
  const [datas, setDatas] = useState([]);
  // 데이터 불러오는 동안 로딩
  const [loading, setLoading] = useState(false);
  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(0);
  //전체 페이지 수
  const [pages, setPages] = useState(1);

  // 처음 렌더링 시에만 데이터 불러오기
  useEffect(() => {
    const requestURL = `/api/recreations/search`;
    const call = async () => {
      setLoading(true);
      try {
        if (location.search === "") {
          if (localStorage.getItem("accessToken")) {
            const response = await privateAPI.get(
              `/api/recreations?page=${currentPage}`
            );
            console.log("전체 레크:", response);
            setDatas(response.data.result.recreationList);
            setPages(response.data.result.totalPages);
          } else {
            const response = await publicAPI.get(
              `/api/recreations?page=${currentPage}`
            );
            setDatas(response.data.result.recreationList);
            setPages(response.data.result.totalPages);
          }
        } else {
          if (localStorage.getItem("accessToken")) {
            const response = await privateAPI.get(requestURL + param);
            setDatas(response.data.result.recreationList);
            setPages(response.data.result.totalPages);
          } else {
            const response = await publicAPI.get(requestURL + param);
            setDatas(response.data.result.recreationList);
            setPages(response.data.result.totalPages);
          }
        }
        setLoading(false);
      } catch (error) {
        console.log("레크레이션 로드 요청 에러 : ", error);
      }
    };
    call();
  }, [location, currentPage]);
  return (
    <>
      <Helmet>
        <title>AvAb | 레크레이션 검색 결과</title>
        <meta
          name="description"
          content="다양한 레크레이션을 검색하고 찾을 수 있습니다. 원하는 레크레이션을 찾아보세요."
        />
        <meta property="og:title" content="레크레이션 검색 결과" />
        <meta
          property="og:description"
          content="다양한 레크레이션을 검색하고 찾을 수 있습니다. 원하는 레크레이션을 찾아보세요."
        />
      </Helmet>
      <Container>
        <Recommend />
        <Search />
        <Popular>
          <PopularHeader>레크레이션 찾기</PopularHeader>
          {/* <RecreationMain> */}
          {datas.length !== 0 ? (
            <RecreationWrapper>
              {datas && datas.map((data) => <Recreation content={data} />)}
            </RecreationWrapper>
          ) : (
            <MyFlowNoneBox>
              <MyFlowNoneImg src={noScrapImg} />
              <MyFlowNoneDetail>
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  검색결과가 없습니다!
                </div>
                <div style={{ fontSize: "20px", marginTop: "8px" }}>
                  다시 검색해보세요.
                </div>
              </MyFlowNoneDetail>
            </MyFlowNoneBox>
          )}
          {/* </RecreationMain> */}
          <Pagination
            currentPage={currentPage}
            pageNum={pages}
            setCurrentPage={setCurrentPage}
          />
        </Popular>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Recommend = styled.div`
  display: flex;
  flex-direction: row;
  gap: 56px;
  color: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  font-size: 72px;
  margin-top: 90px;
  margin-bottom: 40px;
`;

const Popular = styled.div`
  width: 957px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PopularHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 42px;
  font-style: normal;
  font-weight: 700;
  width: 312px;
  height: 57px;
  margin-bottom: 50px;
`;

//레크레이션 찾기
const RecreationWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 440px);
  row-gap: 20px;
  column-gap: 30px;
`;

//검색 결과가 없는 경우
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
