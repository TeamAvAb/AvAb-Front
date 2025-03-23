import rightArrowImage from '../../../assets/common/nextArrowIcon.svg';
import styled from 'styled-components';

export default function RightArrow({ onClick }) {
  return (
    <ArrowButton onClick={onClick}>
      <img src={rightArrowImage} alt="다음" />
    </ArrowButton>
  );
}

const ArrowButton = styled.button`
  width: 2.6rem;
  height: 2.6rem;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.color.grayscale01};
  border-radius: 9999px;
  padding-top: 5px;
  filter: drop-shadow(0 5px 10px ${({ theme }) => theme.color.grayscale01}26);
`;
