import timeImg from '../../assets/card/timeIcon.svg';
import viewImg from '../../assets/card/viewIcon.svg';
import pencilImg from '../../assets/card/pencilIcon.svg';
import userImg from '../../assets/card/userIcon.svg';
import React from 'react';
import styled from 'styled-components';

export default function FlowMetadata({ totalPlayTime, viewCount, author, scrapCount }) {
  return (
    <Info>
      <li>
        <img src={timeImg} alt="소요시간" />
        <InfoText>{totalPlayTime}분</InfoText>
      </li>
      <li>
        <img src={viewImg} alt="조회수" />
        <InfoText>{viewCount}</InfoText>
      </li>
      {author && (
        <li>
          <img src={pencilImg} alt="제작자" />
          <InfoText>{author}</InfoText>
        </li>
      )}
      <li>
        <img src={userImg} alt="스크랩" />
        <InfoText>{scrapCount}</InfoText>
      </li>
    </Info>
  );
}

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
`;

const InfoText = styled.span`
  ${({ theme }) => theme.text.small};
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: normal;
`;
