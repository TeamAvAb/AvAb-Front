import { BtnContainer, CloseBtn, Content, Modal, Title, TitleContainer } from './modal.style';
import Button from '../common/button/Button';
import xIcon from '../../assets/X.svg';
import { useState } from 'react';

export default function FlowShareModal({ close }) {
  const [copied, setCopied] = useState(false);

  const handleLinkCopy = async () => {
    setCopied(true);
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Modal>
      <Content>
        <TitleContainer>
          <Title>일정 플로우를 공유하세요!</Title>
        </TitleContainer>
        <BtnContainer>
          <Button
            backgroundColor={!copied && 'main02'}
            color={copied ? 'main02' : 'main05'}
            border={copied}
            borderColor={copied && 'main02'}
            transition={false}
            onClick={handleLinkCopy}
          >
            {copied ? '복사 완료!' : '링크 복사하기'}
          </Button>
        </BtnContainer>
      </Content>
      <CloseBtn src={xIcon} onClick={close} />
    </Modal>
  );
}
