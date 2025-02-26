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

export default function FlowContentErrorModal({ close, variant: propVariant }) {
  const variants = {
    PLAY_TIME: {
      title: '플레이 시간을 수정해주세요!',
      description: '입력한 시간보다 플레이 시간을 초과했어요.',
      button: '시간 수정하기',
    },
  };

  let variant = variants.PLAY_TIME;
  switch (propVariant) {
    case 'playTime':
      variant = variants.PLAY_TIME;
      break;
    default:
      break;
  }

  return (
    <Modal>
      <Content>
        <TitleContainer>
          <Title>{variant.title}</Title>
          <SubTitle>{variant.description}</SubTitle>
        </TitleContainer>
        <BtnContainer>
          <Button backgroundColor="main02" color="main05" onClick={close}>
            <ButtonContent>{variant.button}</ButtonContent>
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
