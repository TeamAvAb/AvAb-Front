import React, { useState } from "react";
import { useNavigate } from "react-router";
import { privateAPI } from "../../apis/user";
import styled from "styled-components";
import arrow from "../../assets/main/nextSlide.svg";
import { ReactComponent as HeartImg } from "../../assets/main/heart.svg";
import starImg from "../../assets/main/starIcon.svg";
import useLoginModalStore from "../../stores/loginModalStore.js";
export default function RecreationPrev({ content }) {
  const { modalControl } = useLoginModalStore((state) => state);
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
  const [isFav, setIsFav] = useState(content.isFavorite);
  const navigator = useNavigate();
  const gotoDetail = (id) => {
    navigator(`/recreation/detail/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const addToFavorite = (e, id) => {
    e.stopPropagation();

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
    if (localStorage.getItem("accessToken")) {
      call();
    } else modalControl();
  };
  return (
    <Categories>
      <Hashtag>#{content.hashtagList}</Hashtag>
      <RecreationExplain onClick={() => gotoDetail(content.id)}>
        <ImgSpace>
          <ExImg src={content.imageUrl}></ExImg>
          <Favorite
            $isfav={isFav}
            onClick={(e) => addToFavorite(e, content.id)}
          />
        </ImgSpace>
        <Explain>
          <Section1>
            {content.title}
            <img src={arrow} style={{ width: "24px", height: "24px" }} />
          </Section1>
          <Section2>
            <div style={{ display: "flex", gap: "5px" }}>
              {content.keywordList.map((keyword) => (
                <Keyword key={keyword}>
                  {keywordParam[keyword]}
                  {content.keywordList.indexOf(keyword) === 2 ? null : ","}
                </Keyword>
              ))}
            </div>
            <Rate>
              <img src={starImg} style={{ width: "16px", height: "16px" }} />
              {parseFloat(content.totalStars).toFixed(1)}
            </Rate>
          </Section2>
        </Explain>
      </RecreationExplain>
    </Categories>
  );
}

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 69px;
  cursor: pointer;
`;

const Hashtag = styled.div`
  border-radius: 30px;
  width: 151px;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5b6bbe;
  color: white;
  font-size: 20px;
  font-weight: 700;
`;

const RecreationExplain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 284px;
  height: 309px;
  margin-top: 20px;
  border-radius: 20px;
  background: var(--gray-scale-f-7-f-8-f-9, #f7f8f9);
  box-shadow: 0px 10px 30px 3px rgba(27, 29, 31, 0.2);
`;

const ImgSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 284px;
  position: relative;
`;

const ExImg = styled.img`
  width: 120px;
  width: 120px;
  margin-top: 35px;
`;
const Favorite = styled(HeartImg)`
  width: 42px;
  height: 42px;
  position: absolute;
  top: 150px;
  right: 20px;
  fill: ${(props) => (props.$isfav === true ? "#FFAA29" : "#E9EBED")};
`;

const Explain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  justify-content: center;
  align-items: center;
  background-color: #b1beff;
  width: 284px;
  height: 112px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const Section1 = styled.div`
  color: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
`;

const Section2 = styled.div`
  width: 80%;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Keyword = styled.div`
  color: var(--gray-scale-26282-b, #26282b);
  font-size: 16px;
  font-weight: 400;
`;
const Rate = styled.span`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  color: var(--gray-scale-26282-b, #26282b);
  font-size: 16px;
  font-weight: 400;
`;
