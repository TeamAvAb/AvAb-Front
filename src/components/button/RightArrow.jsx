import rightArrowImage from '../../assets/main/nextArrowIcon.svg';
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
  border: 1px solid black;
  border-radius: 9999px;
  padding-top: 5px;
  filter: drop-shadow(0px 5px 10px rgba(27, 29, 31, 0.15));
`;
