import React, { useState } from "react";
import styled from "styled-components";
import Search from "../components/main/Search";
import blankImg from "../assets/main/blankImg.png";
import plusIconImg from "../assets/main/plusIcon.svg";
import Carousel from "../components/main/Carousel";

export default function Main() {
  const banner = [
    { title: "제목1", description: "설명설명설명", img: null },
    { title: "제목2", description: "설명설명설명", img: null },
    { title: "제목3", description: "설명설명설명", img: null },
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
          <img src={blankImg} style={{ width: "328px", height: "328px" }} />
        </Recommend>
        <Search />

        <Popular>
          <PopularHeader>
            <HeaderTitle>요즘 인기 레크레이션 한눈에 보기</HeaderTitle>
            <More>
              더보기
              <img
                src={plusIconImg}
                style={{ width: "24px", height: "24px" }}
              />
            </More>
          </PopularHeader>
        </Popular>
        <Carousel content={banner} />
      </Container>
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
  gap: 56px;
  color: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  font-size: 72px;
  margin-top: 40px;
  margin-bottom: 40px;
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
`;

const Popular = styled.div`
  width: 957px;
  height: 659px;
  margin-top: 135px;
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
