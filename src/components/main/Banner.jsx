import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

export default function Banner({ contents }) {
  const colors = [
    {
      background: '#4036ed',
      text: '#e9ebed',
      buttonBackground: '#f7f8f9',
      buttonText: '#1b1d1f',
    },
    {
      background: '#ffaa29',
      text: '#1b1d1f',
      buttonBackground: '#26282b',
      buttonText: '#fff',
    },
    {
      background: '#a0ddff',
      text: '#1b1d1f',
      buttonBackground: '#26282b',
      buttonText: '#fff',
    },
  ];

  const navigator = useNavigate();
  const gotoList = (param) => {
    navigator(`/search/list?purpose=${param}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container backgroundColor={colors[contents.index].background}>
      <Left>
        <Title color={colors[contents.index].text}>
          {contents.keyword} 레크레이션을 찾으시나요?
        </Title>
        <Description color={colors[contents.index].text}>
          <span style={{ fontWeight: '700' }}>{contents.keyword}</span> 키워드로 작성된 레크레이션을
          보러가세요.
        </Description>
        <Button
          backgroundColor={colors[contents.index].buttonBackground}
          color={colors[contents.index].buttonText}
          onClick={() => gotoList(contents.param)}
        >
          레크레이션 보러가기
        </Button>
      </Left>

      <img alt="" src={contents.img} style={{ width: '10rem', height: '10rem' }} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3rem 6rem 3rem 6rem;
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: 1.4rem;
  box-shadow: 0 0 4rem 1rem rgba(0, 0, 0, 0.2);
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.grayscale06};
`;

const Title = styled.span`
  margin-bottom: 0.8rem;
  color: ${({ color }) => color};
  font-size: 1.5rem;
  font-weight: 700;
  text-align: left;
`;

const Description = styled.span`
  margin-bottom: 1.5rem;
  color: ${({ color }) => color};
  font-size: 1.2rem;
  font-weight: 400;
`;

const Button = styled.button`
  width: max-content;
  padding: 1rem 2rem;
  text-align: center;
  border: none;
  border-radius: 9999px;
  background: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
`;
