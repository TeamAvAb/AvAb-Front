import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";

import starIcon from "../../assets/mypage/mingcute_star-fill.svg";
import YellowHeart from "../../assets/mypage/YellowHeart.svg";
import GrayHeart from "../../assets/mypage/GrayHeart.svg";

const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiaWF0IjoxNzA3Mjk1MzkzLCJleHAiOjE5MDcyOTg5OTN9.yEvU_V98IMhnC09lEL_BdxU7aQTx69BclrAd9zjZL64";

export default function SearchRecreation({datas, setFavorite}) {
  const navigate = useNavigate();
  const ToRecreationDetail = (recreationId) => {
    navigate(`/recreation/detail/${recreationId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };  

  //즐겨찾기 등록, 취소
  const DoFavorite = async (id) => {
    try {
        const response = await axios.post(
            `https://dev.avab.shop/api/recreations/${id}/favorites`,
            {},
            {
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${JWT_TOKEN}`,
                },
            }
        );

        if (response.status === 200) {
            // 요청이 성공하면 상태 업데이트
            console.log(response.data);
            // 상태를 업데이트하여 화면이 다시 렌더링되도록 함
            setFavorite(!datas.isFavorite);
        } else {
            // 요청이 실패하면 에러 처리
            console.log(response.data);
        }
    } catch (error) {
        // 요청이 실패한 경우 에러 처리
        console.error(error);
    }
  };

  const HeartColor = datas.isFavorite ?  GrayHeart : YellowHeart;

  console.log(datas);

  return (
    <RecreationWrapper>
        {datas.map((data) => (
            <Categories>
                <RecreationExplain>
                  <Hashtag>{data.hashtagList}</Hashtag>
                  <SectionWrap>
                    <Section2>{data.title}</Section2>
                    <Section3 src={starIcon}/>
                    <Section4>{data.totalStars}</Section4>
                  </SectionWrap>
                  <KeyWords>
                    <KeyWord>{data.keywordList[0]}</KeyWord>
                    <KeyWord>{data.keywordList[1]}</KeyWord>
                    <KeyWord>{data.keywordList[2]}</KeyWord>
                  </KeyWords>
                  <ImgSpace>
                    <ExImg src={data.imageUrl} onClick={() => ToRecreationDetail(data.id)}/>
                    <HeartImg src={HeartColor} onClick={() => DoFavorite(data.id)}/>
                  </ImgSpace>
                  <Explain onClick={() => ToRecreationDetail(data.id)}>
                    <Section>자세히보기</Section>
                  </Explain>
                </RecreationExplain>
            </Categories>
    ))}
    </RecreationWrapper>
  );
}

const RecreationWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 440px);
  row-gap: 20px;
  column-gap: 30px;
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
  padding: 5px;
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