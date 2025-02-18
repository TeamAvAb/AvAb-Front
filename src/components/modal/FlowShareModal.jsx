import {
  BtnContainer,
  CloseBtn,
  Content,
  Modal,
  Title,
  TitleContainer,
  BtnF,
  BtnB,
} from './modal.style';
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
          {copied ? (
            <BtnB
              onClick={handleLinkCopy}
              backgroundColor="main05"
              color="main02"
              border
              borderColor="main02"
            >
              복사 완료
            </BtnB>
          ) : (
            <BtnF onClick={handleLinkCopy} backgroundColor="main02" color="main05">
              링크 복사하기
            </BtnF>
          )}
        </BtnContainer>
      </Content>
      <CloseBtn onClick={close} />
    </Modal>
  );
}
