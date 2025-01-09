import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import yellowStar from "../../../assets/recreation/yellowStar.svg";
import FavBtn from "../../button/FavBtn";
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
        >
          <path
            d="M8.71499 5.34901C8.64631 5.27268 8.59263 5.18288 8.55699 5.08476C8.52135 4.98663 8.50447 4.8821 8.50729 4.77712C8.51012 4.67214 8.53261 4.56877 8.57347 4.47292C8.61433 4.37706 8.67276 4.2906 8.74543 4.21847C8.81811 4.14634 8.90359 4.08995 8.99701 4.05252C9.09044 4.01509 9.18996 3.99735 9.28991 4.00032C9.38985 4.00329 9.48826 4.02691 9.57952 4.06983C9.67078 4.11274 9.75309 4.17412 9.82177 4.25045L16.2919 11.4462C16.4256 11.5947 16.5 11.7912 16.5 11.9955C16.5 12.1998 16.4256 12.3963 16.2919 12.5448L9.82177 19.7414C9.75355 19.8194 9.67125 19.8824 9.57966 19.9267C9.48806 19.971 9.389 19.9957 9.28822 19.9995C9.18745 20.0033 9.08696 19.9859 8.9926 19.9486C8.89825 19.9112 8.8119 19.8545 8.73859 19.7818C8.66527 19.7091 8.60644 19.6218 8.56551 19.525C8.52458 19.4282 8.50238 19.3238 8.50018 19.2179C8.49798 19.112 8.51584 19.0067 8.55272 18.9081C8.58959 18.8095 8.64475 18.7196 8.71499 18.6436L14.6919 11.9955L8.71499 5.34901Z"
            fill="#1B1D1F"
          />
        </svg>
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
  background-color: ${({ theme }) => theme.color.secondary04};
  color: ${({ theme }) => theme.color.grayscale01};
  ${({ theme }) => theme.text.button};
  border-radius: 0rem 0rem 1.25rem 1.25rem;
  border: none;

  svg {
    display: block; /* inline 속성으로 인한 정렬 문제 제거 */
  }
`;
