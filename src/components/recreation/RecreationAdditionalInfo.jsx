import peopleIcon from '../../assets/recreation/peopleIcon.svg';
import fixIcon from '../../assets/recreation/fixIcon.svg';
import genderIcon from '../../assets/recreation/genderIcon.svg';
import timeIcon from '../../assets/recreation/timeIcon.svg';
import React from 'react';
import styled from 'styled-components';

export default function RecreationAdditionalInfo({ info, content }) {
  const infoMap = {
    people: {
      icon: peopleIcon,
      title: '조별 추천 인원',
    },
    preparation: {
      icon: fixIcon,
      title: '준비물',
    },
    gender: {
      icon: genderIcon,
      title: '성별',
    },
    age: {
      icon: timeIcon,
      title: '연령대',
    },
  };

  return (
    <Circle>
      <img src={infoMap[info].icon} alt={infoMap[info].title} />
      <InfoTitle>{infoMap[info].title}</InfoTitle>
      <InfoText>{content}</InfoText>
    </Circle>
  );
}

const Circle = styled.div`
  background-color: ${({ theme }) => theme.color.grayscale07};
  border-radius: 9999px;
  filter: drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.1));
  justify-content: center;
  display: flex;
  text-align: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 14rem;
  height: 14rem;
`;

const InfoTitle = styled.div`
  color: ${({ theme }) => theme.color.secondary02};
  text-align: center;
  ${({ theme }) => theme.text.h5};
  margin-bottom: 1.4rem;
`;

const InfoText = styled.div`
  color: ${({ theme }) => theme.color.grayscale04};
  text-align: center;
  ${({ theme }) => theme.text.paragraph};
  width: 9rem;
`;
