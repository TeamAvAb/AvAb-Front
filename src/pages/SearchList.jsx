import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { privateAPI, publicAPI } from "../apis/user";
import Search from "../components/main/Search";
import Recreation from "../components/Search/Recreation";
import Pagination from "../components/pagination/Pagination";

export default function Main({}) {
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
  // 한 페이지 당 데이터 수
  const datasPerPage = 9;

  // 처음 렌더링 시에만 데이터 불러오기

  useEffect(() => {
    const requestURL = `/api/recreations/search`;
    const call = async () => {
      setLoading(true);
      try {
        if (location.search === "") {
          if (localStorage.getItem("accessToken")) {
            const response = await privateAPI.get(`/api/recreations`);
            console.log("전체 레크:", response);
            setDatas(response.data.result.recreationList);
          } else {
            const response = await publicAPI.get(`/api/recreations`);
            setDatas(response.data.result.recreationList);
          }
        } else {
          if (localStorage.getItem("accessToken")) {
            const response = await privateAPI.get(requestURL + param);
            setDatas(response.data.result.recreationList);
          } else {
            const response = await publicAPI.get(requestURL + param);
            setDatas(response.data.result.recreationList);
          }
        }
        setLoading(false);
      } catch (error) {
        console.log("레크레이션 로드 요청 에러 : ", error);
      }
    };
    call();
  }, [location]);

  return (
    <>
      <Container>
        <Recommend />
        <Search />
        <Popular>
          <PopularHeader>레크레이션 찾기</PopularHeader>
          {/* <RecreationMain> */}
          <RecreationWrapper>
            {datas && datas.map((data) => <Recreation content={data} />)}
          </RecreationWrapper>
          {/* </RecreationMain> */}
          <Pagination currentPage={currentPage} pageNum={pages} setCurrentPage={setCurrentPage}/>
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
