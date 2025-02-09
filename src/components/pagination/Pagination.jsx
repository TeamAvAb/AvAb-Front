import React from 'react';
import styled from 'styled-components';
import LeftArrow from '../common/button/LeftArrow';
import RightArrow from '../common/button/RightArrow';

export default function Pagination({ currentPage, pageNum, setCurrentPage, scrollLocation }) {
  const pageN = [];
  for (let i = 1; i <= pageNum; i++) {
    pageN.push(i);
  }

  const movePage = (page) => {
    scrollLocation && window.scrollTo({ top: scrollLocation, behavior: 'smooth' });
    setCurrentPage(page);
  };

  const handlePrevClick = () => {
    if (currentPage > 0) {
      movePage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageN.length - 1) {
      movePage(currentPage + 1);
    }
  };

  return (
    <Container>
      {/* 왼쪽 버튼 */}
      <LeftArrow onClick={handlePrevClick} />

      <Pages>
        {/* 페이지 번호 */}
        {pageN.map((num) => {
          if (currentPage + 1 === num) {
            return (
              <PageNumber key={num} onClick={() => movePage(num - 1)} className="current">
                {num}
              </PageNumber>
            );
          } else {
            return (
              <PageNumber key={num} onClick={() => movePage(num - 1)}>
                {num}
              </PageNumber>
            );
          }
        })}
      </Pages>

      {/* 오른쪽 버튼 */}
      <RightArrow onClick={handleNextClick} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

const Pages = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const PageNumber = styled.button`
  font-size: ${({ theme }) => theme.text.button.fontSize};
  font-weight: ${({ theme }) => theme.text.button.fontWeight};
  width: 2.6rem;
  height: 2.6rem;

  &.current {
    background-color: ${({ theme }) => theme.color.secondary03};
    border-radius: 9999px;
    color: white;
  }
`;
