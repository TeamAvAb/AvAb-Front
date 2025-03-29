import styled from 'styled-components';
import cryingAvb from '../assets/character/cryingAvb.png';
import { Link } from 'react-router-dom';
import Button from '../components/common/button/Button';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>존재하지 않는 페이지</title>
      </Helmet>
      <NotFoundContainer>
        <CharacterImg src={cryingAvb} alt="울고있는 아브브" />
        <Title>존재하지 않는 페이지입니다.</Title>
        <Description>
          요청한 페이지를 찾을 수 없습니다.
          <br />
          주소가 잘못 입력되었거나, 페이지가 삭제되었을 수 있습니다.
        </Description>
        <ButtonContainer>
          <Link to="/">
            <Button backgroundColor="main02" color="main05" size="sm">
              메인으로 이동
            </Button>
          </Link>
          <Button border size="sm">
            뒤로 가기
          </Button>
        </ButtonContainer>
      </NotFoundContainer>
    </>
  );
}

const NotFoundContainer = styled.div`
  height: calc(100vh - 11rem);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  ${({ theme }) => theme.text.h3}
`;

const Description = styled.p`
  ${({ theme }) => theme.text.paragraph}
  text-align: center;
  line-height: 1.2;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const CharacterImg = styled.img`
  width: 15.5rem;
`;
