import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import starIcon from "../../assets/mypage/mingcute_star-fill.svg";

import { privateAPI } from "../../apis/user";
import { ReactComponent as HeartImg } from "../../assets/main/heart.svg";

export default function Recreation({ content }) {
  const navigate = useNavigate();
  const ToRecreationDetail = (recreationId) => {
    navigate(`/recreation/detail/${recreationId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  //즐겨찾기 등록, 취소
  const [isFav, setIsFav] = useState(content.isFavorite);
  const addToFavorite = (id) => {
    const call = async () => {
      try {
        const response = await privateAPI.post(
          `/api/recreations/${id}/favorites`
        );
        console.log("즐겨찾기 추가/해제 응답 : ", response);
        if (response.data.result.isFavorite === true) {
          setIsFav(true);
        } else if (response.data.result.isFavorite === false) {
          setIsFav(false);
        }
      } catch (error) {
        console.log("즐겨찾기 추가/해제 에러 : ", error);
      }
    };
    call();
  };

  return (
    <Categories>
      <RecreationExplain>
        <Hashtag>#{content.hashtagList}</Hashtag>
        <SectionWrap>
          <Section2>{content.title}</Section2>
          <Section3 src={starIcon} />
          <Section4>{parseFloat(content.totalStars).toFixed(1)}</Section4>
        </SectionWrap>
        <KeyWords>
          <KeyWord>{keywordParam[content.keywordList[0]]}</KeyWord>
          <KeyWord>{keywordParam[content.keywordList[1]]}</KeyWord>
          <KeyWord>{keywordParam[content.keywordList[2]]}</KeyWord>
        </KeyWords>
        <ImgSpace>
          <ExImg
            src={content.imageUrl}
            onClick={() => ToRecreationDetail(content.id)}
          />
          <Favorite $isfav={isFav} onClick={() => addToFavorite(content.id)} />
        </ImgSpace>
        <Explain onClick={() => ToRecreationDetail(content.id)}>
          <Section>자세히보기</Section>
        </Explain>
      </RecreationExplain>
    </Categories>
  );
}

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
  font-weight: bold;
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
  width: 250px;
  height: 29px;
`;

const Section3 = styled.img`
  margin-left: 90px;
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

const Favorite = styled(HeartImg)`
  width: 42px;
  margin-left: 50px;
  margin-top: 120px;
  cursor: pointer;
  fill: ${(props) => (props.isFav === true ? "#FFAA29" : "#E9EBED")};
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
