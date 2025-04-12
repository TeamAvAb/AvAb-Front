import React, { useState } from 'react';
import styled from 'styled-components';
import ScrapBtn from '../common/button/ScrapBtn';
import FlowRecreationList from '../common/FlowRecreationList';
import { privateAPI } from '@/apis/user.js';
import useLoginStore from '@/stores/loginStore.js';
import useLoginModalStore from '@/stores/loginModalStore.js';

export default function FlowCard({ index, flowData, flowRecreations }) {
  const { isLoggedIn } = useLoginStore((state) => state);
  const { modalControl } = useLoginModalStore();
  const [scrap, setScrap] = useState(flowData.isFavorite);

  const toggleScrap = async () => {
    if (isLoggedIn) {
      const response = await privateAPI.post(`/api/flows/${flowData.id}/scraps`);
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
  return (
    <FlowCardContainer>
      <TitleWrap>
        <NumberBox>{index}안</NumberBox>
        <FlowTitle>{flowData?.title}</FlowTitle>
        <ScrapButton isScrap={scrap} onClick={handleScrapClick} />
      </TitleWrap>
      <ListWrap>
        <FlowRecreationList recreations={flowRecreations} />
      </ListWrap>
    </FlowCardContainer>
  );
}

const FlowCardContainer = styled.div`
  width: 32rem;
  border-radius: 1.2rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale04};
  padding: 2rem;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
`;

const FlowTitle = styled.span`
  text-align: center;
  ${({ theme }) => theme.text.h4};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const NumberBox = styled.div`
  width: 5.5rem;
  padding: 0.3rem 0;
  text-align: center;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.color.grayscale01};
  ${({ theme }) => theme.text.button};
`;

const ScrapButton = styled(ScrapBtn)`
  width: 5.5rem;
  display: flex;
  justify-content: end;
`;

const ListWrap = styled.div`
  padding-left: 2rem;
`;
