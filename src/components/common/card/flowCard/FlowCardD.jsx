import React from 'react';
import styled from 'styled-components';
import timeImg from '../../../../assets/Card/timeIcon.svg';
import viewImg from '../../../../assets/watchflow/view.png'; // svg로 수정 필요
import pencilImg from '../../../../assets/Card/pencilIcon.svg';
import userImg from '../../../../assets/Card/userIcon.svg';
import { useNavigate } from 'react-router';
import { getTranslatedPurposes } from '../../../../utils/purposeUtils';
import PurposeChip from '../../chip/PurposeChip';

export default function FlowCardD({ content, children, isOwner }) {
  const navigate = useNavigate();

  const moveToMoreWatchFlow = (moreData) => {
    localStorage.setItem('moreData', JSON.stringify(moreData));
    navigate(`/flow/morewatchflow/${moreData.title}`);
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
          <BtnBox>{children}</BtnBox>
          <Info>
            <li>
              <img src={timeImg} alt="소요시간" />
              <span>{content.totalPlayTime}분</span>
            </li>
            <li>
              <img src={viewImg} alt="조회수" />
              <span>{content.viewCount}</span>
            </li>
            {isOwner !== 'true' && (
              <li>
                <img src={pencilImg} alt="제작자" />
                <span>{content.author.username}</span>
              </li>
            )}
            <li>
              <img src={userImg} alt="스크랩" />
              <span>{content.scrapCount}</span>
            </li>
          </Info>
        </CardColumn>
      </CardContent>
      <MoreDetailBtn onClick={() => moveToMoreWatchFlow(content)}>자세히 보기</MoreDetailBtn>
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
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
`;
const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2.25rem;
`;
const CardColumn = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 8.8rem;
  }

  &.left {
    gap: 1.44rem;
  }

  &.right {
    gap: 3.38rem;
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
const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 0.62rem;
`;
const Info = styled.ul`
  img {
    width: 2.6rem;
    object-fit: none;
  }

  li {
    width: 5.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  span {
    ${({ theme }) => theme.text.small}
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

  &:hover {
    background-color: ${({ theme }) => theme.color.main03};
  }
`;
