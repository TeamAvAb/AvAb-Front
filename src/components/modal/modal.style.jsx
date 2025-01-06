import styled from 'styled-components';

const Modal = styled.div`
  width: 440px;
  height: 435px;
  display: flex;
  justify-content: center;
  margin-top: 230px;
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
  gap: 8px;
`;
const Title = styled.h1`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 2.16rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const SubTitle = styled.span`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
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
const BtnF = styled.button`
  width: 80%;
  border-radius: 50px;
  border: none;
  background: var(--main-4036-ed, #4036ed);
  padding: 0.75em;
  color: var(--main-ffffff, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  &.btn-row {
    width: auto;
    flex: 1;
  }
`;
const BtnB = styled.button`
  width: 80%;
  border-radius: 50px;
  border: 1px solid var(--gray-scale-464-c-52, #464c52);
  background: var(--main-ffffff, #fff);
  padding: 0.75em;
  color: var(--gray-scale-464-c-52, #464c52);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  &.btn-row {
    width: auto;
    flex: 1;
  }
`;
const CloseBtn = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

export { Modal, Content, TitleContainer, Title, SubTitle, BtnContainer, BtnF, BtnB, CloseBtn };
