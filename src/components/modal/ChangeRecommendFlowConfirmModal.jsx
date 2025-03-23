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

export default function ChangeRecommendFlowConfirmModal({ close, onChangeClick }) {
  const handleChangeClick = () => {
    onChangeClick();
    close();
  };

  return (
    <Modal>
      <Content>
        <TitleContainer>
          <Title>
            작성 중인
            <br />
            플로우가 있어요!
          </Title>
          <SubTitle>
            추천 플로우를 변경하면
            <br />
            기존 내용이 교체돼요.
          </SubTitle>
        </TitleContainer>
        <BtnContainer>
          <Button backgroundColor="main02" color="main05" onClick={handleChangeClick}>
            <ButtonContent>변경하기</ButtonContent>
          </Button>
          <Button border onClick={close}>
            <ButtonContent>변경하지 않기</ButtonContent>
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
