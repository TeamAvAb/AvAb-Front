import React from 'react';
import { useNavigate } from 'react-router';
import useLoginStore from '../../stores/loginStore';
import useLoginModalStore from '../../stores/loginModalStore';
import styled from 'styled-components';
import SideNavLayout from '../../layout/SideNavLayout';
import Button from '../common/button/Button';
import Pagination from '../pagination/Pagination';
import penguin from '../../assets/scrapflow/penguin.png';
import LoadingSpinner from '../common/LoadingSpinner';

export default function FlowTabLayout({
  selectedPage,
  isloading,
  children,
  currentPage,
  totalPages,
  handlePaginationClick,
}) {
  const { modalControl } = useLoginModalStore();
  const { isLoggedIn } = useLoginStore((state) => state);

  const navigate = useNavigate();

  const moveToMakeFlow = () => {
    if (isLoggedIn) {
      navigate(`/flow/write`);
    } else {
      modalControl();
    }
  };

  return (
    <SideNavLayout selectedPage={selectedPage} parentTab="flow">
      <MainSection>
        <ButtonSection>
          <img src={penguin} />
          <FlowMakeBtn onClick={moveToMakeFlow} backgroundColor="main01" color="main05" size="lg">
            일정플로우 만들기
          </FlowMakeBtn>
        </ButtonSection>
        {isloading ? (
          <LoadingSpinner />
        ) : (
          <>
            {children}
            {totalPages !== 0 && (
              <Pagination
                currentPage={currentPage}
                pageNum={totalPages}
                setCurrentPage={handlePaginationClick}
              />
            )}
          </>
        )}
      </MainSection>
    </SideNavLayout>
  );
}

const MainSection = styled.div`
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.8rem 0 2rem;
`;
const ButtonSection = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
  position: relative;
  left: -5rem;
`;
const FlowMakeBtn = styled(Button)`
  padding: 1.6rem 5.7rem;
  font-size: 3rem;
  position: relative;
  left: -1.5rem;
  &:hover {
    background-color: ${({ theme }) => theme.color.main02};
  }
`;
