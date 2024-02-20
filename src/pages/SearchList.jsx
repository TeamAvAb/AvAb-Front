import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

import Search from "../components/main/Search";
import KeywordModal from "../components/main/KeywordModal";
import SearchRecreation from '../components/Search/Recreation';
import Pagination from "../components/pagination/Pagination";
import { publicAPI } from "../apis/user";

import qs from "qs";

export default function Main({ handleSearchQuery }) {
  const [keywordModal, setKeywordModal] = useState(false);
  const [purposeModal, setPurposeModal] = useState(false);

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

  const navigate = useNavigate();
  const location = useLocation();
  const param = location.search;

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
      setLoading(false);
    };
    fetchData();
    setFavorite(false);
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
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  align-items: center;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Hashtag = styled.div`
  font-size: 20px;
  border-radius: 30px;
  background-color: #5b6bbe;
  color: white;
  width: 151px;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 221px;
  margin-top: 25px;
`;

const SectionWrap = styled.div`
  display: flex;
  align-items: center;
  width: 372px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Section2 = styled.div`
  font-size: 20px;
  font-weight: 600;
  width: 151px;
  height: 29px;
`;

const Section3 = styled.img`
  margin-left: 180px;
  width: 13.72px;
`;

const Section4 = styled.div`
  margin-left: 5px;
  width: 23px;
`;

const KeyWords = styled.div`
  display: flex;
  justify-content: space-between;
  width: 372px;
`;
const KeyWord = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 111px;
  height: 29px;
  background-color: #e9ebed;
  border-radius: 10px;
`;

const RecreationExplain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 440px;
  height: 455px;
  border-radius: 15px;
  box-shadow: 1px 1px 8px #abaaae inset;
  margin-bottom: 10px;
`;

const ImgSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 440px;
  height: 197px;
`;

const ExImg = styled.img`
  width: 142px;
  width: 142px;
  margin-left: 50px;
  margin-top: 20px;
  cursor: pointer;
`;

const HeartImg = styled.img`
  width: 28px;
  margin-left: 50px;
  margin-top: 120px;
  cursor: pointer;
`;

const Explain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #b1beff;
  width: 441px;
  height: 76px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;

  &:hover {
    background-color: #a0ddff;
  }
`;

const Section = styled.div`
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
`;

//페이지 넘기기
const NextPage = styled.div`
  display: flex;
  margin-top: 52px;
  margin-bottom: 30px;
  height: 42px;
`;

const PageNumber = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 42px;
  height: 42px;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 42px;
  height: 42px;
`;

const ButtonImage = styled.img`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0px 5px 10px rgba(27, 29, 31, 0.15));
  cursor: pointer;
`;
