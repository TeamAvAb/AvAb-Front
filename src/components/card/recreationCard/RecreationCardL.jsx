import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import yellowStar from "../../../assets/recreation/yellowStar.svg";
import FavBtn from "../../button/FavBtn";
import arrowIcon from "../../../assets/Card/arrowIcon.svg";
import HashtagChip from "../../chip/HashtagChip";
import KeywordChip from "../../chip/KeywordChip";
import keywordConverter from "../../../utils/keywordConverter";

export default function RecreationCardL({ content }) {
  const keywords = content.keywordList.map((keyword, idx) => (
    <KeywordChip text={keywordConverter(keyword)} key={idx} />
  ));

  const navigator = useNavigate();
  const ToRecreationDetail = (recreationId) => {
    navigator(`/recreation/detail/${recreationId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CardLayout>
      <CardContent>
        <HashtagChip text={content.hashtagList[0]} />
        <CardRow2>
          <CardTitle>{content.title}</CardTitle>
          <RateDiv>
            <img src={yellowStar} alt="star icon" width={16} height={16} />
            <Rate>{parseFloat(content.totalStars).toFixed(1)}</Rate>
          </RateDiv>
        </CardRow2>
        <Keywords>{keywords}</Keywords>
        <CardRow3>
          <img src={content.imageUrl} />
          <FavBtn recreationId={content.id} isFav={content.isFavorite} />
        </CardRow3>
      </CardContent>
      <MoreDetailBtn onClick={() => ToRecreationDetail(content.id)}>
        자세히 보기
        <img src={arrowIcon} />
      </MoreDetailBtn>
    </CardLayout>
  );
}

const CardLayout = styled.div`
  width: 27.56rem;
  display: flex;
  flex-direction: column;
  gap: 1.44rem;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.color.main05};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6.5% 7.4% 0;
  gap: 1.44rem;
`;
const CardRow2 = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Keywords = styled.div`
  display: flex;
  gap: 1.06rem;
  /* flex-wrap: wrap; */
`;
const CardTitle = styled.h4`
  ${({ theme }) => theme.text.h4}
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
const CardRow3 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;

  img {
    width: 8.87rem;
    margin: 0 auto;
  }
`;
const MoreDetailBtn = styled.button`
  height: 4.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  background-color: ${({ theme }) => theme.color.secondary04};
  color: ${({ theme }) => theme.color.grayscale01};
  ${({ theme }) => theme.text.button};
  border-radius: 0rem 0rem 1.25rem 1.25rem;
  border: none;

  svg {
    display: block; /* inline 속성으로 인한 정렬 문제 제거 */
  }
`;
