import React from "react";
import styled from "styled-components";
import arrow from "../../assets/main/nextSlide.svg";
import heartImg from "../../assets/main/heart.svg";
import starImg from "../../assets/main/starIcon.svg";
import AddRecreationInfo from "./AddRecreationInfo";

const keywordMapping = {
  QUICKNESS: "순발력",
  SENSIBLE: "센스",
  CREATIVE: "창의력",
  COOPERATIVE: "협동",
  ACTIVE: "액티브",
  BRAIN: "두뇌",
  PSYCHOLOGICAL: "심리",
  LUCK: "행운",
  COMMON_SENSE: "상식",
  PREPARATION: "준비물",
};

export default function WriteRecreationPrev({ content, handleAddRecommendFlow, handleAddScrapFlow }) {
  const handleAddButtonClick = async () => {
    console.log("추가하기 버튼을 눌렀을 때 id 값:", content.id);
    if (handleAddRecommendFlow) {
      try {
        // handleAddRecommendFlow 함수가 정의되어 있다면 호출
        const result = await handleAddRecommendFlow(content.id); // handleAddRecommendFlow 함수가 완료될 때까지 기다림
        console.log("추가된 레크레이션 데이터:", result);
      } catch (error) {
        console.error("handleAddRecommendFlow 함수 호출 중 에러 발생:", error);
      }
    } else {
      console.error("handleAddRecommendFlow 함수가 정의되지 않았습니다.");
    }

    if (handleAddScrapFlow) {
      try {
        // handleAddScrapFlow 함수가 정의되어 있다면 호출
        const result = await handleAddScrapFlow(content.id); // handleAddScrapFlow 함수가 완료될 때까지 기다림
        console.log("추가된 레크레이션 데이터:", result);
      } catch (error) {
        console.error("handleAddScrapFlow 함수 호출 중 에러 발생:", error);
      }
    } else {
      console.error("handleAddScrapFlow 함수가 정의되지 않았습니다.");
    }
  };

  return (
    <Categories>
      <RecreationExplain>
        <ImgSpace>
          <ExImg src={content.imageUrl}></ExImg>
          <img
            src={heartImg}
            alt="Heart"
            style={{
              width: "42px",
              height: "42px",
              position: "absolute",
              top: "150px",
              right: "20px",
            }}
          />
        </ImgSpace>
        <Explain>
          <Section1>
            {content.title}
            <img src={arrow} alt="Arrow" style={{ width: "24px", height: "24px" }} />
          </Section1>
          <Section2>
            <Keywords> {content.keywordList.map((keyword) => keywordMapping[keyword]).join(", ")}</Keywords>
            <Rate>
              <img src={starImg} alt="Star" style={{ width: "16px", height: "16px" }} />
              {content.totalStars}
            </Rate>
          </Section2>
        </Explain>
        <Summary>
          <Title>레크레이션 소개</Title>
          <Subtitle>{content.title}</Subtitle>
          <Content>{content.summary}</Content>
        </Summary>
      </RecreationExplain>
      <AddButton onClick={handleAddButtonClick}>추가하기</AddButton>
    </Categories>
  );
}

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 69px;
`;

const AddButton = styled.button`
  border-radius: 30px;
  border: none;
  width: 151px;
  height: 57px;
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  background-color: #5b6bbe;
  color: white;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
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
  transition: background-color 0.3s ease;
  position: relative;
`;

const Summary = styled.div`
  position: absolute; /* 포지션을 절대적으로 변경 */
  top: 0;
  left: 0;
  width: 204px;
  height: 269px;
  color: white;
  padding: 20px 40px;
  background: var(--Cshadow, rgba(27, 29, 31, 0.8)); /* 배경색 변경 */
  border-radius: 20px; /* 테두리를 둥글게 만듦 */
  opacity: 0; /* 초기에는 숨김 */
  transition: opacity 0.3s ease; /* 페이드 인/아웃 효과를 위한 트랜지션 */

  ${RecreationExplain}:hover & {
    opacity: 1; /* 호버 시 나타남 */
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const Subtitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 45px; /* 소제목과 summary 사이의 간격 */
`;

const Content = styled.div`
  max-height: 183px;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  overflow: hidden; /* 내용이 영역을 벗어나는 경우 숨김 처리 */
  text-overflow: ellipsis; /* 텍스트가 영역을 벗어나면 "..."을 출력 */
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Keywords = styled.div`
  display: flex;
  width: 197px;
  height: 24px;
  flex-direction: column;
  justify-content: center;
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
