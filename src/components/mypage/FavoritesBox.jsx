import React from "react";
import styled from "styled-components";
import axios from "axios";

import starIcon from "../../assets/mypage/mingcute_star-fill.svg";
import YellowHeart from "../../assets/mypage/YellowHeart.svg";
import GrayHeart from "../../assets/mypage/GrayHeart.svg";

const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiaWF0IjoxNzA3Mjk1MzkzLCJleHAiOjE5MDcyOTg5OTN9.yEvU_V98IMhnC09lEL_BdxU7aQTx69BclrAd9zjZL64";

export default function FavoritesBox({datas, setFavorite}) {
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
            setFavorite(true);
        } else {
            // 요청이 실패하면 에러 처리
            console.log(response.data);
        }
    } catch (error) {
        // 요청이 실패한 경우 에러 처리
        console.error(error);
    }
  };

  return (
    <RecreationWrapper>
        {datas.map((data) => (
        <Category>
            <Hashtagging>{data.hashtagList}</Hashtagging>
            <RecreationExplain>
                <ImgSpace>
                  <ExImg src={data.imageUrl}/>
                  <HeartBox>
                    {data.isFavorite ? (
                    <HeartImg src={YellowHeart} onClick={() => DoFavorite(data.id)}/>
                    ) : (
                    <HeartImg src={GrayHeart} onClick={() => DoFavorite(data.id)}/>
                    )}
                  </HeartBox>
                </ImgSpace>
                <Explain>
                    <Section1>{data.title}</Section1>
                    <SectionWrap>
                        <Section2>{data.keywordList.join(', ')}</Section2>
                        <Section3 src={starIcon} />
                        <Section4>{data.totalStars}</Section4>
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

const HeartBox = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  margin-top: 137px;
  margin-left: 200px;
`;

const HeartImg = styled.img`
  position: absolute;
  width: 28px;
  cursor: pointer;
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
  position: absolute;
  margin-left: 210px;
  width: 13.72px;
`;

const Section4 = styled.div`
  position: absolute;
  margin-left: 230px;
`;