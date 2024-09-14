import React from "react";
import styled from "styled-components";
import LeftButton from "../../assets/watchflow/moveLeft.png";
import RightButton from "../../assets/watchflow/moveRight.png";

export default function Pagination({ currentPage, pageNum, setCurrentPage }) {
  const pageN = [];
  for (let i = 1; i <= pageNum; i++) pageN.push(i);

  return (
    <PageNumberContainer>
      {/* 왼쪽 버튼 */}
      <ImageBox
        style={{ marginRight: "14px" }}
        onClick={() => {
          if (currentPage > 0) setCurrentPage(currentPage - 1);
        }}
      >
        <ButtonImage src={LeftButton} alt="왼쪽 버튼" />
      </ImageBox>

      {/* 페이지 번호 */}
      {pageN.map((num) => {
        if (currentPage + 1 === num)
          return (
            <SelectedPageNumber
              key={num}
              onClick={() => setCurrentPage(num - 1)}
            >
              {num}
            </SelectedPageNumber>
          );
        else
          return (
            <PageNumber key={num} onClick={() => setCurrentPage(num - 1)}>
              {num}
            </PageNumber>
          );
      })}

      {/* 오른쪽 버튼 */}
      <ImageBox
        style={{ marginLeft: "14px" }}
        onClick={() => {
          if (currentPage < pageN.length - 1) setCurrentPage(currentPage + 1);
        }}
      >
        <ButtonImage src={RightButton} alt="오른쪽 버튼" />
      </ImageBox>
    </PageNumberContainer>
  );
}

// 페이지 번호
const PageNumberContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 82px;
  margin-bottom: 113px;
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
  /* &:focus::after {
    background-color: #8896df;
    border-radius: 50%;
    color: white;
  } */
`;

const SelectedPageNumber = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 42px;
  height: 42px;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #8896df;
  border-radius: 50%;
  color: white;
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
