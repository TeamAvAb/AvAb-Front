import styled from 'styled-components';
import Button from '../common/button/Button';

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(70, 76, 82, 0.5);
  z-index: 999;
`;
const Modal = styled.div`
  width: 440px;
  height: 435px;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #f7f8f9;
  border-radius: 20px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
  padding: 27px auto 25px;
  box-sizing: border-box;
  max-width: 80%;
  &.hasimage {
    gap: 0;
    max-width: 70%;
  }
  word-break: keep-all;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.color.grayscale01};
  font-size: ${({ theme }) => theme.text.h3.fontSize};
  font-weight: ${({ theme }) => theme.text.h3.fontWeight};
  text-align: center;
  line-height: normal;
`;
const SubTitle = styled.span`
  color: ${({ theme }) => theme.color.grayscale01};
  font-size: ${({ theme }) => theme.text.paragraph.fontSize};
  font-weight: ${({ theme }) => theme.text.paragraph.fontWeight};
  text-align: center;
  line-height: normal;
`;
const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  gap: 2em;
  &.btn-row {
    flex-direction: row;
  }
`;
const BtnF = styled(Button)`
  width: 70%;
  &.btn-row {
    width: 8.6rem;
    flex: 1;
  }
`;
const BtnB = styled(Button)`
  width: 70%;
  &.btn-row {
    width: 8.6rem;
    flex: 1;
  }
`;
const CloseBtn = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

export {
  Backdrop,
  Modal,
  Content,
  TitleContainer,
  Title,
  SubTitle,
  BtnContainer,
  BtnF,
  BtnB,
  CloseBtn,
};
