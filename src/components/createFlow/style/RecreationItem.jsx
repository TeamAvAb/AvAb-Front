import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  gap: 0.8rem;
  transition: height 0.5s 0.5s;
  height: ${({ $playTime }) => ($playTime >= 10 ? $playTime + 10 : 20)}rem;
`;

export const PlayTimeBar = styled.div`
  background: ${({ theme }) => theme.color.secondary04};
  width: 0.5rem;
  height: 100%;
  border-radius: 9999px;
`;

export const RecreationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ErrorWrapper = styled.div`
  &.title {
    margin-left: 3.3rem;
    margin-top: -1rem;
  }

  &.keywords {
    margin-top: -0.5rem;
  }

  &.playTime {
    margin-left: 0.5rem;
    max-width: 60%;
  }
`;

export const KeywordBox = styled.button`
  display: flex;
  gap: 0.5rem;
  text-align: left;
  padding: 0;

  span {
    background-color: ${({ theme }) => theme.color.grayscale06};
    border-radius: 5px;
    padding: 0.5rem 0.8rem;
    color: ${({ theme }) => theme.color.grayscale04};
    width: 100%;
  }
`;

export const NumCircle = styled.span`
  background-color: ${({ theme }) => theme.color.secondary04};
  width: 2.6rem;
  height: 2.6rem;
  ${({ theme }) => theme.text.h4};
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlayTimeBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  ${({ theme }) => theme.text.small};

  span.minute {
    ${({ theme }) => theme.text.smallBold};
  }

  span.label {
    width: 6rem;
  }
`;

export const PlayTimeInput = styled.input`
  font-weight: 700;
  border: none;
  ${({ theme }) => theme.text.smallBold};
  width: 1.7rem;
  text-align: right;

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale04};
  }
`;

export const DeleteButton = styled.button`
  padding: 0;
  height: 1.25rem;
`;
