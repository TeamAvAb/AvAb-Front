import styled from 'styled-components';
import Button from '../common/button/Button';
import closeIcon from '../../assets/X.svg';

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
  width: 27.5rem;
  min-height: 27.1rem;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #f7f8f9;
  border-radius: 1.25rem;
  box-sizing: border-box;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  gap: 3.75rem;
  max-width: 70%;
  &.hasimage {
    gap: 0;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  &.btn-row {
    flex-direction: row;
  }
`;
const ModalBtn = styled(Button)`
  width: 13.93rem;
  &.btn-row {
    width: 8.62rem;
  }
`;

const CloseBtn = styled.button`
  background: url(${closeIcon}) no-repeat;
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 2.62rem;
  height: 2.62rem;
  padding: 0;
`;

export {
  Backdrop,
  Modal,
  Content,
  TitleContainer,
  Title,
  SubTitle,
  BtnContainer,
  ModalBtn,
  CloseBtn,
};
