import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import starIcon from "../../assets/mypage/mingcute_star-fill.svg";
import YellowHeart from "../../assets/mypage/YellowHeart.svg";
import GrayHeart from "../../assets/mypage/GrayHeart.svg";

const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiaWF0IjoxNzA3Mjk1MzkzLCJleHAiOjE5MDcyOTg5OTN9.yEvU_V98IMhnC09lEL_BdxU7aQTx69BclrAd9zjZL64";

export default function FavoritesBox({ datas}) {
  const [recreationId, setRecreationId] = useState(0);

  const DoFavorite = async (Id) => {
    setRecreationId(Id);
    //즐겨찾기 상태를 서버에 업데이트하는 POST 요청
    const response = await axios.post(`https://dev.avab.shop/api/recreations/${recreationId}/favorities`, {
      headers: { Authorization: `Bearer ${JWT_TOKEN}` },
    });

    if (response.status === 200) {
      //요청이 성공하면 상태 업데이트
      console.log("스크랩 업데이트 성공");
    } else {
      //요청이 실패하면 에러 처리
      console.log("스크랩 업데이트 실패");
    }
  };

  return (
    <RecreationWrapper>
        {datas.map((data, i) => (
        <Category>
            <Hashtagging>{data.result.recreationList[0].hashtagList}</Hashtagging>
            <RecreationExplain>
                <ImgSpace>
                  <ExImg src={data.result.recreationList[0].imageUrl}/>
                  {data.isFavorite ? (<HeartImg src={YellowHeart}  onClick={() => DoFavorite(data.id)}/>)
                  : (<HeartImg src={GrayHeart} onClick={() => DoFavorite(data.id)}/>)
                  }
                </ImgSpace>
                <Explain>
                    <Section1>{data.result.recreationList[0].title}</Section1>
                    <SectionWrap>
                        <Section2>{data.result.recreationList[0].keywordList.join(', ')}</Section2>
                        <Section3 src={starIcon} />
                        <Section4>{data.result.recreationList[0].totalStars}</Section4>
                    </SectionWrap>
                </Explain>
            </RecreationExplain>
        </Category>
    ))}
    </RecreationWrapper>
  );
}

const RecreationWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 370px);
  row-gap: 20px;
  column-gap: 30px;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Hashtagging = styled.div`
  font-size: 20px;
  border-radius: 30px;
  background-color: #5b6bbe;
  color: white;
  width: 151px;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecreationExplain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 284px;
  height: 309px;
  margin-top: 20px;
  border-radius: 15px;
  box-shadow: 1px 1px 8px #abaaae inset;
  margin-bottom: 20px;
`;

const ImgSpace = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 284px;
  height: 197px;
`;

const ExImg = styled.img`
  width: 120px;
  width: 120px;
  margin-top: 20px;
`;

const HeartImg = styled.img`
  width: 28px;
  margin-left: 200px;
`;

const Explain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #b1beff;
  width: 284px;
  height: 112px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #a0ddff;
  }
`;

const SectionWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Section1 = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Section2 = styled.div`
  font-size: 15px;
`;

const Section3 = styled.img`
  margin-left: 30px;
  width: 13.72px;
`;

const Section4 = styled.div`
  margin-left: 5px;
`;

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