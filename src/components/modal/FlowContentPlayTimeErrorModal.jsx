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
import xIcon from '../../assets/common/x.svg';
import styled from 'styled-components';

export default function FlowContentPlayTimeErrorModal({
  close,
  contextTotalPlayTime,
  currentTotalPlayTime,
  onSaveClick,
}) {
  const handleSaveClick = () => {
    onSaveClick();
    close();
  };

  return (
    <Modal>
      <Content>
        <TitleContainer>
          <Title>플레이 시간을 수정해주세요!</Title>
          <SubTitle>
            입력한 시간은 {contextTotalPlayTime}분이지만
            <br />
            현재 {currentTotalPlayTime}분입니다.
            <br /> 이대로 플로우를 저장할까요?
          </SubTitle>
        </TitleContainer>
        <BtnContainer>
          <Button backgroundColor="main02" color="main05" onClick={handleSaveClick}>
            <ButtonContent onClick={onSaveClick}>이대로 저장하기</ButtonContent>
          </Button>
          <Button border onClick={close}>
            <ButtonContent>플로우 수정하기</ButtonContent>
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
