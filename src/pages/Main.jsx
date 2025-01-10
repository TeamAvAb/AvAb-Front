import React, { useEffect } from 'react';
import useLoginStore from '../stores/loginStore';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Search from '../components/main/Search';
import PopularCarousel from '../components/main/PopularCarousel';
import Carousel from '../components/main/Carousel';

import character from '../assets/main/character.png';
import blankImg from '../assets/main/blankImg.png';
import plusIconImg from '../assets/main/plusIcon.svg';
import intro from '../assets/main/introImg.png';

import workshopImg from '../assets/main/banner1_workshop.png';
import mtImg from '../assets/main/banner2_mt.png';
import gatherImg from '../assets/main/banner3_gather.png';

import { Helmet } from 'react-helmet';
import characterImg from '../assets/main/character.png';

export default function Main() {
  const navigator = useNavigate();
  const goToSearchList = () => {
    navigator(`/search/list`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const banner = [
    {
      index: 0,
      keyword: '워크샵',
      param: 'WORKSHOP',
      img: workshopImg,
    },
    { index: 1, keyword: 'MT', param: 'MT', img: mtImg },
    { index: 2, keyword: '모임', param: 'GATHERING', img: gatherImg },
  ];

  // 로컬 스토리지 데이터 없어도 isLoggedIn 유지되는 문제 해결(일시적..)
  useEffect(() => {
    const storedState = localStorage.getItem('loginStorage');
    if (!storedState) {
      useLoginStore.getState().logout();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>AvAb | 아브아브 - 빠르고 쉬운 레크레이션 검색 플랫폼</title>
        <meta
          name="description"
          content="아브아브에서 다양한 레크레이션을 쉽게 검색하고 추천받아보세요. 워크샵, MT, 모임 등 다양한 레크레이션 옵션을 빠르게 찾아보실 수 있습니다."
        />
        <meta name="keywords" content="레크레이션, 검색, 추천, 워크샵, MT, 모임, 아브아브, AvAb" />
        <meta property="og:title" content="아브아브 - 빠르고 쉬운 레크레이션 검색 플랫폼" />
        <meta
          property="og:description"
          content="아브아브에서 다양한 레크레이션을 쉽게 검색하고 추천받아보세요. 워크샵, MT, 모임 등 다양한 레크레이션 옵션을 빠르게 찾아보실 수 있습니다."
        />
        <meta property="og:image" content={characterImg} />
        <meta property="og:url" content="http://avab.site" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Container>
        <Recommend>
          <Comment>
            <span style={{ fontWeight: 700 }}>
              쉽고 빠르게 <br />
              레크레이션
            </span>
            을 <br />
            검색해보세요!
          </Comment>
          <img
            src={character}
            style={{
              height: "20rem",
            }}
          />
        </Recommend>
        <Search />

        <Popular>
          <PopularHeader>
            <HeaderTitle>요즘 인기 레크레이션 한눈에 보기</HeaderTitle>
            <More onClick={goToSearchList}>
              더보기
              <img
                src={plusIconImg}
                style={{ width: "1.5rem" }}
              />
            </More>
          </PopularHeader>
          <PopularCarousel />
        </Popular>
      </Container>
      <Carousel content={banner} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={intro} />
      </div>
    </>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--BG, linear-gradient(180deg, rgba(160, 221, 255, 0.4) 0%, #fff 67.9%));
  overflow: hidden;
`;
const Recommend = styled.div`
  margin-right: 8rem;
  display: flex;
  flex-direction: row;
  align-items: end;
  color: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  font-size: 4.5rem;
`;
const Comment = styled.div`
  justify-content: center;
  align-items: center;
  color: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  font-style: normal;
  font-weight: 400;
  margin-right: 2rem;
  margin-bottom: 1rem;
`;

const Popular = styled.div`
`;
const PopularHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderTitle = styled.span`
  color: #000;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
`;
const More = styled.button`
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
`;
