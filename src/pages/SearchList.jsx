import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios'

import Search from "../components/main/Search";
import KeywordModal from "../components/main/KeywordModal";
import SearchRecreation from '../components/Search/Recreation';
import Pagination from "../components/pagination/Pagination";
import { publicAPI } from "../apis/user";
import qs from "qs";

const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiaWF0IjoxNzA3Mjk1MzkzLCJleHAiOjE5MDcyOTg5OTN9.yEvU_V98IMhnC09lEL_BdxU7aQTx69BclrAd9zjZL64";

export default function Main({ handleSearchQuery }) {
  const navigate = useNavigate();
  const location = useLocation();
  const param = location.search;

  // 데이터 가져오기
  const [datas, setDatas] = useState([]);
  // 데이터 불러오는 동안 로딩
  const [loading, setLoading] = useState(false);
  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(0);
  // 한 페이지 당 데이터 수
  const datasPerPage = 9;
  // 즐겨찾기 변화 감지 함수
  const [favorite, setFavorite] = useState(false);

  // 처음 렌더링 시에만 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(`https://dev.avab.shop/api/recreations`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      setDatas(response.data.result.recreationList);
      setFavorite(response.data.result.recreationList.isFavorite);
      setLoading(false);
    };
    fetchData();
  }, [currentPage, favorite]);

  useEffect(() => {
    console.log(datas);
  }, [datas]);
  
  return (
    <>
      <Container>
        <Recommend />
        <Search />
        <Popular>
          <PopularHeader>레크레이션 찾기</PopularHeader>
          <RecreationMain>{datas && <SearchRecreation datas={datas} setFavorite={setFavorite}/>}</RecreationMain>
          <Pagination
          currentPage={currentPage}
          totalDatas={datas.length}
          datasPerPage={datasPerPage}
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
const RecreationMain = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: center;
`;