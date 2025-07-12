import React, { useEffect } from 'react';
import useLoginStore from '../stores/loginStore';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Search from '../components/main/Search';
import PopularRecreationCarousel from '../components/main/PopularRecreationCarousel';
import BannerCarousel from '../components/main/BannerCarousel';

import characterImg from '../assets/character/greetingAvb.png';
import plusIconImg from '../assets/common/plusIcon.svg';
import intro1 from '../assets/intro/intro1.png';
import intro2 from '../assets/intro/intro2.png';
import intro3 from '../assets/intro/intro3.png';

import workshopImg from '../assets/carousel/banner1_workshop.png';
import mtImg from '../assets/carousel/banner2_mt.png';
import gatherImg from '../assets/carousel/banner3_gather.png';

import { Helmet } from 'react-helmet';
import { scrollToTop } from '../utils/windowUtils';
import SITE_URL from '../constants/url';

export default function Main() {
  const navigate = useNavigate();
  const goToSearchList = () => {
    navigate(SITE_URL.RECREATION_SEARCH_LIST);
    scrollToTop();
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
        <meta property="og:url" content="https://avab.site" />
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
            src={characterImg}
            style={{
              height: '20rem',
            }}
            alt="돋보기를 든 아브브"
          />
        </Recommend>
        <Search />

        <div>
          <PopularHeader>
            <HeaderTitle>요즘 인기 레크레이션 한눈에 보기</HeaderTitle>
            <More onClick={goToSearchList}>
              더보기
              <img src={plusIconImg} style={{ width: '1.5rem' }} alt="더보기" />
            </More>
          </PopularHeader>
          <PopularRecreationCarousel />
        </div>
      </Container>
      <BannerCarousel contents={banner} />

      <IntroSection>
        <IntroTitle>아브아브 서비스 소개</IntroTitle>
        <IntroBlock>
          <MockupImage src={intro1} alt="검색 목업" />
          <TextBox>
            <Title>원하는 레크레이션을<br/>쉽고 빠르게 검색해요</Title>
            <Description>
              다양한 조건 필터를 통해 레크레이션을 검색해 <br/>
              정보를 얻을 수 있어요. 마음에 드는 레크레이션이<br/>
              있다면 즐겨찾기 하세요!
            </Description>
          </TextBox>
        </IntroBlock>

        <IntroBlock>
          <TextBox>
            <Title>찾기 어려운 레크레이션<br/>정보를 한눈에 알아봐요</Title>
            <Description>
              레크레이션 상세정보에 더해 리뷰 및 평가를 통해<br/>
              레크레이션 정보를 얻을 수 있어요. 연관<br/>
              레크레이션과 연관 플로우를 살펴보며 같이 활용할<br/>
              레크레이션을 찾아볼 수 있어요.
            </Description>
          </TextBox>
          <MockupImage src={intro2} alt="상세페이지 목업" />
        </IntroBlock>

        <IntroBlock>
          <MockupImage src={intro3} alt="일정플로우 목업" />
          <TextBox>
            <Title>레크레이션 계획을<br/>일정플로우로 저장해요</Title>
            <Description>
              레크레이션을 즐길 때, 우리는 여러 활동을 함께<br/>
              관리해요. 일정플로우를 통해 목적과 시간에 맞게<br/>
              일정을 계획할 수 있어요. 다른 유저들의 플로우와<br/>
              추천 레크레이션을 참고하여 일정을 세워보세요!
            </Description>
          </TextBox>
        </IntroBlock>
      </IntroSection>

    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => `linear-gradient(180deg, ${theme.color.main03}66 0%, #fff 67.9%)`};
  overflow: hidden;
`;

const Recommend = styled.div`
  margin-right: 4rem;
  display: flex;
  flex-direction: row;
  align-items: end;
  font-size: 4.5rem;
`;

const Comment = styled.div`
  font-style: normal;
  font-weight: 400;
  margin-bottom: 1rem;
  text-align: left;
  line-height: 1.2;
  margin-right: -1rem;
`;

const PopularHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.span`
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
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
`;

const IntroTitle = styled.div`
  display: inline-block; 
  align-items: center;
  background-color: #19297C;
  color: #FFFFFF;
  font-size: 1.25rem;
  font-weight: 400;
  padding: 1.0rem 2.0rem;
  border-radius: 9999px;
  text-align: center;
  align-self: flex-start;
  width: fit-content;
  margin-left: calc((100% - 927px) / 2);
  margin-bottom: -2.0rem;
`;

const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 12rem;
  padding-bottom: 12rem;
  gap: 6rem;
  & > div:nth-of-type(3) > div {
    text-align: right;
  }
`;

const IntroBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  width: 100%;
  max-width: 927px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const MockupImage = styled.img`
  width: 350px;
  height: auto;
`;

const TextBox = styled.div`
  width: 429px;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 1rem;
  color: #000000CC;
`;

const Description = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 2.5rem;
  color: #000000CC;
`;

