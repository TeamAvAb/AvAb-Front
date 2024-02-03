import React from "react";
import styled from "styled-components";
import arrow from "../../assets/main/nextSlide.svg";
import heartImg from "../../assets/main/heart.svg";
import starImg from "../../assets/main/starIcon.svg";

export default function RecreationPrev({ content }) {
  return (
    <Categories>
      <Hashtag>{content.hashtag}</Hashtag>
      <RecreationExplain>
        <ImgSpace>
          <ExImg src={content.imgSrc}></ExImg>
          <img
            src={heartImg}
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
            <img src={arrow} style={{ width: "24px", height: "24px" }} />
          </Section1>
          <Section2>
            <Keywords>{content.keywords}</Keywords>
            <Rate>
              <img src={starImg} style={{ width: "16px", height: "16px" }} />
              {content.rate}
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
