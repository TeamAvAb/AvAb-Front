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

export default function CreateFlowConfirmModal({ close }) {
  return (
    <Modal>
      <Content>
        <TitleContainer>
          <Title>일정 플로우를 저장하세요!</Title>
          <SubTitle>저장한 플로우를 수정할 수 있어요.</SubTitle>
        </TitleContainer>
        <BtnContainer>
          <Button backgroundColor="main02" color="main05">
            <ButtonContent>저장하기</ButtonContent>
          </Button>
          <Button border>
            <ButtonContent>저장하지 않고 나가기</ButtonContent>
          </Button>
        </BtnContainer>
      </Content>
      <CloseBtn src={xIcon} onClick={close} />
    </Modal>
  );
}

const ButtonContent = styled.span`
  width: 11rem;
`;
