import React, { useState } from "react";
import styled from "styled-components";
import { privateAPI } from "../../apis/user";
import { Link, useNavigate } from "react-router-dom";

import starIcon from "../../assets/mypage/mingcute_star-fill.svg";
import { ReactComponent as HeartImg } from "../../assets/main/heart.svg";

export default function FavoritesBox({ content, onFavoriteChange }) {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(content.isFavorite);

  const keywordParam = {
    COOPERATIVE: "협동",
    QUICKNESS: "순발력",
    SENSIBLE: "센스",
    BRAIN: "두뇌",
    CREATIVE: "창의력",
    ACTIVE: "액티브",
    PSYCHOLOGICAL: "심리",
    LUCK: "행운",
    COMMON_SENSE: "상식",
    PREPARATION: "준비물",
  };

  const addToFavorite = (id) => {
    const call = async () => {
      try {
        const response = await privateAPI.post(
          `/api/recreations/${id}/favorites`
        );
        console.log("즐겨찾기 추가/해제 응답 : ", response);
        if (response.data.result.isFavorite === true) {
          setIsFav(true);
          onFavoriteChange(); // 상위 컴포넌트에 상태 변경 알림
        } else if (response.data.result.isFavorite === false) {
          setIsFav(false);
          onFavoriteChange(); // 상위 컴포넌트에 상태 변경 알림
        }
      } catch (error) {
        console.log("즐겨찾기 추가/해제 에러 : ", error);
      }
    };
    call();
  };

  return (
    <Category>
      <Hashtagging>#{content.hashtagList}</Hashtagging>
      <RecreationExplain>
        <ImgSpace>
          <ExImg src={content.imageUrl} />
          <Favorite isFav={isFav} onClick={() => addToFavorite(content.id)} />
        </ImgSpace>
        <Explain
          to={"/recreation/detail/" + content.id}
          onClick={() => {
            window.scrollTo(0, 0); // 페이지 이동 전에 스크롤을 맨 위로 이동
            navigate("/recreation/detail/" + content.id);
          }}
        >
          <Section1>{content.title}</Section1>
          <SectionWrap>
            <Section2>
              {keywordParam[content.keywordList[0]]},{" "}
              {keywordParam[content.keywordList[1]]},{" "}
              {keywordParam[content.keywordList[2]]}
            </Section2>
            <Section3 src={starIcon} />
            <Section4>{parseFloat(content.totalStars).toFixed(1)}</Section4>
          </SectionWrap>
        </Explain>
      </RecreationExplain>
    </Category>
  );
}

const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Hashtagging = styled.div`
  font-size: 20px;
  font-weight: bold;
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
  text-decoration: none;
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
  color: #1b1d1f;
`;

const ImgSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 284px;
  height: 197px;
`;

const ExImg = styled.img`
  width: 120px;
  width: 120px;
  margin-left: 60px;
  margin-top: 20px;
`;

const Favorite = styled(HeartImg)`
  margin-left: 10px;
  margin-top: 140px;
  width: 42px;
  cursor: pointer;
  fill: ${(props) => (props.favorite === true ? "#E9EBED" : "#FFAA29")};
`;

const Explain = styled(Link)`
  text-decoration: none;
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
  color: #1b1d1f;
`;

const Section2 = styled.div`
  font-size: 15px;
  color: #1b1d1f;
`;

const Section3 = styled.img`
  position: relative;
  margin-left: 30px;
  width: 13.72px;
`;

const Section4 = styled.div`
  position: relative;
  margin-left: 10px;
  color: #1b1d1f;
`;
