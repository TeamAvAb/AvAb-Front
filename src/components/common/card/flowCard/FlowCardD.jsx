import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { getTranslatedPurposes } from '../../../../utils/purposeUtils';
import PurposeChip from '../../chip/PurposeChip';
import ScrapBtn from '../../button/ScrapBtn';
import { privateAPI } from '../../../../apis/user';
import useLoginStore from '../../../../stores/loginStore';
import useLoginModalStore from '../../../../stores/loginModalStore';
import Button from '../../button/Button';
import FlowMetadata from '../../FlowMetadata';

export default function FlowCardD({ content, isOwner, refetch, onDeleteClick }) {
  const { isLoggedIn } = useLoginStore((state) => state);
  const { modalControl } = useLoginModalStore();
  const [isScrap, setIsScrap] = useState(content.isScraped);

  const navigate = useNavigate();
  const navigateToFlowDetails = () => {
    navigate(`/flow/morewatchflow/${content.id}`);
  };

  const handleDetailClick = () => {
    navigateToFlowDetails();
  };

  const handleScrapBtnClick = async () => {
    if (isLoggedIn) {
      try {
        const response = await privateAPI.post(`/api/flows/${content.id}/scraps`);
        if (response.status === 200) {
          setIsScrap((prev) => !prev);
          if (refetch) {
            refetch();
          }
        } else {
          console.log('플로우 스크랩 실패', response.data);
        }
      } catch (error) {
        throw new Error('ScrapBtn Error in WatchFlow', error);
      }
    } else {
      modalControl();
    }
  };

  const handleDeleteClick = async () => {
    onDeleteClick(content.id);
  };

  return (
    <CardLayout>
      <CardContent>
        <CardColumn className="left">
          <PurposeChip text={getTranslatedPurposes(content.purpose)[0]} />
          <Title>{content.title}</Title>
          <img src={content.imageUrl} alt="플로우 사진" />
        </CardColumn>
        <CardColumn className="right">
          {isOwner ? (
            <ButtonContainer>
              <Button backgroundColor="grayscale01" color="main05" border size="xs">
                수정
              </Button>
              <Button
                onClick={handleDeleteClick}
                backgroundColor="main05"
                color="grayscale04"
                border
                size="xs"
              >
                삭제
              </Button>
            </ButtonContainer>
          ) : (
            <ScrapBtn flowId={content.id} isScrap={isScrap} onClick={handleScrapBtnClick} />
          )}
          <FlowMetadata
            totalPlayTime={content.totalPlayTime}
            viewCount={content.viewCount}
            author={isOwner ? null : content.author.username}
            scrapCount={content.scrapCount}
          />
        </CardColumn>
      </CardContent>
      <MoreDetailBtn onClick={handleDetailClick}>자세히 보기</MoreDetailBtn>
    </CardLayout>
  );
}

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.44rem;
  padding-top: 2.31rem;
  border-radius: 1.25rem;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2.25rem;
`;

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;

  &.left {
    gap: 1.44rem;

    img {
      width: 10rem;
    }
  }

  &.right {
    gap: 2rem;
    align-items: end;
    justify-content: space-between;
  }
`;

const Title = styled.h4`
  display: inline-block;
  width: 12rem;
  ${({ theme }) => theme.text.h4}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Info = styled.ul`
  img {
    width: 2.6rem;
    object-fit: none;
  }

  li {
    width: 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  span {
    ${({ theme }) => theme.text.small};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    line-height: normal;
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
  border-radius: 0 0 1.25rem 1.25rem;
  border: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.color.main03};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-direction: column;
`;
