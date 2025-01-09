import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import yellowStar from "../../../assets/recreation/yellowStar.svg";
import FavBtn from "../../button/FavBtn";
import arrowIcon from "../../../assets/Card/arrowIcon.svg";
import keywordConverter from "../../../utils/keywordConverter";

export default function RecreationCardS({ content }) {
  const keywords = content.keywordList.map((keyword, idx) => (
    <span key={idx}>
      {keywordConverter(keyword)}
      {idx < content.keywordList.length - 1 && ","}
      &nbsp;
    </span>
  ));

  const navigator = useNavigate();
  const ToRecreationDetail = (recreationId) => {
    navigator(`/recreation/detail/${recreationId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CardLayout>
      <CardContent>
        <img src={content.imageUrl} />
        <FavBtn recreationId={content.id} isFav={content.isFavorite} />
      </CardContent>
      <CardSection onClick={() => ToRecreationDetail(content.id)}>
        <TitleDiv>
          <Title>{content.title} </Title>
          <img src={arrowIcon} />
        </TitleDiv>
        <KeywordsAndRateBox>
          <Keywords>{keywords}</Keywords>
          <RateDiv>
            <img src={yellowStar} alt="star icon" width={16} height={16} />
            <Rate>{parseFloat(content.totalStars).toFixed(1)}</Rate>
          </RateDiv>
        </KeywordsAndRateBox>
      </CardSection>
    </CardLayout>
  );
}

const CardLayout = styled.div`
  width: 17.75rem;
  height: 19.31rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.color.grayscale07};
  box-shadow: 0px 10px 30px 3px rgba(27, 29, 31, 0.2);
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  flex: 1;
  padding: 2.13rem 1.25rem 0.31rem;
  img {
    width: 7.5rem;
    margin: 0 auto;
  }
`;
const CardSection = styled.div`
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.19rem;
  padding: 0 1.25rem;
  border-radius: 0rem 0rem 1.25rem 1.25rem;
  background-color: ${({ theme }) => theme.color.secondary04};
  cursor: pointer;
`;
const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;
const Title = styled.h5`
  ${({ theme }) => theme.text.h5}
`;
const KeywordsAndRateBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Keywords = styled.div`
  display: flex;
  ${({ theme }) => theme.text.small}
`;
const RateDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  img {
    padding: 4px;
    vertical-align: bottom;
  }
`;
const Rate = styled.span`
  ${({ theme }) => theme.text.small}
`;
