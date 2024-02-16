import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Search from "../components/main/Search";
import PopularCarousel from "../components/main/PopularCarousel";
import Carousel from "../components/main/Carousel";

import character from "../assets/main/character.png";
import blankImg from "../assets/main/blankImg.png";
import plusIconImg from "../assets/main/plusIcon.svg";

import workshopImg from "../assets/main/banner1_workshop.png";
import mtImg from "../assets/main/banner2_mt.png";
import gatherImg from "../assets/main/banner3_gather.png";

export default function Main({ searchResult }) {
  const navigator = useNavigate();
  const goToSearchList = () => {
    navigator(`/search/list`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const banner = [
    {
      index: 0,
      keyword: "워크샵",
      img: workshopImg,
    },
    { index: 1, keyword: "MT", img: mtImg },
    { index: 2, keyword: "모임", img: gatherImg },
  ];
  const recreationData = [
    {
      index: 1,
      title: "레크레이션 1",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      hashtag: "#해시태그",
      rate: "4.5",
    },
    {
      index: 2,
      title: "레크레이션 2",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      hashtag: "#해시태그",
      rate: "4.5",
    },
    {
      index: 3,
      title: "레크레이션 3",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      hashtag: "#해시태그",
      rate: "4.5",
    },
    {
      index: 4,
      title: "레크레이션 4",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      hashtag: "#해시태그",
      rate: "4.5",
    },
    {
      index: 5,
      title: "레크레이션 5",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      hashtag: "#해시태그",
      rate: "4.5",
    },
    {
      index: 6,
      title: "레크레이션 6",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      hashtag: "#해시태그",
      rate: "4.5",
    },
    {
      index: 7,
      title: "레크레이션 7",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      hashtag: "#해시태그",
      rate: "4.5",
    },
    {
      index: 8,
      title: "레크레이션 8",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      hashtag: "#해시태그",
      rate: "4.5",
    },
    {
      index: 9,
      title: "레크레이션 9",
      keywords: "키워드1, 키워드2, 키워드3",
      imgSrc: blankImg,
      hashtag: "#해시태그",
      rate: "4.5",
    },
  ];
  return (
    <>
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
              width: "370px",
              height: "308px",
              marginLeft: "-15px",
            }}
          />
        </Recommend>
        <Search searchResult={searchResult} />

        <Popular>
          <PopularHeader>
            <HeaderTitle>요즘 인기 레크레이션 한눈에 보기</HeaderTitle>
            <More onClick={goToSearchList}>
              더보기
              <img
                src={plusIconImg}
                style={{ width: "24px", height: "24px" }}
              />
            </More>
          </PopularHeader>
          <PopularCarousel content={recreationData} />
        </Popular>
      </Container>
      <Carousel content={banner} />
    </>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(
    --BG,
    linear-gradient(180deg, rgba(160, 221, 255, 0.4) 0%, #fff 17.9%)
  );
  overflow: hidden;
`;
const Recommend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  color: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  font-size: 72px;
  margin-top: 8px;
  margin-bottom: 90px;
  margin-left: 59.5px;
  margin-right: 120.5px;
`;
const Comment = styled.div`
  width: 434px;
  height: 272px;
  justify-content: center;
  align-items: center;
  color: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  font-size: 72px;
  font-style: normal;
  font-weight: 400;
  margin-right: -15px;
`;

const Popular = styled.div`
  width: 957px;
  height: 659px;
  margin-top: 135px;
  margin-bottom: 90px;
`;
const PopularHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderTitle = styled.span`
  color: #000;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
`;
const More = styled.button`
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;
