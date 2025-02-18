import styled from 'styled-components';
import circleXIcon from '../../assets/circle_x.svg';

export default function RecreationList({ recreations }) {
  const arr = [1];

  return (
    <ListContainer>
      {arr.map(() => (
        <RecreationItem>
          <PlayTimeBar $height={8} />
          <RecreationContent>
            <TitleBox>
              <NumCircle>1</NumCircle>
              <TitleInput placeholder="레크레이션 제목 입력" />
              <DeleteButton>
                <img src={circleXIcon} width={20} alt="삭제" />
              </DeleteButton>
            </TitleBox>
            <KeywordBox>이곳을 클릭하여 3개의 키워드를 선택해주세요.</KeywordBox>
            <PlayTimeBox>
              플레이까지
              <PlayTimeInput placeholder="10" />
              <span>분</span>
            </PlayTimeBox>
          </RecreationContent>
        </RecreationItem>
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 24rem;
`;

const RecreationItem = styled.li`
  display: flex;
  gap: 0.8rem;
`;

const PlayTimeBar = styled.div`
  background: ${({ theme }) => theme.color.secondary04};
  width: 0.5rem;
  height: ${({ $height }) => `${$height}rem`};
  border-radius: 9999px;
`;

const RecreationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const KeywordBox = styled.div`
  display: flex;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.color.grayscale06};
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.grayscale04};
`;

const NumCircle = styled.span`
  background-color: ${({ theme }) => theme.color.secondary04};
  width: 2.6rem;
  height: 2.6rem;
  ${({ theme }) => theme.text.h4};
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleInput = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) => theme.text.h4}
  border: none;
  width: 70%;

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale04};
  }
`;

const PlayTimeBox = styled.div`
  margin-top: 1rem;
  ${({ theme }) => theme.text.small};

  span {
    ${({ theme }) => theme.text.smallBold};
  }
`;

const PlayTimeInput = styled.input`
  margin-left: 1.2rem;
  font-weight: 700;
  border: none;
  ${({ theme }) => theme.text.smallBold};
  width: 1.1rem;

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale04};
  }
`;

const DeleteButton = styled.button`
  padding: 0;
  height: 1.25rem;
`;
