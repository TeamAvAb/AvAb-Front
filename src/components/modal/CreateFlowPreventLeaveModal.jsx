import {
  BtnContainer,
  CloseBtn,
  Content,
  Modal,
  SubTitle,
  Title,
  TitleContainer,
} from './modal.style';
import Button from '../common/button/Button';
import xIcon from '../../assets/X.svg';
import styled from 'styled-components';

export default function CreateFlowPreventLeaveModal({ close, onLeaveClick, onStayClick }) {
  const handleLeaveClick = () => {
    onLeaveClick();
    close();
  };

  const handleStayClick = () => {
    onStayClick();
    close();
  };

  return (
    <Modal>
      <Content>
        <TitleContainer>
          <Title>
            작성 중인
            <br />
            플로우가 있어요.
            <br />
          </Title>
          <SubTitle>지금 나가면 작성한 내용이 사라져요.</SubTitle>
        </TitleContainer>
        <BtnContainer>
          <Button backgroundColor="main02" color="main05" onClick={handleStayClick}>
            <ButtonContent>페이지 머무르기</ButtonContent>
          </Button>
          <Button border onClick={handleLeaveClick}>
            <ButtonContent>페이지 나가기</ButtonContent>
          </Button>
        </BtnContainer>
      </Content>
      <CloseBtn src={xIcon} onClick={handleStayClick} />
    </Modal>
  );
}

const ButtonContent = styled.span`
  width: 11rem;
`;
