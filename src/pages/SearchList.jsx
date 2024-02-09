import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Search from '../components/Search/SearchBox';
import recreationData from '../components/Search/RecreationData';
import KeywordModal from '../components/main/KeywordModal';
import starIcon from "../assets/mypage/mingcute_star-fill.svg";
import YellowHeart from "../assets/mypage/YellowHeart.svg"
import GrayHeart from "../assets/mypage/GrayHeart.svg"
import none from '../assets/Footer/none.png'
import LeftButton from "../assets/myflow/moveLeft.png";
import RightButton from "../assets/myflow/moveRight.png";

export default function Main() {
  const [keywordModal, setKeywordModal] = useState(false);
  const [purposeModal, setPurposeModal] = useState(false);
  const [selectedRecreationIndex, setSelectedRecreationIndex] = useState(null);
  const navigate = useNavigate();
  
  const ToRecreationDetail = () => {
    navigate(`/recreation/detail`);
  };
  const toggleHeart = (index) => {
    if (selectedRecreationIndex === index) {
      setSelectedRecreationIndex(null);
    } else {
      setSelectedRecreationIndex(index);
    }
  };
  
  return (
    <>
      <Container>
        <Recommend/>
        <Search keywordModal={setKeywordModal} purposeModal={setPurposeModal} />
        {keywordModal ? <KeywordModal closeModal={setKeywordModal} /> : null}
        <Popular>
          <PopularHeader>레크레이션 찾기</PopularHeader>
          <RecreationMain>
            {recreationData.map((recreation, index) => 
              Array.from({length: 1}).map((_, i) => 
                <Categories key={`${index}-${i}`}>
                  <RecreationExplain>
                    <Hashtag>{recreation.hashtag}</Hashtag>
                    <SectionWrap>
                      <Section2>{recreation.title}</Section2>
                      <Section3 src={recreation.starSrc}/>
                      <Section4>{recreation.rate}</Section4>
                    </SectionWrap>
                    <KeyWords>
                      <KeyWord>{recreation.keyword1}</KeyWord>
                      <KeyWord>{recreation.keyword2}</KeyWord>
                      <KeyWord>{recreation.keyword3}</KeyWord>
                    </KeyWords>
                    <ImgSpace>
                      <ExImg src={recreation.imgSrc}/>
                      <HeartImg
                        src={index === selectedRecreationIndex ? YellowHeart : GrayHeart}
                        onClick={() => toggleHeart(index)}
                      />
                    </ImgSpace>
                    <Explain onClick={ToRecreationDetail}>
                      <Section>{recreation.more}</Section>
                    </Explain>
                  </RecreationExplain>
                </Categories>
              )
            )}
          </RecreationMain>
          <NextPage>
            <ImageBox>
              <ButtonImage src={LeftButton} alt="왼쪽 버튼" />
            </ImageBox>
            <PageNumber style={{ marginLeft: "14px", backgroundColor: "#8896DF", borderRadius: "50%", color: "white" }}>
              1
            </PageNumber>
            <PageNumber>2</PageNumber>
            <PageNumber>3</PageNumber>
            <PageNumber>4</PageNumber>
            <PageNumber>5</PageNumber>
            <PageNumber>6</PageNumber>
            <PageNumber>7</PageNumber>
            <PageNumber style={{ marginRight: "14px" }}>8</PageNumber>
            <ImageBox>
              <ButtonImage src={RightButton} alt="오른쪽 버튼" />
            </ImageBox>
          </NextPage>
        </Popular>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 2601px;
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
  height: 659px;
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
  margin-top: 25px
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
  width: 13.72px
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
`


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