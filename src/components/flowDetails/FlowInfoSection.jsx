import PurposeChip from '../common/chip/PurposeChip';
import { getTranslatedPurposes } from '../../utils/purposeUtils';
import shareIcon from '../../assets/moreflow/share.png';
import ScrapBtn from '../common/button/ScrapBtn';
import React, { useState } from 'react';
import styled from 'styled-components';
import { privateAPI } from '../../apis/user';
import useLoginStore from '../../stores/loginStore';
import useLoginModalStore from '../../stores/loginModalStore';
import FlowMetadata from '../common/FlowMetadata';
import useModal from '../../hooks/useModal';
import FlowShareModal from '../modal/FlowShareModal';

export default function FlowInfoSection({ flow }) {
  const { isLoggedIn } = useLoginStore((state) => state);
  const { modalControl } = useLoginModalStore();
  const {
    ModalWrapper,
    openModal: openFlowShareModal,
    closeModal: closeFlowShareModal,
  } = useModal();

  const [scrap, setScrap] = useState(flow.isScraped);

  const toggleScrap = async () => {
    if (isLoggedIn) {
      const response = await privateAPI.post(`/api/flows/${flow.id}/scraps`);
      if (response.status === 200) {
        // 요청이 성공하면 상태 업데이트
        console.log(response.data);
        setScrap((prev) => !prev);
      } else {
        // 요청이 실패하면 에러 처리
        console.log(response.data);
      }
    } else {
      modalControl();
    }
  };

  const handleScrapClick = async () => {
    await toggleScrap();
  };

  // 공유 버튼 누를 시 상태 변화 함수
  const handleShareClick = () => {
    openFlowShareModal();
  };

  return (
    <Container>
      <FlowImage src={flow.imageUrl} alt={flow.title} />
      <FlowInfoContainer>
        <Column className="right">
          <div>
            <PurposeChip text={getTranslatedPurposes(flow.purposeList)[0]} />
            <Title>{flow.title}</Title>
          </div>
          <ShareImg src={shareIcon} onClick={handleShareClick} />
        </Column>
        <Column className="left">
          <ScrapBtn isScrap={scrap} onClick={handleScrapClick} />
          <FlowMetadata
            totalPlayTime={flow.totalPlayTime}
            viewCount={flow.totalPlayTime}
            scrapCount={flow.scrapCount}
            author={flow.author.username}
          />
        </Column>
      </FlowInfoContainer>

      <ModalWrapper close={closeFlowShareModal}>
        <FlowShareModal close={closeFlowShareModal} />
      </ModalWrapper>
    </Container>
  );
}

const Container = styled.section`
  background-color: ${({ theme }) => theme.color.secondary03};
  display: flex;
  justify-content: center;
  padding: 4rem 0;
  gap: 15rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.right {
    width: 20rem;
  }

  &.left {
    align-items: end;
  }
`;

const FlowInfoContainer = styled.div`
  display: flex;
`;

const FlowImage = styled.img`
  width: 15rem;
`;

const Title = styled.div`
  ${({ theme }) => theme.text.h4};
  margin-top: 1.4rem;
`;

const ShareImg = styled.img`
  width: 3rem;
  cursor: pointer;
`;
